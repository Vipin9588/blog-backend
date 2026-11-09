import prisma from "#/config/prisma.js";

const createOtpEntry = async (user_id: number, otp: string, expires_at: Date) => {
    if (!user_id || user_id <= 0) {
        throw new Error("Invalid user ID");
    }
    if (!otp || otp.toString().length === 0) {
        throw new Error("OTP cannot be empty");
    }
    if (!expires_at || !(expires_at instanceof Date)) {
        throw new Error("Invalid expiration date");
    }

    try {
        const response = await prisma.email_verification_tokens.create({
            data: {
                user_id: user_id,
                otp_hash: otp,
                expire_at: expires_at
            }
        });
        return otp;
    } catch (error) {
        throw new Error("Failed to create OTP entry");
    }
} 

export { createOtpEntry };