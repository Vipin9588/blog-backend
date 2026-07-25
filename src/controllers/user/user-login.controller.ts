import { loginUser } from "#/models/user/get-user.modle.js";
import { Request, Response } from "express";
import { refreshTokenGenrate, tokenGenerator } from "#/helpers/jwt.helper.js";
import { env } from "#/config/env.js";
import { v4 as uuid4 } from "uuid";
import { addRefreshToken } from "#/models/user/refresh-token.model.js";
import { hasingPassword } from "#/helpers/password.helper.js";
const loginUserController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }
        const user = await loginUser(email, password); // is Exist
        const jti_id = uuid4(); // for unique refersh token

        const payload = {
            id: user.id,
            email: user.email,
            role: user.roles.role_name,
        }

        const refreshPayload = { //refershToke payload
            sub: user.id.toString(),
            jti: jti_id,
        }

        const token = tokenGenerator(payload); // Access Token       
        const refreshToken = refreshTokenGenrate(refreshPayload);
        const hashedRefreshToken = await hasingPassword(refreshToken)
       const refreshTokenTableData = {
            user_id:user.id,
            jti:jti_id,
            token:hashedRefreshToken,
            expires_at: new Date(Date.now()+7*24*60*60*1000)
        }

        await addRefreshToken(refreshTokenTableData);

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: user
        });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "Invalid password") {
                return res.status(401).json({
                    success: false,
                    message: error.message,
                });
            }

            if (error.message === "User not found") {
                return res.status(404).json({
                    success: false,
                    message: error.message
                })
            }
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export { loginUserController }