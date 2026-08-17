import { deleteRefreshToken } from "#/models/user/delete-user-token.model.js";
import { Response, Request } from "express";
import { tokenVerification } from "#/helpers/jwt.helper.js";
import { refreshPayload } from "#/type/user/user.type.js";
import { env } from "#/config/env.js";

const cookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "none" as const, 
};

const logout = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "No refresh token provided",
            });
        }

        const payload = tokenVerification<refreshPayload>(refreshToken); 

        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);

        await deleteRefreshToken(payload.jti);

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "Refresh token not found") {
                return res.status(404).json({
                    success: false,
                    message: "Token not found",
                });
            }
            if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
                return res.status(401).json({
                    success: false,
                    message: "Invalid or expired token",
                });
            }
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

export { logout };