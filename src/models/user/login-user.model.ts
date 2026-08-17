import prisma from "#/config/prisma.js";
import { verifyPassword } from "#/helpers/password.helper.js";

const loginUser = async (userEmail: string, password: string) => {

    try {
        const user = await prisma.users.findUnique({
            where: {
                email: userEmail,
            },
            include: {
                user_profiles: true,
                roles: true
            },
        });

        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await verifyPassword(
            password,
            user.password_hash
        );

        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        return user
    } catch (error) {
        throw error;
    }
};



export { loginUser }