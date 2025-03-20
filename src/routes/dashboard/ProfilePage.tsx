import { ErrorState, Loader } from '@/components/global'
import { Button } from '@/components/ui'
import { Link, useParams, Navigate } from 'react-router'
import { useState } from 'react'
import { useProfiles } from '@/contexts/ProfilesContext'

export default function ProfilePage() {
	const { profile: profileName } = useParams()
	const { profiles, isLoading, error } = useProfiles()
	const [showAccessKey, setShowAccessKey] = useState(false)
	const [showSecretKey, setShowSecretKey] = useState(false)

	if (isLoading) {
		return (
			<div className='flex items-center justify-center w-full h-screen'>
				<Loader message='loading profile...' />
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex flex-col gap-4 items-center justify-center w-full h-screen'>
				<ErrorState message='Error loading profile' />
				<Link to='/dashboard'>
					<Button title='back to dashboard' />
				</Link>
			</div>
		)
	}

	if (!profileName) {
		return <Navigate to='/dashboard' />
	}

	const profile = profiles.find((p) => p.name === profileName)

	if (!profile) {
		return (
			<div className='w-full h-screen flex items-center justify-center'>
				<div className='flex items-center gap-2'>
					<Link to='/dashboard'>
						<Button title='back' />
					</Link>
					<ErrorState message={`Profile "${profileName}" not found`} />
				</div>
			</div>
		)
	}

	const maskKey = (key: string) => '•'.repeat(Math.min(key.length, 40))

	return (
		<div className='w-full min-h-screen flex items-start justify-center'>
			<div className='p-12 lg:px-48 lg:py-24 w-full h-full flex flex-col gap-4'>
				<div className='flex items-center gap-2'>
					<Link to='/dashboard'>
						<Button title='back' />
					</Link>
				</div>

				<div className='flex flex-col gap-4 mt-4 sm:mt-8'>
					<h1 className='text-xl sm:text-2xl font-bold text-[#ffffff90]'>{profile.name}</h1>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
						{profile.region && (
							<div className='relative flex gap-2 items-center bg-[#ffffff10] p-4 rounded-xl'>
								<img src='/icons/globe.svg' className='w-5 h-5 opacity-70 shrink-0' />
								<div className='flex-1 min-w-0'>
									<p className='text-sm text-[#ffffff60]'>Region</p>
									<p className='text-[#ffffff90] truncate'>{profile.region}</p>
								</div>
							</div>
						)}

						{profile.access_key_id && (
							<div className='flex gap-2 items-center bg-[#ffffff10] p-4 rounded-xl'>
								<img src='/icons/key.svg' className='w-5 h-5 opacity-70 shrink-0' />
								<div className='flex-1 min-w-0'>
									<p className='text-sm text-[#ffffff60]'>Access Key ID</p>
									<div className='flex items-center justify-between gap-2'>
										<p className='text-[#ffffff90] font-mono truncate'>
											{showAccessKey ? profile.access_key_id : maskKey(profile.access_key_id)}
										</p>
										<button
											onClick={() => setShowAccessKey(!showAccessKey)}
											className='p-1 hover:bg-[#ffffff10] rounded-lg transition-colors shrink-0'
										>
											<img src={showAccessKey ? '/icons/eye-off.svg' : '/icons/eye.svg'} />
										</button>
									</div>
								</div>
							</div>
						)}

						{profile.secret_access_key && (
							<div className='flex gap-2 items-center bg-[#ffffff10] p-4 rounded-xl'>
								<img src='/icons/key.svg' className='w-5 h-5 opacity-70 shrink-0' />
								<div className='flex-1 min-w-0'>
									<p className='text-sm text-[#ffffff60]'>Secret Access Key</p>
									<div className='flex items-center justify-between gap-2'>
										<p className='text-[#ffffff90] font-mono truncate'>
											{showSecretKey ? profile.secret_access_key : maskKey(profile.secret_access_key)}
										</p>
										<button
											onClick={() => setShowSecretKey(!showSecretKey)}
											className='p-1 hover:bg-[#ffffff10] rounded-lg transition-colors shrink-0'
										>
											<img src={showSecretKey ? '/icons/eye-off.svg' : '/icons/eye.svg'} />
										</button>
									</div>
								</div>
							</div>
						)}

						{profile.output && (
							<div className='flex gap-2 items-center bg-[#ffffff10] p-4 rounded-xl'>
								<img src='/icons/terminal.svg' className='w-5 h-5 opacity-70 shrink-0' />
								<div className='flex-1 min-w-0'>
									<p className='text-sm text-[#ffffff60]'>Output Format</p>
									<p className='text-[#ffffff90] truncate'>{profile.output}</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
