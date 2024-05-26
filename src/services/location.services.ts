import axios, { AxiosResponse } from "axios";
import { InventoryDTO, LocationWithInventory, NewInventoryInput, NewLocationInput } from "../models/location.models.ts";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

// Get all locations
export const getAllLocations = async (): Promise<LocationWithInventory[]> => {
    try {
        const endpoint: string = `${API_BASE_URL}/location/getAll`;
        const response: AxiosResponse<LocationWithInventory[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting item:', error);
        throw error;
    }
}

// Get a location by ID
export const getLocationById = async (locationId: number): Promise<LocationWithInventory> => {
    try {
        const endpoint: string = `${API_BASE_URL}/location/get/${locationId}`;
        const response: AxiosResponse<LocationWithInventory> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting item by id:', error);
        throw error;
    }
}

// Create a new location
export const createLocation = async (locationInput: NewLocationInput): Promise<Location> => {
    try {
        const endpoint: string = `${API_BASE_URL}/location/create`;
        const response: AxiosResponse<Location> = await axios.post(endpoint, locationInput);
        return response.data;
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
}

// Update a location by ID
export const updateLocation = async (locationId: number, locationData: NewLocationInput): Promise<Location> => {
    try {
        const endpoint: string = `${API_BASE_URL}/location/update/${locationId}`;
        const response: AxiosResponse<Location> = await axios.put(endpoint, locationData);
        return response.data;
    } catch (error) {
        console.error('Error updating location:', error);
        throw error;
    }
}

// Delete a location by ID
export const deleteLocation = async (locationId: number): Promise<Location> => {
    try {
        const endpoint: string = `${API_BASE_URL}/location/delete/${locationId}`;
        const response: AxiosResponse<Location> = await axios.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error deleting location:', error);
        throw error;
    }
}

// Create a new inventory
export const createInventory = async (formData: NewInventoryInput): Promise<InventoryDTO> => {
    try {
        const endpoint: string = `${API_BASE_URL}/inventory/create`;
        const response: AxiosResponse<InventoryDTO> = await axios.post(endpoint, formData);
        return response.data;
    } catch (error) {
        console.error('Error creating inventory:', error);
        throw error;
    }
}
