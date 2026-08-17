import { findUser } from "#/models/user/get-user.model.js";
import { Request,Response } from "express";

const getUserController = async(req:Request,res:Response)=>{
    try {
        const {id} = req.user;
        const user = await findUser(id);
         return res.status(200).json({
            success:true,
            message:"User find successfully",
            data:user
          })
    } catch (error) {
        if(error instanceof Error){
            if(error.message === "User not found"){
                return res.status(404).json({
                    success:false,
                    message:error.message
                })
            }
        }
        res.status(500).json({
            message:"Internal Server error"
        })
    }
}