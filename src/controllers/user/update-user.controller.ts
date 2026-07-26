import { updateUserProfile } from "#/models/user/update-user-profile.model.js";
import { Request, Response } from "express";
const updateUserController = async (req: Request, res: Response) => {
    try {
        const {id} = req.user;
        const newData = req.body;
        const updated = await updateUserProfile(id, newData);
        return res.status(200).json({
            success: true,
            message: "Updated Successfully",
            data: updated
        })
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "User Profile Not found") {
                return res.status(404).json({
                    success: false,
                    message: error.message,
                })
            }
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export {updateUserController}