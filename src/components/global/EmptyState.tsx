import { IconCloudOff, IconCopy, IconCopyCheckFilled } from '@tabler/icons-react'
import Typography from './Typography'
import { useState } from 'react'

export default function EmptyState() {
	const [hasCopied, setHasCopied] = useState(false)

	const handleCopy = async () => {
		await navigator.clipboard.writeText('aws configure --profile <profile_name>')
		setHasCopied(true)
		setTimeout(() => setHasCopied(false), 2000)
	}

	return (
		<div className='flex flex-col border border-dashed border-[#ffffff50] items-center justify-center gap-4 p-4 bg-[#ffffff09] backdrop-blur-md shadow rounded-xl'>
			<div className='p-4 bg-[#ffffff06] rounded-full'>
				<IconCloudOff className='text-[#ffffff60]' />
			</div>
			<div className='flex flex-col items-center gap-4 text-center'>
				<Typography as='h3' className='text-[#ffffff90]'>
					no aws profiles found
				</Typography>
				<Typography as='body' className='max-w-sm text-[#ffffff60]'>
					we couldn't find any aws profiles in your <code className='text-[#ffffff90] bg-[#ffffff10] px-1 rounded'>~/.aws/credentials</code>{' '}
					or <code className='text-[#ffffff90] bg-[#ffffff10] px-1 rounded'>~/.aws/config</code> files. to get started, configure your AWS
					credentials using the AWS CLI.
				</Typography>

				<div className='flex items-center gap-2 mt-4'>
					<Typography as='code' className='p-2 bg-[#00000050] rounded text-sm'>
						aws configure --profile &lt;profile_name&gt;
					</Typography>
					<button onClick={handleCopy} className='p-2 cursor-pointer hover:bg-[#ffffff10] rounded-full transition-colors duration-200'>
						{hasCopied ? <IconCopyCheckFilled size={18} className='text-green-500' /> : <IconCopy size={18} className='text-[#ffffff60]' />}
					</button>
				</div>
			</div>
		</div>
	)
}
