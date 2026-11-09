import crypto from "node:crypto";
import { createOtpEntry } from "#/models/email/otp.model.js";

const generateOTP = async(user_id:number,length: number = 6):Promise<string> => {
    if (!Number.isInteger(length) || length < 1 || length > 9) {
        throw new Error("OTP length must be between 1 and 9");
    }
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const min = 10 ** (length - 1);
    const max = 10 ** length;
    const cryptoRandomInt =  crypto.randomInt(min, max);
    const otp = await createOtpEntry(user_id, cryptoRandomInt.toString(), expiresAt);
    return  otp;
}
export { generateOTP };