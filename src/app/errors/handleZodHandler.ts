import { ZodError } from 'zod'
import { TErrorSources } from '../interface/error'

const handleZodHandler = (err: ZodError) => {
  const errorSources: TErrorSources = err.issues?.map(issue => {
    return {
      path: issue?.path[issue.path.length - 1] as string,
      message: issue?.message,
    }
  })

  const statusCode = 500

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  }
}

export default handleZodHandler
