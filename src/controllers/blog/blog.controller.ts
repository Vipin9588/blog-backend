import generateOrGetSlug from "#/controllers/slug/slug.controller.js";
import { createNewBlog,deleteBlog,publishBlog,updateBlog } from "#/models/blog/blog.model.js";
import { Request, Response } from 'express'
const createBlogController = async (req: Request, res: Response) => {
    const { title, content, cover_image, status, visibility, allow_comments } = req.body
    const user_id = req.user?.id;
    console.log("b",req.body)
    try {
        const slug_id = await generateOrGetSlug(title);
        const newBlog = await createNewBlog({
            user_id,
            category_id: slug_id,
            title,
            content,
            cover_image,
            status,
            visibility,
            allow_comments
        });
        res.status(201).json(newBlog);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }

}

 
const deleteBlogController = async (req: Request, res: Response) => {

    const { id } = req.params;
    const blog_id = Number(id);
    if (isNaN(blog_id)) {
        return res.status(400).json({ message: "Invalid blog ID" });
    }
    try {
       const deletedBlog = await deleteBlog(blog_id);
       res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const publishBlogController = async (req: Request, res: Response) => {
    const { blog_id, status } = req.body;
    const Bid = Number(blog_id);

    if (isNaN(Bid) || !["draft", "published", "archived"].includes(status)) {
        return res.status(400).json({ message: "Invalid blog ID or status" })
    }

    try {
        const updatedBlog = await publishBlog(Bid, status);
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const updateBlogController = async(req:Request,res:Response)=>{
    const blogId = Number(req.params?.id);
    const updatedBlog =  req.body;

    if(!blogId || !updatedBlog){
        return res.status(401).json({
            message:"Bad Request"
        })
    }

    try {
        const updated = await updateBlog(blogId,updatedBlog);
        res.status(200).json({message:"successfully updated"})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }

}

export { createBlogController, deleteBlogController, publishBlogController ,updateBlogController}