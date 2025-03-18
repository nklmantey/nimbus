import { cn } from '@/lib/utils'

type ButtonProps = {
	title: string
	onClick?: () => void
	isLoading?: boolean
	isDisabled?: boolean
	className?: string
}

export default function Button({ title, onClick, isLoading, isDisabled, className }: ButtonProps) {
	return (
		<button
			className={cn(
				'bg-black/50 px-6 py-2 cursor-pointer disabled:opacity-10 rounded-sm hover:text-white hover:bg-black transition-all duration-200',
				className
			)}
			onClick={onClick}
			disabled={isLoading || isDisabled}
		>
			{title}
		</button>
	)
}
