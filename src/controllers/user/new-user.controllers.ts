import { Request, Response } from "express";
import { newUser } from "#/models/user/new-user.model.js";
import { hasingPassword } from "#/helpers/password.helper.js";

const createUserController = async (req: Request, res: Response) => {
  try {
    const u = req.body;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }
    const password_hash = await hasingPassword(u.password);
    const user = { ...u, password_hash }
    const createdUser = await newUser(user);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: createdUser,
    });
  } catch (error) {

    if (error instanceof Error && error.message === "Email already exists") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export { createUserController }