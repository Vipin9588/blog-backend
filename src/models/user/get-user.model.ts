import prisma from "#/config/prisma.js";

const findUser = async (id: number) => {
    const user = await prisma.user_profiles.findUnique({
        where: {
            user_id: id
         }
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export {findUser}