
import prisma from "#/config/prisma.js";
import type {createBlogMediaDTO,updateBlogMediaDTO} from "#/type/blog_media/blod_media.type.js";

export const createBlogMediaModel = async (
    data: createBlogMediaDTO
) => {
    return await prisma.blog_media.create({
        data: {
            uploaded_by: data.uploaded_by,
            blog_id: data.blog_id,
            file_url: data.file_url,
            file_name: data.file_name,
            file_type: data.file_type,
            mime_type: data.mime_type,
            file_size: data.file_size,
            alt_text: data.alt_text,
            caption: data.caption,
            sort_order: data.sort_order
        }
    });
};


export const updateBlogMediaModel = async (
    blog_media_id: number,
    uploaded_by: number,
    data: updateBlogMediaDTO
) => {
    return await prisma.blog_media.updateMany({
        where: {
            id: blog_media_id,
            uploaded_by: uploaded_by
        },
        data: {
            ...data
        }
    });
};


export const deleteMedia = async(user:number,blogId:number,mediaId:number)=>{
    return await prisma.blog_media.delete({
        where:{
            id:mediaId,
            uploaded_by:user,
            blog_id:blogId
        }
    })
}