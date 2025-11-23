import axios, { AxiosResponse } from 'axios';
import { CustomerQuestionDTO } from "../models/customer-question.models.ts";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

// Get all customer questions
export const getAllCustomerQuestions = async (): Promise<CustomerQuestionDTO[]> => {
    try {
        const endpoint: string = `${API_BASE_URL}/customer/questions`;
        const response: AxiosResponse<CustomerQuestionDTO[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting customer questions:', error);
        throw error;
    }
}

// Update the replied status of a customer question
export const updateCustomerQuestionRepliedStatus = async (questionId: number, replied: boolean): Promise<CustomerQuestionDTO> => {
    try {
        const endpoint: string = `${API_BASE_URL}/customer/questions/${questionId}/replied`;
        const response: AxiosResponse<CustomerQuestionDTO> = await axios.patch(endpoint, { replied });
        return response.data;
    } catch (error) {
        console.error('Error updating customer question replied status:', error);
        throw error;
    }
}