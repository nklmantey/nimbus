import { Button, Input, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui'
import { ProfileSchemaInput, profileSchema } from '@/schemas'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useProfiles } from '@/contexts/ProfilesContext'

export default function AddProfileSheet() {
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { addProfile, fetchProfiles } = useProfiles()
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProfileSchemaInput>({
		resolver: zodResolver(profileSchema),
	})

	const onSubmit = async (data: ProfileSchemaInput) => {
		try {
			setIsLoading(true)

			// Transform the form data to match the AwsProfile interface
			await addProfile({
				name: data.name,
				access_key_id: data.accessKeyId,
				secret_access_key: data.secretAccessKey,
				region: data.region,
				output: data.output,
			})

			fetchProfiles()
			setIsOpen(false)
		} catch (error) {
			console.error('Failed to add profile:', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (!isOpen) {
			reset()
		}
	}, [isOpen])

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<Button title='add new aws profile' onClick={() => setIsOpen(true)} />
			<SheetContent side='bottom'>
				<SheetHeader>
					<SheetTitle>new aws profile</SheetTitle>
					<SheetDescription>fill in the form below to add a new aws profile</SheetDescription>
				</SheetHeader>

				<form onSubmit={handleSubmit(onSubmit)} className='mt-8 grid grid-cols-2 gap-4'>
					<Controller
						control={control}
						name='name'
						render={({ field }) => (
							<Input error={errors.name?.message} placeholder='profile name' value={field.value} onChange={field.onChange} />
						)}
					/>
					<Controller
						control={control}
						name='accessKeyId'
						render={({ field }) => (
							<Input error={errors.accessKeyId?.message} placeholder='access key id' value={field.value} onChange={field.onChange} />
						)}
					/>
					<Controller
						control={control}
						name='secretAccessKey'
						render={({ field }) => (
							<Input
								error={errors.secretAccessKey?.message}
								placeholder='secret access key'
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
					<Controller
						control={control}
						name='region'
						render={({ field }) => (
							<Input error={errors.region?.message} placeholder='region' value={field.value} onChange={field.onChange} />
						)}
					/>
					<Controller
						control={control}
						name='output'
						render={({ field }) => (
							<Input error={errors.output?.message} placeholder='output format' value={field.value} onChange={field.onChange} />
						)}
					/>

					<div className='mt-8 flex justify-end'>
						<Button title='save profile' type='submit' isLoading={isLoading} />
					</div>
				</form>
			</SheetContent>
		</Sheet>
	)
}
