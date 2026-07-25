import prisma from "#/config/prisma.js";
import { userProfileDTO } from "#/type/user/user.type.js";
import { Prisma } from "../../generated/prisma/client.js";

const updateUserProfile = async (userID: number, newData: userProfileDTO) => {
    try {
        const response = await prisma.user_profiles.update({
            where: {
                user_id: userID
            },
            data: newData
        })
        return response;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            throw new Error("User Profile Not found");
        }
        throw error
    }
}

export {updateUserProfile}