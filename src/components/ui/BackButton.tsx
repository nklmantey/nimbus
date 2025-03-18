import { useNavigate } from 'react-router'

export default function BackButton() {
	const navigate = useNavigate()
	return (
		<button
			className='bg-black/50 px-2 py-1 cursor-pointer disabled:opacity-20 rounded hover:text-white hover:bg-black transition-all duration-200 flex items-center justify-center mb-1'
			onClick={() => navigate(-1)}
		>
			<img src='/icons/arrow-left.svg' />
		</button>
	)
}
