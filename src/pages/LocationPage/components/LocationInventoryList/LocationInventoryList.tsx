import React from 'react';
import {InventoryDTO} from "../../../../models/location.models.ts";
import {ItemRecord, NewItemRecordInput} from "../../../../models/item.models.ts";
import InventoryDetails from '../InventoryDetails/InventoryDetails.tsx';
import RecordListItem from "../../../../components/RecordListItem/RecordListItem.tsx";
import WarningMessage from "../../../../components/WarningMessage/WarningMessage.tsx";
import './LocationInventory.scss';
import {createItemRecord} from "../../../../services/item.service.ts";
import {FaPlus} from "react-icons/fa6";

interface LocationInventoryListProps {
    inventory: InventoryDTO[];
}

const LocationInventoryList: React.FC<LocationInventoryListProps> = ({inventory}) => {
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

    return (
        <ul className="inventory-list">
            {inventory.map((inventoryItem: InventoryDTO) => (
                <li key={inventoryItem.id} className="inventory-records-list">
                    <InventoryDetails inventory={inventoryItem}/>
                    <div className="record-wrapper">
                        <table className="table">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Receipt</th>
                                <th>Status</th>
                                <th>Notes</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {inventoryItem.records.map((record: ItemRecord) => (
                                <RecordListItem key={record.id} record={record}/>
                            ))}
                            <tr>
                                <td colSpan={5}>
                                    <button className="button" onClick={() => handleCreateRecord(inventoryItem)}>
                                        <FaPlus/>Add
                                        Record
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default LocationInventoryList;
