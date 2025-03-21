import { Typography } from '@/components/global'
import { Button } from '../ui'
import { Link } from 'react-router'

interface ProfileCardProps {
	profile: AwsProfile
}

export default function ProfileCard({ profile }: ProfileCardProps) {
	return (
		<Link to={`/dashboard/profile/${profile.name}`}>
			<div className='group border border-[#ffffff10] p-4 rounded-xl flex flex-col items-start gap-4 cursor-pointer border-dashed  hover:border-[#ffffff30] hover:bg-[#ffffff08] hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ease-out h-fit'>
				<Typography as='h3' className='text-white'>
					{profile.name}
				</Typography>

				<div className='flex gap-2 flex-wrap'>
					{profile.region && (
						<div className='flex gap-1 w-fit h-fit items-center justify-start bg-[#ffffff10] px-2 py-1 rounded-full'>
							<img src='/icons/globe.svg' className='w-4 h-4 opacity-70' />
							<Typography as='small' className='text-white'>
								region
							</Typography>
						</div>
					)}

					{profile.access_key_id && (
						<div className='flex gap-1 w-fit items-center justify-start bg-[#ffffff10] px-2 py-1 rounded-full shrink-0'>
							<img src='/icons/key.svg' className='w-4 h-4 opacity-70' />
							<Typography as='small' className='text-white'>
								access key id
							</Typography>
						</div>
					)}

					{profile.secret_access_key && (
						<div className='flex gap-1 w-fit items-center justify-start bg-[#ffffff10] px-2 py-1 rounded-full shrink-0'>
							<img src='/icons/key.svg' className='w-4 h-4 opacity-70' />
							<Typography as='small' className='text-white'>
								secret access key
							</Typography>
						</div>
					)}
				</div>

				<div className='w-full flex items-center justify-end'>
					<Button title='view' icon='/icons/arrow-out.svg' />
				</div>
			</div>
		</Link>
	)
}
