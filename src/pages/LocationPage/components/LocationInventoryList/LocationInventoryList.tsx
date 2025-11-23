import React, {useState} from 'react';
import {InventoryDTO} from "../../../../models/location.models.ts";
import {ItemRecord, NewItemRecordInput} from "../../../../models/item.models.ts";
import InventoryDetails from '../InventoryDetails/InventoryDetails.tsx';
import RecordListItem from "../../../../components/RecordListItem/RecordListItem.tsx";
import WarningMessage from "../../../../components/WarningMessage/WarningMessage.tsx";
import {createItemRecord} from "../../../../services/item.service.ts";
import {FaPlus, FaChevronDown, FaChevronUp} from "react-icons/fa6";

interface LocationInventoryListProps {
    inventory: InventoryDTO[];
}

const LocationInventoryList: React.FC<LocationInventoryListProps> = ({inventory}) => {
    const [openItemId, setOpenItemId] = useState<number | null>(null);

    if (inventory.length === 0) return <WarningMessage message="No inventory items assigned to location"/>

    // Handle the create record event
    const handleCreateRecord = async (inventory: InventoryDTO): Promise<void> => {
        try {
            const newRecordInput: NewItemRecordInput = {
                itemId: inventory.itemId,
                locationId: inventory.locationId,
                inventoryId: inventory.id,
            };
            await createItemRecord(newRecordInput);
            window.location.reload();
        } catch (error) {
            console.error('Error creating record:', error);
            alert('There was an error creating the record. Please try again.');
        }
    };

    const handleToggle = (id: number) => {
        setOpenItemId(openItemId === id ? null : id);
    };

    return (
        <ul className="inventory-list">
            {inventory.map((inventoryItem: InventoryDTO) => (
                <li key={inventoryItem.id}
                    className={`inventory-item ${openItemId === inventoryItem.id ? 'expanded' : ''}`}>
                    <div
                        className={`item-header ${openItemId === inventoryItem.id ? 'expanded' : ''}`}
                        onClick={() => handleToggle(inventoryItem.id)}
                    >
                        <InventoryDetails inventory={inventoryItem}/>
                        <button className="toggle-btn">
                            {openItemId === inventoryItem.id ? <FaChevronUp/> : <FaChevronDown/>}
                        </button>
                    </div>
                    <div className={`item-content ${openItemId === inventoryItem.id ? 'expanded' : ''}`}>
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>
                                {inventoryItem.records.map((record: ItemRecord) => (
                                    <RecordListItem key={record.id} record={record}/>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="add-record-btn-container">
                            <button className="add-record-btn" onClick={() => handleCreateRecord(inventoryItem)}>
                                <FaPlus/> Add Record
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default LocationInventoryList;