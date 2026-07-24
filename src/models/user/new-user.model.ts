import prisma from "#/config/prisma.js";
import { userProfileType, userType } from '#/type/user/user.type.js';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

 const DEFAULT_ROLE_ID = 2; 
 const newUser = async (user: userType) => {
  try {
    return await prisma.users.create({
      data: {
        email: user.email,
        password_hash: user.password_hash,
        is_verified: false,
        roles: {
          connect: { id: DEFAULT_ROLE_ID },
        },
      },
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("Email already exists");
    }

    throw error;
  }
};

const newUserProfile = async(userInfo:userProfileType)=>{
  try {
    const response =  await prisma.user_profiles.create({
      data:userInfo
    })

    return response;
  } catch (error) {
     console.error(error);
     throw error
  }
}

export {newUser,newUserProfile}