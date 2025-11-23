import React, {useState} from 'react';
import {InventoryWithRecords, ItemRecord, NewItemRecordInput} from "../../../../models/item.models.ts";
import RecordListItem from "../../../../components/RecordListItem/RecordListItem.tsx";
import LocationDetails from "../LocationDetails/LocationDetails.tsx";
import WarningMessage from "../../../../components/WarningMessage/WarningMessage.tsx";
import {createItemRecord} from "../../../../services/item.service.ts";
import {FaPlus, FaChevronDown, FaChevronUp} from "react-icons/fa6";

interface InventoryListProps {
    inventory: InventoryWithRecords[];
    itemValue: number;
}

const ItemInventoryList: React.FC<InventoryListProps> = ({inventory, itemValue}) => {
    const [openItemId, setOpenItemId] = useState<number | null>(null);

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

    const handleToggle = (id: number) => {
        setOpenItemId(openItemId === id ? null : id);
    };

    return (
        <div className="inventory-list">
            {inventory.map((inventoryItem: InventoryWithRecords) => (
                <div key={inventoryItem.id} className={`inventory-item ${openItemId === inventoryItem.id ? 'expanded' : ''}`}>
                    <div className={`item-header ${openItemId === inventoryItem.id ? 'expanded' : ''}`} onClick={() => handleToggle(inventoryItem.id)}>
                        <LocationDetails inventory={inventoryItem} itemValue={itemValue}/>
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
                        <li className="add-record-btn-container">
                            <button className="add-record-btn" onClick={() => handleCreateRecord(inventoryItem)}>
                                <FaPlus/> Add Record
                            </button>
                        </li>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemInventoryList;