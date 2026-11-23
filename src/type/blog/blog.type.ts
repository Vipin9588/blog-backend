export interface createBlog {
    user_id: number;
    category_id?: number;
    title: string;
    content: string;
    cover_image?: string | null;
    status?: "draft" | "published" | "archived";
    visibility?: "public" | "private" | "unlisted";
    allow_comments?: boolean;
}

