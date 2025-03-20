import { Typography } from '@/components/global'
import { cn } from '@/lib/utils'

export default function Input({ placeholder, error, label, className, isPassword, name, value, onChange }: InputProps) {
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
				name={name}
				value={value}
				onChange={onChange}
				className={cn(
					'border border-[#ffffff10] w-full outline-0 rounded-sm px-4 py-2',
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
