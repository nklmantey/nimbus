type AwsProfile = {
	name: string
	region?: string
	access_key_id?: string
	secret_access_key?: string
	output?: string
}

type ProfilesContextType = {
	profiles: AwsProfile[]
	isLoading: boolean
	error: Error | null
	fetchProfiles: () => Promise<void>
}

type FormDataType = {
	name: string
	accessKeyId: string
	secretAccessKey: string
	region: string
	output: string
}

type FormErrorsType = {
	name?: string
	accessKeyId?: string
	secretAccessKey?: string
	region?: string
	output?: string
}
