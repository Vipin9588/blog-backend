interface userType {
    id?: number,
    email: string,
    password_hash: string,
    role_id?: number,
    is_verified?: boolean,
    status?: 'active' | 'inactive' | 'banned'
    created_at?: Date,
    updated_at?: Date
}

interface userProfileDTO{
    user_id?: number,
    username?: string,
    name?: string,
    avatar?: string,
    cover_image?: string,
    bio?: string,
    website_url?: string,
    location: string,
    twitter?: string,
    github?: string,
    linkedin?: string,

}

interface userProfileType {
    user_id: number,
    username: string,
    name: string,
    avatar?: string,
    cover_image?: string,
    bio?: string,
    website_url?: string,
    location: string,
    twitter?: string,
    github?: string,
    linkedin?: string,
}



export { userType, userProfileType,userProfileDTO}