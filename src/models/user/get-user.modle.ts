import prisma from "#/config/prisma.js";

const getUser = async (userId: number) => {
    if (!userId || userId <= 0) {
        throw new Error("Invalid User Id")
    }
    try {
        const response = await prisma.users.findUnique({
            where: {
                id: userId,
            },
            include: {
                user_profiles: true,
            },
        });

        if (!response) {
            throw new Error("User not found");
        }
        return response;
    } catch (error) {
        throw error;
    }
};



