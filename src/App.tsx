import { Typography } from '@/components/global'
import { Button } from '@/components/ui'
import { Link } from 'react-router'

export default function App() {
	return (
		<div className='flex flex-col items-center justify-center w-full h-screen gap-8'>
			<div className='flex flex-col items-center justify-center gap-2'>
				<Typography as='h1'>nimbus.</Typography>
				<Typography as='body'>manage your aws profiles better.</Typography>
			</div>

			<Link to='/dashboard'>
				<Button title='get started' />
			</Link>
		</div>
	)
}
