import prisma from "#/config/prisma.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";


const verifyEmail = async (user_id: number) => {
    if (!user_id && user_id <= 0) {
        throw new Error("Invalid user ID");
    }
    
    const findExpiredOtp = await prisma.email_verification_tokens.findFirst({
        where: {
            user_id: user_id,
        },
        orderBy: {
            created_at: 'desc'
        }
    });
    const expiresAt = new Date(findExpiredOtp?.expire_at ||0).getTime();
    const currentTime = new Date();
    console.log("Current Time:", currentTime);
    console.log("Expires At:", expiresAt);
    console.log("current "+currentTime+" expires at "+expiresAt);
    console.log("token valid ", currentTime.getTime() > expiresAt);
    if (expiresAt < currentTime.getTime()) {
        throw new Error("Verification token has expired");
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