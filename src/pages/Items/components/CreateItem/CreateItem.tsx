import {ChangeEvent, FormEvent, useState} from 'react';
import './CreateItem.scss';
import {NewItemInput} from '../../../../models/item.models.ts';
import {createItem} from "../../../../services/item.service.ts";
import ImageWithAlt from "../../../../components/ImageWithAlt/ImageWithAlt.tsx";

const CreateItem = () => {
    const [formData, setFormData] = useState<NewItemInput>({
        name: '',
        description: '',
        image: null,
        value: 0.0, // Adding price field to formData
    });

    const handleStringChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name as keyof NewItemInput]: value
        }));
    };

    const handleFloatChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name as keyof NewItemInput]: parseFloat(value)
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file: File | null = e.target.files && e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            image: file || null
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        console.log(formData);
        try {
            await createItem(formData);
            window.location.reload();
            console.log(formData);
            // Handle success, redirect, or show a message
        } catch (error) {
            // Handle error
            console.error('Error creating item:', error);
        }
    };

    return (
        <div className="item-form-grid">
            <div className="image-container">
                {formData.image ? (
                    <img src={URL.createObjectURL(formData.image)} alt={formData.name}/>
                ) : (
                    <ImageWithAlt imageName={""}/>
                )}
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleStringChange}
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
                        onChange={handleStringChange}
                        className="form-textarea"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image" className="form-label">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price" className="form-label">Value:</label>
                    <input
                        type="number"
                        id="value"
                        name="value"
                        value={formData.value}
                        onChange={handleFloatChange}
                        min="0.01" // Assuming minimum price is 0.01
                        step="0.01" // Allowing increments of 0.01
                        className="form-input"
                    />
                </div>
                <button type="submit" className="button">Create Item</button>
            </form>
        </div>

    );
};

export default CreateItem;
