export interface User {
    username: string;
    email: string;
    password: string;
  }
  
  export interface AuthError {
    field: string;
    message: string;
  }