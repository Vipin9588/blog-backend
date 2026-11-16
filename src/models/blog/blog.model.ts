import prisma from "#/config/prisma.js";
import { createBlog } from "../../type/blog/blog.type.js";

const createNewBlog = async(B:createBlog)=>{
    const {user_id, category_id, title, content, cover_image, status, visibility, allow_comments} =B
    const blog = prisma.blogs.create({
          data:{
             user_id:user_id,
             category_id:category_id,
             title:title,
             content:content,
             cover_image:cover_image,
             status:status,
             visibility:visibility,
             allow_comments:allow_comments
          }
    })
    return blog;
}

export {createNewBlog}