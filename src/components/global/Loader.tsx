import Typography from './Typography'
import { IconLoader } from '@tabler/icons-react'

type LoaderProps = {
	message?: string
}

export default function Loader({ message }: LoaderProps) {
	return (
		<div className='flex items-center justify-center gap-2 bg-[#ffffff09] backdrop-blur-md shadow  px-4 py-1 rounded-full'>
			<IconLoader size={16} className='text-[#ffffff90] rounded-full animate-spin' />
			{message && (
				<Typography as='small' className='mt-0.5'>
					{message}
				</Typography>
			)}
		</div>
	)
}
