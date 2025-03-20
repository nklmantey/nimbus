// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::PathBuf;
use dirs::home_dir;
use serde::{Deserialize, Serialize};
use std::error::Error;
use ini::Ini;
use std::collections::HashMap;
use std::fs;

#[derive(Debug, Serialize, Deserialize)]
struct AwsProfile {
    name: String,
    region: Option<String>,
    access_key_id: String,
    secret_access_key: String,
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
async fn add_aws_profile(profile: AwsProfile) -> Result<(), String> {
    let home = home_dir().ok_or("Could not find home directory")?;
    let aws_dir = home.join(".aws");
    let credentials_path = aws_dir.join("credentials");
    let config_path = aws_dir.join("config");

    // Ensure the .aws directory exists
    if !aws_dir.exists() {
        fs::create_dir_all(&aws_dir)
            .map_err(|e| format!("Failed to create .aws directory: {}", e))?;
    }

    // Update credentials file
    let mut credentials_ini = read_aws_file(credentials_path.clone())
        .map_err(|e| format!("Failed to read credentials: {}", e))?;

    // Add profile to credentials file
    credentials_ini.with_section(Some(profile.name.clone()))
        .set("aws_access_key_id", profile.access_key_id)
        .set("aws_secret_access_key", profile.secret_access_key);

    // Save credentials file
    credentials_ini.write_to_file(credentials_path)
        .map_err(|e| format!("Failed to write credentials: {}", e))?;

    // Update config file
    let mut config_ini = read_aws_file(config_path.clone())
        .map_err(|e| format!("Failed to read config: {}", e))?;

    // Set section name (default or profile xyz)
    let section_name = if profile.name == "default" {
        Some("default".to_string())
    } else {
        Some(format!("profile {}", profile.name))
    };

    // Add profile to config file
    if let Some(region) = profile.region {
        config_ini.with_section(section_name.clone()).set("region", region);
    }
    
    if let Some(output) = profile.output {
        config_ini.with_section(section_name).set("output", output);
    }

    // Save config file
    config_ini.write_to_file(config_path)
        .map_err(|e| format!("Failed to write config: {}", e))?;

    Ok(())
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

    // !USING A HASH MAP HERE TO PREVENT DUPES
    let mut profiles_map: HashMap<String, AwsProfile> = HashMap::new();

    // !START PROCESSING CRED. FILE FIRST SINCE IT HAS KEYS
    for (sec, prop) in credentials_ini.iter() {
        let profile_name = sec.unwrap_or("default").to_string();
        
        let access_key_id = prop.get("aws_access_key_id")
            .map(String::from)
            .unwrap_or_default();
            
        let secret_access_key = prop.get("aws_secret_access_key")
            .map(String::from)
            .unwrap_or_default();
            
        let profile = AwsProfile {
            name: profile_name.clone(),
            access_key_id,
            secret_access_key,
            region: None,
            output: None,
        };
        
        profiles_map.insert(profile_name, profile);
    }

    // !READING CONFIG FILE
    for (sec, prop) in config_ini.iter() {
        let mut profile_name = sec.unwrap_or("default").to_string();
        
        if profile_name != "default" {
            profile_name = profile_name.trim_start_matches("profile ").to_string();
        }

        let profile = profiles_map.entry(profile_name.clone()).or_insert(AwsProfile {
            name: profile_name,
            region: None,
            access_key_id: String::new(),
            secret_access_key: String::new(),
            output: None,
        });

        profile.region = prop.get("region").map(String::from);
        profile.output = prop.get("output").map(String::from);
    }

    // !CONVERT HASH MAP TO VEC
    let mut profiles: Vec<AwsProfile> = profiles_map.into_values().collect();
    
    // !SORT PROFILES IN ALPHABETICAL ORDER
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
        .invoke_handler(tauri::generate_handler![greet, fetch_aws_profiles, add_aws_profile])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
