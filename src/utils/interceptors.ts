import axios, { AxiosError } from 'axios';
import { refreshAccessToken } from "../services/auth.services";

// Function to activate the interceptors
export const activateInterceptor = (): void => {

    // Request interceptor
    axios.interceptors.request.use(
        async (config) => {
            config.withCredentials = true; // Ensure cookies are sent

            const accessToken: string | null = localStorage.getItem('accessToken');
            if (accessToken) {
                config.headers['accessToken'] = accessToken; // Attach access token to headers
            }

            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error: AxiosError) => {
            if (error.response && error.response.status === 401) {
                console.log('Unauthorized. Attempting to refresh access token.');
                try {
                    // Refresh the access token
                    await refreshAccessToken();

                    // Retry the original request if error.config is defined
                    if (error.config) {
                        return axios.request(error.config);
                    } else {
                        console.error('Original request config is undefined');
                    }
                } catch (refreshError) {
                    console.error('Error refreshing access token:', refreshError);
                }
            }
            return Promise.reject(error);
        }
    );
}
