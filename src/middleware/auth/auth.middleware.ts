import { NextFunction, Request, Response } from "express"
import { tokenVerification } from "#/helpers/jwt.helper.js";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { TokenPayload } from "#/type/user/user.type.js";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({
            success: false,
            message: "Authentication required"
        });
    }

    try {
        const payload: TokenPayload = tokenVerification(accessToken);
        req.user = payload;
        return next();

    } catch (error) {

        if (error instanceof TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: "Access token expired"
            });
        }

        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Invalid access token"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}