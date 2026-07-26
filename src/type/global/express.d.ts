import { TokenPayload } from "../user/user.type.js";

declare global {
    namespace Express {
        interface Request {
            user:TokenPayload
        }
    }
}

export{}