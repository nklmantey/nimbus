import { ErrorState, Loader } from '@/components/global'
import { SecondaryButton } from '@/components/ui'
import { Link, useParams, Navigate } from 'react-router'
import { useState } from 'react'
import { useProfiles } from '@/contexts/ProfilesContext'

// AWS Regions - we'll replace this with AWS SDK integration later
const AWS_REGIONS = [
	'us-east-1', // US East (N. Virginia)
	'us-east-2', // US East (Ohio)
	'us-west-1', // US West (N. California)
	'us-west-2', // US West (Oregon)
	'af-south-1', // Africa (Cape Town)
	'ap-east-1', // Asia Pacific (Hong Kong)
	'ap-south-1', // Asia Pacific (Mumbai)
	'ap-northeast-1', // Asia Pacific (Tokyo)
	'ap-northeast-2', // Asia Pacific (Seoul)
	'ap-northeast-3', // Asia Pacific (Osaka)
	'ap-southeast-1', // Asia Pacific (Singapore)
	'ap-southeast-2', // Asia Pacific (Sydney)
	'ca-central-1', // Canada (Central)
	'eu-central-1', // Europe (Frankfurt)
	'eu-west-1', // Europe (Ireland)
	'eu-west-2', // Europe (London)
	'eu-west-3', // Europe (Paris)
	'eu-north-1', // Europe (Stockholm)
	'me-south-1', // Middle East (Bahrain)
	'sa-east-1', // South America (São Paulo)
]

export default function ProfilePage() {
	const { profile: profileName } = useParams()
	const { profiles, isLoading, error } = useProfiles()
	const [showAccessKey, setShowAccessKey] = useState(false)
	const [showSecretKey, setShowSecretKey] = useState(false)
	const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false)

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
					<SecondaryButton title='back to dashboard' />
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
						<SecondaryButton title='back' />
					</Link>
					<ErrorState message={`Profile "${profileName}" not found`} />
				</div>
			</div>
		)
	}

	const maskKey = (key: string) => '•'.repeat(Math.min(key.length, 40))

	return (
		<div className='w-full min-h-screen flex items-start justify-center'>
			<div className='w-full max-w-7xl p-4 sm:p-6 lg:p-8 flex flex-col gap-4'>
				<div className='flex items-center gap-2'>
					<Link to='/dashboard'>
						<SecondaryButton title='back' />
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
									<button
										onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
										className='flex items-center justify-between w-full group'
									>
										<p className='text-[#ffffff90] group-hover:text-white transition-colors truncate'>{profile.region}</p>
										<img
											src='/icons/chevron-down.svg'
											className={`transition-transform duration-200 ml-2 shrink-0 ${isRegionDropdownOpen ? 'rotate-180' : ''}`}
										/>
									</button>

									{isRegionDropdownOpen && (
										<div className='absolute left-0 right-0 mt-2 bg-[#ffffff15] backdrop-blur-lg rounded-xl py-2 max-h-64 overflow-y-auto z-10 shadow-lg'>
											{AWS_REGIONS.map((region) => (
												<button
													key={region}
													className='w-full px-4 py-2 text-left hover:bg-[#ffffff10] text-[#ffffff90] hover:text-white transition-colors'
													onClick={() => {
														// We'll implement region change later
														setIsRegionDropdownOpen(false)
													}}
												>
													{region}
												</button>
											))}
										</div>
									)}
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
