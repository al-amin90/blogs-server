import z from 'zod'

const blogValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    author: z.string().optional(),
    isPublished: z.boolean().optional(),
  }),
})

const blogUpdateValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    author: z.string().optional(),
    isPublished: z.boolean().optional(),
  }),
})

export const blogValidation = {
  blogValidationSchema,
  blogUpdateValidationSchema,
}
