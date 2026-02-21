import jwt from 'jsonwebtoken'

export const createToken = (
  payload: { _id: string; email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  } as jwt.SignOptions)
}
