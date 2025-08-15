export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    rePassword?: string,
    accessToken: string;
}

export interface UserForAuth {
    _id: string;
    email: string;
    password: string;
}

export interface ProfileDetails {
    username: string;
    email: string;
}