import { hash, verify, Algorithm } from '@node-rs/argon2';
import os from 'os';
const hasingPassword = async (password: string):Promise<string> => {
    try {
        const hashed = await hash(password, {
            algorithm: Algorithm.Argon2id,
            memoryCost: 65536,
            timeCost: 5,
            parallelism:2
        })
        return hashed;
    } catch (error) {
        throw error;
    }
}


const verifyPassword = async(password:string,hashedPassword:string):Promise<boolean>=>{
   try {
     const isPassword = await verify(hashedPassword,password);
      return isPassword;
   } catch (error) {
       throw error
   }
}


export {hasingPassword,verifyPassword}