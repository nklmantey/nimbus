import { Typography } from '@/components/global'
import { BackButton, Input } from '@/components/ui'

export default function LoginPage() {
	return (
		<div className='flex flex-col items-center justify-center w-full h-screen gap-8'>
			<div className='flex items-center gap-4 justify-between'>
				<BackButton />
				<Typography as='h1'>nimbus.</Typography>
			</div>

			<div className='flex flex-col items-center justify-center gap-4'>
				<Input placeholder='email' />
			</div>
		</div>
	)
}
