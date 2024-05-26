import React, {useState, ChangeEvent, FormEvent} from 'react';
import {createLocation} from "../../../../services/location.services.ts";
import {NewLocationInput} from "../../../../models/location.models.ts";

interface FormData {
    name: string;
    description: string;
}

const CreateLocation: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Create location
            const createdLocation = await createLocation(formData as NewLocationInput);
            console.log('Location created:', createdLocation);
            window.location.reload();
            // Reset form after successful submission
            setFormData({
                name: '',
                description: ''
            });
        } catch (error) {
            console.error('Error creating location:', error);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description" className="form-label">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-textarea"
                />
            </div>
            <button type="submit" className="button">Create Location</button>
        </form>
    );
};

export default CreateLocation;
