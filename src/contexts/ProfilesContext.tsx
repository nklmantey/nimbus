import { createContext, useContext, useCallback } from 'react'
import { invoke } from '@tauri-apps/api'
import useSWR, { SWRConfiguration } from 'swr'

const fetcher = async (): Promise<AwsProfile[]> => {
	try {
		return await invoke<AwsProfile[]>('fetch_aws_profiles')
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

const ProfilesContext = createContext<ProfilesContextType | undefined>(undefined)

export function ProfilesProvider({ children }: { children: React.ReactNode }) {
	const {
		data: profiles = [],
		error,
		isLoading,
		mutate: handleFetchProfiles,
	} = useSWR<AwsProfile[]>('/api/aws-profiles', fetcher, swrConfig)

	const fetchProfiles = useCallback(async () => {
		await handleFetchProfiles()
	}, [handleFetchProfiles])

	return (
		<ProfilesContext.Provider
			value={{
				profiles,
				isLoading,
				error: error as Error | null,
				fetchProfiles,
			}}
		>
			{children}
		</ProfilesContext.Provider>
	)
}

export function useProfiles() {
	const context = useContext(ProfilesContext)
	if (context === undefined) {
		throw new Error('useProfiles must be used within a ProfilesProvider')
	}
	return context
}
