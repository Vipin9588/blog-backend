import { loginUser } from "#/models/user/get-user.modle.js";
import { Request, Response } from "express";
import { tokenGenerator } from "#/helpers/jwt.helper.js";
import { env } from "#/config/env.js";
const loginUserController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }
        const user = await loginUser(email, password);
        const payload = {
            id: user.id,
            email: user.email,
            role: user.roles.role_name,
        }
        const token = tokenGenerator(payload);

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
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