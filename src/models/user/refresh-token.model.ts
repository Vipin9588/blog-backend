import prisma from "#/config/prisma.js";
import { RefreshTokenTableType } from "#/type/user/user.type.js";

const addRefreshToken = async(tokenData:RefreshTokenTableType)=>{
     if(!tokenData){
         throw new Error("Invalid Token Data");
     }
    try {
       await prisma.refresh_tokens.create({
        data:tokenData
       })
       return true;
    } catch (error) {
        throw error
    }
}

export {addRefreshToken}