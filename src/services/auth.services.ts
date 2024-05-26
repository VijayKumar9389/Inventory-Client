import axios, { AxiosResponse } from "axios";
import { setLogout } from "../store/reducers/auth.reducer.ts";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

// Function to verify refresh token
export const verifyRefreshToken = async (): Promise<{ auth: boolean, user: string }> => {
    try {
        const refreshToken: string | null = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('Refresh token not found');
        }

        const endpoint: string = `${API_BASE_URL}/user/verify-token`;
        const config = {
            headers: {
                refreshToken: refreshToken
            }
        };

        const response: AxiosResponse = await axios.post(endpoint, {}, config);
        return response.data;
    } catch (error) {
        console.error('Error verifying token:', error);
        throw error;
    }
}

// Function to refresh the access token
export const refreshAccessToken = async (): Promise<boolean> => {
    try {
        const refreshToken: string | null = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('Refresh token not found');
        }

        // Send a POST request to refresh the access token
        const response = await axios.post(
            `${API_BASE_URL}/user/refresh-accessToken`,
            {},
            {
                headers: {
                    refreshToken: refreshToken
                },
                withCredentials: true, // Ensure cookies are sent
            }
        );

        // Assuming refresh is successful, update access token in storage
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        return true;
    } catch (error) {
        console.error('Token refresh failed:', error);
        setLogout();
        throw error;
    }
}
