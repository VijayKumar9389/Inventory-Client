// components/ItemPage/ItemInventoryList.tsx
import React from 'react';
import {InventoryWithRecords, ItemRecord, NewItemRecordInput} from "../../../../models/item.models.ts";
import RecordListItem from "../../../../components/RecordListItem/RecordListItem.tsx";
import LocationDetails from "../LocationDetails/LocationDetails.tsx";
import WarningMessage from "../../../../components/WarningMessage/WarningMessage.tsx";
import {createItemRecord} from "../../../../services/item.service.ts";
import {FaPlus} from "react-icons/fa6";

interface InventoryListProps {
    inventory: InventoryWithRecords[];
    itemValue: number;
}

const ItemInventoryList: React.FC<InventoryListProps> = ({inventory, itemValue}) => {
    if (inventory.length === 0) return <WarningMessage message={"No Inventory Records"}/>;

    // Handle the create record event
    const handleCreateRecord = async (inventory: InventoryWithRecords): Promise<void> => {
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
            {inventory.map((inventory: InventoryWithRecords) => (
                <li key={inventory.id} className="inventory-records-list">
                    <LocationDetails inventory={inventory} itemValue={itemValue}/>
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
                            {inventory.records.map((record: ItemRecord) => (
                                <RecordListItem key={record.id} record={record}/>
                            ))}
                            <tr>
                                <td colSpan={5}>
                                    <button className="button" onClick={() => handleCreateRecord(inventory)}><FaPlus />Add Record</button>
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

export default ItemInventoryList;
