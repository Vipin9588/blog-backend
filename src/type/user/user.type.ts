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


export {userType}