import { z } from 'zod'

export const profileSchema = z.object({
	name: z.string({ required_error: 'a profile name is required' }),
	accessKeyId: z.string({ required_error: 'an access key id is required' }),
	secretAccessKey: z.string({ required_error: 'a secret access key is required' }),
	region: z.string().optional(),
	output: z.string().optional(),
})

export type ProfileSchemaInput = z.infer<typeof profileSchema>
