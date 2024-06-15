import { useState, useEffect } from "react";
import {LocationWithInventory} from "../models/location.models.ts";
import {getAllLocations, getLocationById} from "../services/location.services.ts";

export const useGetLocations = () => {
    const [locations, setLocations] = useState<LocationWithInventory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect((): void  => {
        const fetchLocations = async (): Promise<void> => {
            try {
                const locations: LocationWithInventory[] = await getAllLocations();
                setLocations(locations);
            } catch (error) {
                setError('Error fetching locations');
                console.error('Error fetching locations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations()
            .then(() => console.log('Locations fetched'));
    }, []);

    return { locations, loading, error };
};

export const useGetLocationById = (id: string | undefined) => {
    const [location, setLocation] = useState<LocationWithInventory | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect((): void => {
        const fetchLocation = async (): Promise<void> => {
            if (!id) return;
            try {
                const locationId: number = parseInt(id);
                const fetchedLocation: LocationWithInventory = await getLocationById(locationId);
                setLocation(fetchedLocation);
            } catch (error) {
                setError('Error fetching location');
                console.error('Error fetching location:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocation()
            .then(() => console.log('Location fetched successfully'));
    }, [id]);

    return { location, loading, error };
};

