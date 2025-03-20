import { ErrorState, Loader, EmptyState } from '@/components/global'
import { Button } from '@/components/ui'
import { AddProfileSheet, ProfileCard } from '@/components/dashboard'
import { useProfiles } from '@/contexts/ProfilesContext'

export default function DashboardPage() {
	const { profiles, isLoading, error, fetchProfiles } = useProfiles()

	if (isLoading) {
		return (
			<div className='flex items-center justify-center w-full h-screen'>
				<Loader message='fetching your aws profiles...' />
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex flex-col gap-4 items-center justify-center w-full h-screen'>
				<ErrorState message='we could not fetch your aws profiles' />
				<Button title='retry' icon='/icons/sync.svg' onClick={fetchProfiles} />
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
						<AddProfileSheet />
						<Button title='refresh' onClick={fetchProfiles} />
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
