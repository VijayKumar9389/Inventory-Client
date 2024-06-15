import axios, { AxiosResponse } from "axios";
import {
    Item,
    ItemRecord,
    ItemWithInventory,
    NewItemInput,
    UpdateItemInput,
    UpdateItemRecordInput,
    NewItemRecordInput
} from "../models/item.models.ts";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

// Get all items
export const getItems = async (): Promise<ItemWithInventory[]> => {
    try {
        const endpoint: string = `${API_BASE_URL}/item/getall`;
        const response: AxiosResponse<ItemWithInventory[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting items:', error);
        throw error;
    }
}

// Update the function signature to accept either UpdateItemRecordInput or FormData
export const updateItemRecord = async (recordId: number, recordInput: UpdateItemRecordInput): Promise<ItemRecord> => {
    try {
        const endpoint: string = `${API_BASE_URL}/item-record/update/${recordId}`;
        const response: AxiosResponse<ItemRecord> = await axios.put(endpoint, recordInput, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating item record:', error);
        throw error;
    }
}

// Update Item by ID
export const updateItem = async (itemId: number, itemData: UpdateItemInput): Promise<Item> => {
    try {
        const endpoint: string = `${API_BASE_URL}/item/update/${itemId}`;
        const response: AxiosResponse<Item> = await axios.put(endpoint, itemData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
}

//Create Item
export const createItem = async (formData: NewItemInput): Promise<Item> => {
    try {
        const endpoint: string = `${API_BASE_URL}/item/create`;
        const response: AxiosResponse<Item> = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
}

// Get all items
export const deleteItem = async (itemId: number): Promise<Item> => {
    try {
        const endpoint: string = `${API_BASE_URL}/item/delete/${itemId}`;
        const response: AxiosResponse<Item> = await axios.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
}

// Get an item by ID
export const getItemByID = async (itemId: number): Promise<ItemWithInventory> => {
    try {
        const endpoint: string = `${API_BASE_URL}/item/get/${itemId}`;
        const response: AxiosResponse<ItemWithInventory> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting item:', error);
        throw error;
    }
}

// Create a new item record
export const createItemRecord = async (formData: NewItemRecordInput): Promise<ItemRecord> => {
    try {
        const endpoint: string = `${API_BASE_URL}/item-record/create`;
        const response: AxiosResponse<ItemRecord> = await axios.post(endpoint, formData);
        return response.data;
    } catch (error) {
        console.error('Error creating item record:', error);
        throw error;
    }
}

// Delete an item record
export const deleteItemRecord = async (recordId: number): Promise<ItemRecord> => {
    try {
        const endpoint: string = `${API_BASE_URL}/item-record/delete/${recordId}`;
        const response: AxiosResponse<ItemRecord> = await axios.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error deleting item record:', error);
        throw error;
    }
}
