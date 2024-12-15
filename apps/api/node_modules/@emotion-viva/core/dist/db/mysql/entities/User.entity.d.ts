import { UserProfile } from './UserProfile.entity';
export declare class User {
    user_id: number;
    nickname: string;
    password_hash: string;
    profile_picture: string;
    email: string;
    username: string;
    is_admin: string;
    create_at: Date;
    update_at: Date;
    profile: UserProfile;
}
