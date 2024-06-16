export interface NewUserInput {
    username: string;
    password: string;
}

export interface UpdateUserInput {
    id: number;
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
    admin: boolean;
}

export interface AuthResponse {
    auth: boolean;
    user: string;
}

export interface Stat {
    label: string;
    value: number | string;
}