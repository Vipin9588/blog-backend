import { Request, Response } from "express";
import { deleteUser } from "#/models/user/delete-user.model.js";

 const deleteUserController = async (
    req: Request,
    res: Response
) => {
    try {
         const {id} = req.user
        const deletedUser = await deleteUser(id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully.",
            data: deletedUser,
        });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "Invalid user ID") {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }

            if (error.message === "User not found") {
                return res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export {deleteUserController}