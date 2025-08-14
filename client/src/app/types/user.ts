export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    accessToken: string;
}

export interface UserForAuth {
    username: string;
    _id: string;
    email: string;
    password: string;
}

export interface ProfileDetails {
    username: string;
    email: string;
}