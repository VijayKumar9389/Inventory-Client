export interface NewUserInput {
    username: string;
    password: string;
}

export interface User {
    id: number;
    username: string;
    isAdmin: boolean;
}

export interface TokenResponse {
    auth: boolean;
    accessToken: string;
    refreshToken: string;
    user: string;
}

export interface AuthState {
    loggedIn: boolean;
    username: string;
}