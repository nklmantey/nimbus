type ErrorStateProps = {
	message: string
}

type LoaderProps = {
	message?: string
}

type TypographyProps = {
	as: 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'code'
	children: React.ReactNode
	className?: string
}

type ButtonProps = {
	title: string
	onClick?: () => void
	isLoading?: boolean
	isDisabled?: boolean
	className?: string
	icon?: string
	type?: 'button' | 'submit' | 'reset'
}

type InputProps = {
	placeholder?: string
	error?: string
	label?: string
	className?: string
	isPassword?: boolean
	type?: string
	name?: string
	value?: string
	onChange?: React.ChangeEventHandler<HTMLInputElement>
}
