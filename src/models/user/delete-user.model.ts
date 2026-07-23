import prisma from "#/config/prisma.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";


const deleteUser = async (user_id: number) => {

    if (!user_id && user_id <= 0) {
        throw new Error("Invalid user ID");
    }

    try {
        const response = await prisma.users.delete({
            where: {
                id: user_id
            }
        })
        return true
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
            throw new Error("User not found")
        }
        console.error("Failed to delete user:", error);
        throw error;
    }
}

