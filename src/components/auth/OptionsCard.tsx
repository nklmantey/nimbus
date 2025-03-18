import { Typography } from '../global'

type OptionsCardProps = {
	title: string
	description: string
	icon: string
}

export default function OptionsCard({ title, icon }: OptionsCardProps) {
	return (
		<div
			className='group border border-[#ffffff10] p-8 rounded flex flex-col items-center gap-2 cursor-pointer flex-1 
		hover:border-[#ffffff30] hover:bg-[#ffffff08] hover:scale-[1.02] hover:shadow-lg
		transition-all duration-300 ease-out'
		>
			<Typography as='h3'>{title}</Typography>
			<img src={icon} alt={title} className='w-10 h-10 transition-transform duration-300 group-hover:scale-110' />
		</div>
	)
}
