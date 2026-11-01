import crypto from "node:crypto";

 interface OTPResult {
        otp: number;
        expiresAt: Date;
 }

const generateOTP = (length: number = 6): OTPResult => {
    if (!Number.isInteger(length) || length < 1 || length > 9) {
        throw new Error("OTP length must be between 1 and 9");
    }
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const min = 10 ** (length - 1);
    const max = 10 ** length;
    const cryptoRandomInt =  crypto.randomInt(min, max);
    return { otp: cryptoRandomInt, expiresAt }

}
export { generateOTP };