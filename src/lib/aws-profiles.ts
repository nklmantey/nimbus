import { invoke } from '@tauri-apps/api'
import useSWR, { SWRConfiguration } from 'swr'

const fetcher = async (): Promise<AwsProfile[]> => {
	try {
		return await invoke<AwsProfile[]>('fetch_aws_profiles')
	} catch (err) {
		throw new Error(err as string)
	}
}

export async function addAwsProfile(profile: AwsProfile): Promise<void> {
	try {
		await invoke<void>('add_aws_profile', { profile })
	} catch (err) {
		throw new Error(err as string)
	}
}

const swrConfig: SWRConfiguration = {
	revalidateOnFocus: false,
	revalidateOnReconnect: true,
	refreshInterval: 0,
	errorRetryCount: 3,
}

export function useProfiles() {
	const { data: profiles = [], error, isLoading, mutate } = useSWR<AwsProfile[]>('/api', fetcher, swrConfig)

	return {
		profiles,
		error,
		isLoading,
		mutate,
	}
}
