export interface User {
    _id: string;
    email: string;
    username: string;
    accessToken: string;
  }

  export interface UserCredentials {
    email: string;
    password: string;
  }

  export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
    rePassword: string;
  }
  
  export interface AuthResponse {
    _id: string;
    email: string;
    username: string;
    accessToken: string;
  }
  
  export interface ProfileDetails {
    username: string;
    email: string;
  }