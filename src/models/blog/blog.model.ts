import prisma from "#/config/prisma.js";
import { createBlog } from "../../type/blog/blog.type.js";

// Extract only the status type
type BlogStatus = createBlog["status"];
const createNewBlog = async(B:createBlog)=>{  // create a new blog post
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


const deleteBlog = async(blog_id:number)=>{ // delete a blog post by id
    const blog = await prisma.blogs.delete({
        where: {
            id: blog_id
        }
    });
    return blog;
};

const publishBlog = async(blog_id:number, status:BlogStatus)=>{
    const blog = await prisma.blogs.update({
        where: {
            id: blog_id
        },
        data: {
            status: status
        }
    })

    return blog;
}

const updateBlog = async(blog_id:number, B:createBlog)=>{
    const blog = await prisma.blogs.update({
        where:{
            id:blog_id
        },
        data:B
    })
    return blog;
}


export {createNewBlog, deleteBlog, publishBlog,updateBlog}