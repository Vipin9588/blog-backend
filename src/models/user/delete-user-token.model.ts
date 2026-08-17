import prisma from "#/config/prisma.js";
import { Prisma } from "#/generated/prisma/client.js";

const deleteRefreshToken = async (jti_id: string) => {

    if (!jti_id || typeof jti_id !== "string") {
        throw new Error("Invalid id");
    }

    try {
        const deleted = await prisma.refresh_tokens.delete({
            where: {
                jti: jti_id
            }
        })

        return deleted;

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            throw new Error("Refresh token not found");
        }
        throw error;
    }
}

export {deleteRefreshToken};