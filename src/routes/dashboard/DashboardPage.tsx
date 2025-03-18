import { ErrorState, Loader, EmptyState } from '@/components/global'
import { invoke } from '@tauri-apps/api'
import { useEffect, useState } from 'react'
import { ProfileCard } from '@/components/dashboard'
import { SecondaryButton } from '@/components/ui'

interface AwsProfile {
	name: string
	region?: string
	access_key_id?: string
	secret_access_key?: string
	output?: string
}

export default function DashboardPage() {
	const [profiles, setProfiles] = useState<AwsProfile[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetchProfiles()
	}, [])

	const fetchProfiles = async () => {
		try {
			const result = await invoke<AwsProfile[]>('fetch_aws_profiles')
			setProfiles(result)
		} catch (err) {
			setError(err as string)
		} finally {
			setIsLoading(false)
		}
	}

	if (isLoading) {
		return (
			<div className='flex items-center justify-center  w-full h-screen'>
				<Loader message='fetching your aws profiles...' />
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex items-center justify-center  w-full h-screen'>
				<ErrorState message='we could not fetch your aws profiles' />
			</div>
		)
	}

	return (
		<div className='w-full h-screen flex items-center justify-center'>
			{profiles.length === 0 ? (
				<EmptyState />
			) : (
				<div className='p-12 lg:px-48 lg:py-24 w-full h-full flex flex-col gap-4'>
					<div className='flex items-center gap-2'>
						<SecondaryButton title='add new profile' />
						<SecondaryButton title='refresh' onClick={fetchProfiles} />
					</div>

					<div className='flex gap-4'>
						{profiles.map((profile) => (
							<ProfileCard key={profile.name} profile={profile} />
						))}
					</div>
				</div>
			)}
		</div>
	)
}
