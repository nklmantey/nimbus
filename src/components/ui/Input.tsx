import { Typography } from '@/components/global'
import { cn } from '@/lib/utils'

type InputProps = {
	placeholder: string
	error?: string
	label?: string
	className?: string
	isPassword?: boolean
}

export default function Input({ placeholder, error, label, className, isPassword }: InputProps) {
	return (
		<div>
			{label && (
				<Typography as='body' className='text-[#ffffff90] mb-1'>
					{label}
				</Typography>
			)}
			<input
				type={isPassword ? 'password' : 'text'}
				placeholder={placeholder}
				className={cn(
					'border border-[#ffffff10] w-full outline-0 min-w-[400px] rounded-sm px-4 py-2',
					error && 'border-[crimson] ring-0 outline-0',
					className
				)}
			/>
			{error && (
				<Typography as='body' className='text-[crimson] mt-1'>
					{error}
				</Typography>
			)}
		</div>
	)
}
