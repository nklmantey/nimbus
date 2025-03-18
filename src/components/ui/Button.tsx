import { cn } from '@/lib/utils'
import { Typography } from '../global'

type PrimaryButtonProps = {
	title: string
	onClick?: () => void
	isLoading?: boolean
	isDisabled?: boolean
	className?: string
}

type SecondaryButtonProps = {
	icon?: string
} & PrimaryButtonProps

export function PrimaryButton({ title, onClick, isLoading, isDisabled, className }: PrimaryButtonProps) {
	return (
		<button
			className={cn(
				'bg-black/50 px-6 py-2 cursor-pointer disabled:opacity-10 rounded-sm shadow backdrop-blur-md  hover:text-white hover:bg-black transition-all duration-200',
				className
			)}
			onClick={onClick}
			disabled={isLoading || isDisabled}
		>
			{title}
		</button>
	)
}

export function SecondaryButton({ title, onClick, isLoading, isDisabled, className, icon }: SecondaryButtonProps) {
	return (
		<button
			onClick={onClick}
			disabled={isLoading || isDisabled}
			className={cn(
				'group border border-[#ffffff10] px-4 py-1 rounded-full flex items-center gap-2 cursor-pointer border-dashed hover:border[#ffffff30] bg-[#ffffff08] hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ease-out h-fit w-fit',
				icon && 'py-2',
				className
			)}
		>
			<Typography as='small' className='mt-0.5'>
				{title}
			</Typography>
			{icon && <img src={icon} className='size-4' />}
		</button>
	)
}
