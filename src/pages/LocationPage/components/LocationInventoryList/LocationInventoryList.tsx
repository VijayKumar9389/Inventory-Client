import React from 'react';
import { InventoryDTO } from "../../../../models/location.models.ts";
import { ItemRecord } from "../../../../models/item.models.ts";
import InventoryDetails from '../InventoryDetails/InventoryDetails.tsx';
import RecordListItem from "../../../../components/RecordListItem/RecordListItem.tsx";
import WarningMessage from "../../../../components/WarningMessage/WarningMessage.tsx";
import './LocationInventory.scss';

interface LocationInventoryListProps {
    inventory: InventoryDTO[];
}

const LocationInventoryList: React.FC<LocationInventoryListProps> = ({ inventory }) => {
    if (inventory.length === 0) return <WarningMessage message="No inventory items assigned to location" />;

    return (
        <ul className="inventory-list">
            {inventory.map((inventoryItem: InventoryDTO) => (
                <li key={inventoryItem.id} className="inventory-records-list">
                    <InventoryDetails inventory={inventoryItem} />
                    <ul className="inventory-records">
                        {inventoryItem.records.map((record: ItemRecord) => (
                            <RecordListItem key={record.id} record={record} />
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
};

export default LocationInventoryList;
