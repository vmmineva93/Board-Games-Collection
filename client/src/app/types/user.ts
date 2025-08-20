// export interface User {
//     _id: string;
//     email: string;
//     username: string;
//     password: string;
//     rePassword: string,
//     accessToken: string;
// }

// export interface ProfileDetails {
//     username: string;
//     email: string;
// }

// Реален user, който пазим в app state
export interface User {
    _id: string;
    email: string;
    username: string;
    accessToken: string;
  }
  
  // Това е payload за login
  export interface UserCredentials {
    email: string;
    password: string;
  }
  
  // Payload за register
  export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
    rePassword: string;
  }
  
  // Отговор от login/register (може да е същото като User)
  export interface AuthResponse {
    _id: string;
    email: string;
    username: string;
    accessToken: string;
  }
  
  // За профил страница (ако API връща ограничени данни)
  export interface ProfileDetails {
    username: string;
    email: string;
  }