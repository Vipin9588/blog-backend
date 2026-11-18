export interface createBlogMediaDTO {
    uploaded_by: number;
    blog_id: number;
    file_url: string;
    file_name?: string;
    file_type?: "image" | "video" | "audio" | "pdf";
    mime_type?: string;
    file_size?: number;
    alt_text?: string;
    caption?: string;
    sort_order?: number;
}

export type updateBlogMediaDTO = Partial<
    Pick<
        createBlogMediaDTO,
        | "file_url"
        | "file_name"
        | "file_type"
        | "mime_type"
        | "file_size"
        | "alt_text"
        | "caption"
        | "sort_order"
    >
>;