import { cn } from '@/lib/utils'

export default function Typography({ as, children, className }: TypographyProps) {
	switch (as) {
		case 'h1':
			return <h1 className={cn('text-3xl', className)}>{children}</h1>
		case 'h2':
			return <h2 className={cn('text-2xl', className)}>{children}</h2>
		case 'h3':
			return <h3 className={cn('text-xl', className)}>{children}</h3>
		case 'body':
			return <p className={cn('text-base', className)}>{children}</p>
		case 'small':
			return <p className={cn('text-sm', className)}>{children}</p>
		case 'code':
			return <code className={cn('font-mono', className)}>{children}</code>
	}
}
