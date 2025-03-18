// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::PathBuf;
use dirs::home_dir;
use serde::{Deserialize, Serialize};
use std::error::Error;
use ini::Ini;
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
struct AwsProfile {
    name: String,
    region: Option<String>,
    access_key_id: Option<String>,
    secret_access_key: Option<String>,
    output: Option<String>,
}

fn read_aws_file(path: PathBuf) -> Result<Ini, Box<dyn Error>> {
    if path.exists() {
        Ok(Ini::load_from_file(path)?)
    } else {
        Ok(Ini::new())
    }
}

#[tauri::command]
async fn fetch_aws_profiles() -> Result<Vec<AwsProfile>, String> {
    let home = home_dir().ok_or("Could not find home directory")?;
    let credentials_path = home.join(".aws").join("credentials");
    let config_path = home.join(".aws").join("config");

    let credentials_ini = read_aws_file(credentials_path)
        .map_err(|e| format!("Failed to read credentials: {}", e))?;
    let config_ini = read_aws_file(config_path)
        .map_err(|e| format!("Failed to read config: {}", e))?;

    // Use a HashMap to store profiles by name to prevent duplicates
    let mut profiles_map: HashMap<String, AwsProfile> = HashMap::new();

    // First, process credentials file as it contains the essential access keys
    for (sec, prop) in credentials_ini.iter() {
        let profile_name = sec.unwrap_or("default").to_string();
        
        let profile = AwsProfile {
            name: profile_name.clone(),
            access_key_id: prop.get("aws_access_key_id").map(String::from),
            secret_access_key: prop.get("aws_secret_access_key").map(String::from),
            region: None,
            output: None,
        };
        
        profiles_map.insert(profile_name, profile);
    }

    // Then enrich with config file information
    for (sec, prop) in config_ini.iter() {
        let mut profile_name = sec.unwrap_or("default").to_string();
        
        // In config file, non-default profiles are prefixed with "profile "
        if profile_name != "default" {
            profile_name = profile_name.trim_start_matches("profile ").to_string();
        }

        // Get or create profile
        let profile = profiles_map.entry(profile_name.clone()).or_insert(AwsProfile {
            name: profile_name,
            region: None,
            access_key_id: None,
            secret_access_key: None,
            output: None,
        });

        // Update profile with config information
        profile.region = prop.get("region").map(String::from);
        profile.output = prop.get("output").map(String::from);
    }

    // Convert HashMap values into a Vec
    let mut profiles: Vec<AwsProfile> = profiles_map.into_values().collect();
    
    // Sort profiles alphabetically, with "default" first
    profiles.sort_by(|a, b| {
        if a.name == "default" {
            std::cmp::Ordering::Less
        } else if b.name == "default" {
            std::cmp::Ordering::Greater
        } else {
            a.name.cmp(&b.name)
        }
    });

    Ok(profiles)
}

// Learn more about Tauri commands at https://v1.tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, fetch_aws_profiles])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
