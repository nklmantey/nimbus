import { IconCloudOff } from '@tabler/icons-react'
import Typography from './Typography'

export default function EmptyState() {
	return (
		<div className='flex flex-col border border-dashed border-[#ffffff50] items-center justify-center gap-4 p-4 bg-[#ffffff09] backdrop-blur-md shadow rounded-xl'>
			<div className='p-4 bg-[#ffffff06] rounded-full'>
				<IconCloudOff className='text-[#ffffff60]' />
			</div>
			<div className='flex flex-col items-center gap-1 text-center'>
				<Typography as='h3' className='text-[#ffffff90]'>
					no aws profiles found
				</Typography>
				<Typography as='body' className='max-w-sm text-[#ffffff60]'>
					we couldn't find any aws profiles in your <code className='text-[#ffffff90] bg-[#ffffff10] px-1 rounded'>~/.aws/credentials</code>{' '}
					or <code className='text-[#ffffff90] bg-[#ffffff10] px-1 rounded'>~/.aws/config</code> files. to get started, configure your AWS
					credentials using the AWS CLI.
				</Typography>
				<Typography as='code' className='mt-4 p-2 bg-[#00000050] rounded text-sm'>
					aws configure
				</Typography>
			</div>
		</div>
	)
}
