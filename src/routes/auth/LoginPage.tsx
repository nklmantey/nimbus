import { OptionsCard } from '@/components/auth'
import { Typography } from '@/components/global'
import { BackButton } from '@/components/ui'

const options = [
	{
		title: 'aws sso',
		description: 'login to your account',
		icon: '/icons/lock.svg',
	},
	{
		title: 'aws credentials',
		description: 'login to aws using your access key and secret key',
		icon: '/icons/key.svg',
	},
	{
		title: 'github',
		description: 'login to your account',
		icon: '/icons/github.svg',
	},
]

export default function LoginPage() {
	return (
		<div className='flex flex-col items-center justify-center w-full h-screen gap-8 min-w-[400px]'>
			<div className='flex items-center gap-4 justify-between'>
				<BackButton />
				<Typography as='h1'>nimbus.</Typography>
			</div>

			{/* LOGIN OPTIONS */}
			<div className='flex flex-col px-12 lg:px-48 w-full items-center gap-4'>
				<Typography as='body' className='text-center'>
					select an option to authenticate yourself
				</Typography>
				<div className='flex gap-4 w-full'>
					{options.map((option) => (
						<OptionsCard key={option.title} {...option} />
					))}
				</div>
			</div>
		</div>
	)
}
