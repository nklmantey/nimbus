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

type InputProps = {
	placeholder: string
	error?: string
	label?: string
	className?: string
	isPassword?: boolean
}
