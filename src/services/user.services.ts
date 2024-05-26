import axios, { AxiosResponse } from "axios";
import { NewUserInput, TokenResponse, User } from "../models/user.models.ts";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

// Create user
export const createUser = async (userInput: NewUserInput): Promise<User> => {
    try {
        const endpoint: string = `${API_BASE_URL}/user/create`;
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
        const endpoint: string = `${API_BASE_URL}/user/getAll`;
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
        const endpoint: string = `${API_BASE_URL}/user/login`;
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
