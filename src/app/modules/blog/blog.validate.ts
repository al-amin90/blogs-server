import z from 'zod'

const blogValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
  }),
})

export default blogValidationSchema
