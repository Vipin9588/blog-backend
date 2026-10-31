import crypto from "node:crypto";

const generateOTP = (length: number = 6): Number => {
    if (!Number.isInteger(length) || length < 1 || length > 9) {
        throw new Error("OTP length must be between 1 and 9");
    }

    const min = 10 ** (length - 1);
    const max = 10 ** length;

    return crypto.randomInt(min, max)
};

export { generateOTP };