type InputProps = {
	placeholder: string
	error?: string
	label?: string
	className?: string
}

export default function Input({ placeholder, error, label, className }: InputProps) {
	return (
		<div>
			<input type='text' placeholder={placeholder} className='border border-[#ffffff30] w-full min-w-[400px] rounded px-4 py-2' />
		</div>
	)
}
