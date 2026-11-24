import {createBlogMediaModel, updateBlogMediaModel,deleteMedia} from "#/models/blog_media/blog_media.model.js"
import { Request, Response } from 'express'

const createBlogMediaController = async (req: Request, res: Response) => {
   const { uploaded_by, blog_id, file_url} = req.body;
   if(!uploaded_by || !blog_id || !file_url){
     return res.status(400).json({ error: "Missing required fields" });
   }
  
   try{
    const newBlogMedia = await createBlogMediaModel(req.body);
    return res.status(201).json(newBlogMedia);
   }
catch (error) {
    return res.status(500).json({ error: "Internal server error" });
}
}


const updateBlogMediaController = async (req: Request, res: Response) => {
    const { blog_media_id, uploaded_by,data } = req.body;
    if(!blog_media_id || !uploaded_by || !data){
        return res.status(400).json({ error: "Missing required fields" });
    }
    try{
        const updatedBlogMedia = await updateBlogMediaModel(blog_media_id, uploaded_by, data);
        return res.status(200).json(updatedBlogMedia);
    }catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const deleteMediaController = async (
    req: Request,
    res: Response
) => {
    try {
        const user = req.user.id;
        const blogId = Number(req.params.blogId);
        const mediaId = Number(req.params.mediaId);

        const result = await deleteMedia(user, blogId, mediaId);

        if (!result) {
            return res.status(404).json({
                message: 'Media not found or unauthorized'
            });
        }

        return res.status(200).json({
            message: 'Media deleted successfully'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

export {createBlogMediaController,updateBlogMediaController,deleteMediaController}