import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { updateLocation } from "../../../../services/location.services";
import { LocationWithInventory, NewLocationInput } from "../../../../models/location.models";

interface UpdateLocationProps {
    location: LocationWithInventory;
}

const UpdateLocation: React.FC<UpdateLocationProps> = ({ location }) => {
    const [formData, setFormData] = useState<NewLocationInput>({
        name: '',
        description: ''
    });

    // Update formData when location prop changes
    useEffect(() => {
        setFormData(location);
    }, [location]);

    // Handle form input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            await updateLocation(location.id, formData);
            window.location.reload();
            // Handle success (e.g., show a success message, redirect, etc.)
        } catch (error) {
            console.error('Error updating location:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit">Update Location</button>
            </form>
        </div>
    );
};

export default UpdateLocation;
