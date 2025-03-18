import { createContext, ReactNode, useContext, useState } from 'react'

const ProfileContext = createContext<ProfilesContextType | undefined>(undefined)

export function ContextProvider({ children }: { children: ReactNode }) {
	const [profiles, setProfiles] = useState<AwsProfile[]>([])

	return <ProfileContext.Provider value={{ profiles, setProfiles }}>{children}</ProfileContext.Provider>
}

export function useProfilesContext() {
	const context = useContext(ProfileContext)

	if (!context) throw new Error('context must be used within a provider')

	return context
}
