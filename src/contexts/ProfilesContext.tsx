import { createContext, useContext, useCallback } from 'react'
import { useProfiles as useSWRProfiles, addAwsProfile } from '@/lib/aws-profiles'

const ProfilesContext = createContext<ProfilesContextType | undefined>(undefined)

export function ProfilesProvider({ children }: { children: React.ReactNode }) {
	const { profiles, error, isLoading, mutate } = useSWRProfiles()

	const fetchProfiles = useCallback(async () => {
		await mutate()
	}, [mutate])

	const addProfile = useCallback(
		async (profile: AwsProfile) => {
			await addAwsProfile(profile)
			await mutate()
		},
		[mutate]
	)

	return (
		<ProfilesContext.Provider
			value={{
				profiles,
				isLoading,
				error: error as Error | null,
				fetchProfiles,
				addProfile,
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
