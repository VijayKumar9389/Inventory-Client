import React, { useState } from "react";
import './AddRecord.scss';
import { createInventory } from "../../../../services/location.services";
import { NewInventoryInput } from "../../../../models/location.models";
import { useGetItems } from "../../../../hooks/item.hooks.ts";
import { ItemWithInventory } from "../../../../models/item.models.ts";
import Input from "../../../../components/Input/Input.tsx";
import WarningMessage from "../../../../components/WarningMessage/WarningMessage.tsx";
import AddRecordItem from "./AddRecordItem.tsx";

interface AddRecordProps {
    locationId: number;
}

const AddRecord: React.FC<AddRecordProps> = ({ locationId }) => {
    const { items, loading, error } = useGetItems();
    const [searchTerm, setSearchTerm] = useState<string>("");

    if (error) {
        return <p>Error fetching items: {error}</p>;
    }

    if (loading) {
        return <p>Loading items...</p>;
    }

    // Function to filter items based on item name
    const filterItems = (items: ItemWithInventory[], term: string): ItemWithInventory[] => {
        return items.filter(item =>
            item.name.toLowerCase().includes(term.toLowerCase())
        );
    };

    // Filtered items based on search term
    const filteredItems: ItemWithInventory[] = searchTerm ? filterItems(items, searchTerm) : items;

    // // Filter out items that already exist in the location
    const newItems: ItemWithInventory[] = filteredItems.filter(item =>
        !item.inventory.some(inventoryItem => inventoryItem.locationId === locationId)
    );

    const handleAddInventory = async (itemId: number): Promise<void> => {
        try {
            const newInventoryInput: NewInventoryInput = {
                locationId,
                itemId,
            };
            await createInventory(newInventoryInput);
            console.log('Inventory created successfully');
        } catch (error) {
            console.error('Error creating inventory:', error);
        }
    };

    return (
        <>
            <Input value={searchTerm} onChange={setSearchTerm} placeholder={"Search Items"} />
            <div className="add-item-grid">
                {newItems.length === 0 ? (
                    <WarningMessage message="No items to add." />
                ) : (
                    newItems.map(item => (
                        <AddRecordItem
                            key={item.id}
                            item={item}
                            handleAddInventory={handleAddInventory}
                        />
                    ))
                )}
            </div>
        </>
    );
};

export default AddRecord;
