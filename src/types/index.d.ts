type AwsProfile = {
	name: string
	region?: string
	access_key_id?: string
	secret_access_key?: string
	output?: string
}

interface ProfilesContextType {
	profiles: AwsProfile[]
	isLoading: boolean
	error: Error | null
	mutateProfiles: () => Promise<void>
}
