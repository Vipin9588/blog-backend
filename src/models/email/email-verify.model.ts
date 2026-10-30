import prisma from "#/config/prisma.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";


const verifyEmail = async (user_id: number) => {
    if (!user_id && user_id <= 0) {
        throw new Error("Invalid user ID");
    }
     const  response = await prisma.users.update({
        where: {
            id: user_id
        },
        data: {
            is_verified: true
        }
     })
}

export {verifyEmail}