export interface User {
    _id: string;
    email: string;
    username: string;
    password: string;
    rePassword: string,
    accessToken: string;
}

export interface ProfileDetails {
    username: string;
    email: string;
}