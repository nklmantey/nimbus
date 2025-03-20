import { cn } from '@/lib/utils'
import { Typography } from '../global'
import { IconLoader } from '@tabler/icons-react'

export default function Button({ title, onClick, isLoading, isDisabled, className, icon, type }: ButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={isLoading || isDisabled}
			className={cn(
				'group border border-[#ffffff10] px-4 py-1 rounded-full flex items-center gap-2 cursor-pointer border-dashed hover:border[#ffffff30] bg-[#ffffff08] hover:scale-[1.05] hover:shadow hover:shadow-white/8 hover:backdrop-blur-sm hover:border-[#ffffff50] transition-all duration-300 ease-out h-fit w-fit disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70',
				icon && 'py-2',
				className
			)}
		>
			<Typography as='small' className='mt-0.5'>
				{isLoading ? <IconLoader className='animate-spin' /> : title}
			</Typography>
			{icon && <img src={icon} className='size-4' />}
		</button>
	)
}
