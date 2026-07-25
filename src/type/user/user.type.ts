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

//rfresh token type

 interface RefreshTokenTableType {
  user_id: number;
  jti: string;
  token: string;
  expires_at: Date;
}

// payload Type

interface TokenPayload {
  id: number;
  email: string;
  role: string;
}

interface refreshPayload{ 
  sub: string, 
  jti: string 
}

export { userType, userProfileType,userProfileDTO,RefreshTokenTableType,TokenPayload,refreshPayload}