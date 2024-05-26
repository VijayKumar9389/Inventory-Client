import axios, {AxiosResponse} from "axios";
import {NewUserInput, TokenResponse, User} from "../models/user.models.ts";

// Create user
export const createUser = async (userInput: NewUserInput): Promise<User> => {
    try {
        const endpoint: string = `http://localhost:4005/user/create`;
        const response: AxiosResponse<User> = await axios.post(endpoint, userInput);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

// Get all users
export const getUsers = async (): Promise<User[]> => {
    try {
        const endpoint: string = `http://localhost:4005/user/getAll`;
        const response: AxiosResponse<User[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}

// Login user
export const loginUser = async (username: string, password: string): Promise<TokenResponse> => {
    try {
        // Send a POST request to the server
        const endpoint: string = `http://localhost:4005/user/login`;
        const response: AxiosResponse<TokenResponse> = await axios.post(endpoint, { username, password });

        // Store the tokens in local storage
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}
