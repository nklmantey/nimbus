type ButtonProps = {
	title: string
	onClick?: () => void
	isLoading?: boolean
	isDisabled?: boolean
}

export default function Button({ title, onClick, isLoading, isDisabled }: ButtonProps) {
	return (
		<button
			className='bg-black/50 px-6 py-2 cursor-pointer disabled:opacity-10 rounded  hover:text-white hover:bg-black transition-all duration-200'
			onClick={onClick}
			disabled={isLoading || isDisabled}
		>
			{title}
		</button>
	)
}
