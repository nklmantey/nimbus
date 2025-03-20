import { useProfiles } from '@/contexts/ProfilesContext'

export function findProfileByName(profileName: string): AwsProfile | null {
	const { profiles } = useProfiles()

	if (!profileName || profiles.length === 0) return null
	return profiles.find((profile) => profile.name === profileName) ?? null
}

export function validateProfile(profile: Partial<AwsProfile>): { isValid: boolean; errors: string[] } {
	const errors: string[] = []

	if (!profile.name) {
		errors.push('Profile name is required')
	}

	if (profile.name && !/^[\w-]+$/.test(profile.name)) {
		errors.push('Profile name can only contain letters, numbers, underscores, and hyphens')
	}

	if (profile.region && !/^[a-z]{2}-[a-z]+-\d{1}$/.test(profile.region)) {
		errors.push('Invalid AWS region format')
	}

	return {
		isValid: errors.length === 0,
		errors,
	}
}

export function hasRequiredCredentials(profile: Partial<AwsProfile>): boolean {
	return !!(profile.access_key_id && profile.secret_access_key)
}

export function formatProfileForDisplay(profile: AwsProfile): string {
	const parts = [`[${profile.name}]`]

	if (profile.region) parts.push(`region = ${profile.region}`)
	if (profile.access_key_id) parts.push(`aws_access_key_id = ${profile.access_key_id}`)
	if (profile.secret_access_key) parts.push(`aws_secret_access_key = ${profile.secret_access_key}`)
	if (profile.output) parts.push(`output = ${profile.output}`)

	return parts.join('\n')
}

export function parseProfileString(profileStr: string): Partial<AwsProfile> {
	const profile: Partial<AwsProfile> = {}
	const lines = profileStr.split('\n')

	// Extract profile name from [profile_name]
	const nameMatch = lines[0].match(/^\[(.*)\]$/)
	if (nameMatch) {
		profile.name = nameMatch[1]
	}

	// Parse key-value pairs
	lines.slice(1).forEach((line) => {
		const [key, value] = line.split('=').map((part) => part.trim())
		switch (key) {
			case 'region':
				profile.region = value
				break
			case 'aws_access_key_id':
				profile.access_key_id = value
				break
			case 'aws_secret_access_key':
				profile.secret_access_key = value
				break
			case 'output':
				profile.output = value
				break
		}
	})

	return profile
}
