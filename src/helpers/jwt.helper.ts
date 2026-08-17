import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';
import { env } from '#/config/env.js';
import { TokenPayload,refreshPayload } from '#/type/user/user.type.js';



const tokenGenerator = (payload: TokenPayload) => {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }
  if (!payload) { throw new Error("Enter the payload") }
  const token = jwt.sign(payload, env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"]
  })
  return token;
}


const tokenVerification = <T>(token: string):T=> {

  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.verify(token, env.JWT_SECRET) as T;
}

const refreshTokenGenrate = (payload:refreshPayload ) => {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }
  if (!payload) { throw new Error("Enter the payload") }
  const refresToken = jwt.sign(payload, env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"]
  })
  return refresToken;
}



export { tokenGenerator, tokenVerification,refreshTokenGenrate };   