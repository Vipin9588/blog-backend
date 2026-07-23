import prisma from "#/config/prisma.js";
import { userProfileType, userType } from '#/type/user/user.type.js';

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