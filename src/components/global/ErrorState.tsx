import Typography from './Typography'

type ErrorStateProps = {
	message: string
}

export default function ErrorState({ message }: ErrorStateProps) {
	return (
		<div className='border p-4 border-dashed rounded-xl backdrop-blur-md shadow border-[crimson]/50 bg-[crimson]/10 flex items-center gap-2'>
			<img src='/icons/error.svg' alt='error' />
			<Typography as='body' className='text-[crimson]'>
				{message}
			</Typography>
		</div>
	)
}
