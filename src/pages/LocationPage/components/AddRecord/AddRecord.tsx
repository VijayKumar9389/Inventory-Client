import './AddRecord.scss';
import { getItems } from "../../../../services/item.service.ts";
import { ItemWithInventory } from "../../../../models/item.models.ts";
import React, { useEffect, useState } from "react";
import ImageWithAlt from "../../../../components/ImageWithAlt/ImageWithAlt.tsx";
import { createInventory } from "../../../../services/location.services.ts";
import { NewInventoryInput } from "../../../../models/location.models.ts";

const AddRecord: React.FC<{ locationId: number }> = ({ locationId }) => {
    const [items, setItems] = useState<ItemWithInventory[]>([]);

    useEffect((): void => {
        const fetchItems = async (): Promise<void> => {
            try {
                const items: ItemWithInventory[] = await getItems();
                console.log('Items:', items);
                setItems(items);
            } catch (error) {
                console.error('Error fetching items:', error);
                throw error;
            }
        };
        fetchItems().then(() => console.log('Successfully fetched all Items'));
    }, []);

    // Filter out items that already exist in the location
    const filteredItems: ItemWithInventory[] = items.filter(item =>
        !item.inventory.some(inventoryItem => inventoryItem.locationId === locationId)
    );

    const handleAddInventory = async (itemId: number): Promise<void> => {
        try {
            // Create new inventory
            const newInventoryInput: NewInventoryInput = {
                locationId: locationId,
                itemId: itemId,
            };
            // Call createInventory service
            await createInventory(newInventoryInput);
            console.log('Inventory created successfully');
        } catch (error) {
            console.error('Error creating inventory:', error);
        }
    };

    if (filteredItems.length === 0) {
        return <p>No items to add</p>;
    }

    return (
        <div className="add-item-card">
            {filteredItems.map(item => (
                <div key={item.id} className="add-record">
                    <div className="item-image">
                        <ImageWithAlt imageName={item.image} />
                    </div>
                    <div className="item-details">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                    </div>
                    <button onClick={() => handleAddInventory(item.id)}>Add</button>
                </div>
            ))}
        </div>
    );
}

export default AddRecord;
