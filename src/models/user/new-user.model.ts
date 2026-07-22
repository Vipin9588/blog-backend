import prisma from "#/config/prisma.js";
import { userType } from '#/type/user/user.type.js';

const DEFAULT_ROLE_ID = 2; 
const newUser = async (user: userType) => {
  try {
    const createdUser = await prisma.users.create({
      data: {
        email: user.email,
        password_hash: user.password_hash,
        is_verified:false,
        roles: {
          connect: { id: DEFAULT_ROLE_ID },
        },
      },
    });
    return createdUser;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
};

