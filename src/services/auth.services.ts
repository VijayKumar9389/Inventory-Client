import axios, { AxiosResponse } from "axios";
import {setLogout} from "../store/reducers/auth.reducer.ts";

// Function to verify refresh token
export const verifyRefreshToken = async (): Promise<{ auth: boolean, user: string }> => {
    try {
        const refreshToken: string | null = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('Refresh token not found');
        }

        const endpoint: string = "http://localhost:4005/user/verify-token";
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
            'http://localhost:4005/user/refresh-accessToken',
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
