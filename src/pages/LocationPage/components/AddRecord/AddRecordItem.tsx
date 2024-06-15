import React, { useState } from "react";
import ImageWithAlt from "../../../../components/ImageWithAlt/ImageWithAlt";
import { ItemWithInventory } from "../../../../models/item.models.ts";

interface AddRecordItemProps {
    item: ItemWithInventory;
    handleAddInventory: (itemId: number) => void;
}

const AddRecordItem: React.FC<AddRecordItemProps> = ({ item, handleAddInventory }) => {
    const [isAdded, setIsAdded] = useState<boolean>(false);

    const handleButtonClick = async (itemId: number): Promise<void> => {
        try {
            handleAddInventory(itemId);
            setIsAdded(true);
        } catch (error) {
            console.error('Error adding inventory:', error);
        }
    };

    return (
        <div className="add-record">
            <div className="item-image">
                <ImageWithAlt imageName={item.image} />
            </div>
            <div className="item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
            </div>
            <div className="action">
                {isAdded ? (
                    <p className="added-message">Item added</p>
                ) : (
                    <button onClick={() => handleButtonClick(item.id)}>Add</button>
                )}
            </div>
        </div>
    );
};

export default AddRecordItem;
