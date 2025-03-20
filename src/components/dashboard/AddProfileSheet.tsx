import { Button, Input, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui'

export default function AddProfileSheet() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button title='add new aws profile' />
			</SheetTrigger>
			<SheetContent side='bottom'>
				<SheetHeader>
					<SheetTitle>new aws profile</SheetTitle>
					<SheetDescription>fill in the form below to add a new aws profile</SheetDescription>
				</SheetHeader>

				<div className='mt-8 grid grid-cols-2 gap-4'>
					<Input placeholder='profile name' />
					<Input placeholder='access key id' />
					<Input placeholder='secret access key' />
					<Input placeholder='region' />
					<Input placeholder='output format' />
				</div>

				<div className='mt-8 flex justify-end'>
					<Button title='save profile' />
				</div>
			</SheetContent>
		</Sheet>
	)
}
