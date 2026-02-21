import z from 'zod'

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string({ error: 'name is required' }),
    email: z.string({ error: 'email is required' }),
    password: z.string({ error: 'password is required' }),
  }),
})

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ error: 'email is required' }),
    password: z.string({ error: 'password is required' }),
  }),
})

export const userValidator = { registerValidationSchema, loginValidationSchema }
