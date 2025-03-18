type AwsProfile = {
	name: string
	region?: string
	access_key_id?: string
	secret_access_key?: string
	output?: string
}

type ProfilesContextType = {
	profiles: AwsProfile[]
	setProfiles: React.Dispatch<React.SetStateAction<Array<AwsProfile>>>
}
