import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import ImageWithAlt from "../../../../components/ImageWithAlt/ImageWithAlt.tsx";
import { updateItem } from "../../../../services/item.service.ts";
import { UpdateItemInput } from "../../../../models/item.models.ts";

interface Item {
    id: number;
    name: string;
    description: string;
    value: number;
    image: string | null;
}

interface EditItemProps {
    item: Item;
}

interface FormData {
    name: string;
    description: string | null;
    value: number;
    image: File | null;
}

const EditItem: React.FC<EditItemProps> = ({ item }) => {
    const [formData, setFormData] = useState<FormData>({
        name: item.name,
        description: item.description,
        value: item.value,
        image: null
    });

    useEffect(() => {
        // Fetch item data or initialize form data if editing an existing item
    }, [item]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length > 0) {
            const imageFile = e.target.files[0];
            setFormData(prevState => ({
                ...prevState,
                image: imageFile
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const { name, description, value, image } = formData;
            const updateData: UpdateItemInput = {
                name,
                description,
                value,
                image // Assuming image is already a File | null type
            };
            await updateItem(item.id, updateData);
            // Handle success (e.g., show a success message, redirect, etc.)
        } catch (error) {
            console.error('Error updating item:', error);
            // Handle error (e.g., show an error message)
        }
    };

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div className="item-form-grid">
            <div className="image-container">
                <ImageWithAlt imageName={item.image} />
            </div>
            <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={formData.description || ''} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="value">Value:</label>
                    <input type="number" id="value" name="value" value={formData.value} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" name="image" onChange={handleImageChange} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditItem;
