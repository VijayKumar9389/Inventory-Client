// components/ItemPage/ItemInventoryList.tsx
import React from 'react';
import {InventoryWithRecords, ItemRecord} from "../../../../models/item.models.ts";
import RecordListItem from "../../../../components/RecordListItem/RecordListItem.tsx";
import LocationDetails from "../LocationDetails/LocationDetails.tsx";
import WarningMessage from "../../../../components/WarningMessage/WarningMessage.tsx";

interface InventoryListProps {
    inventory: InventoryWithRecords[];
    itemValue: number;
}

const ItemInventoryList: React.FC<InventoryListProps> = ({inventory, itemValue}) => {
    if (inventory.length === 0) return <WarningMessage message={"No Inventory Records"} />;

    return (
        <ul className="inventory-list">
            {inventory.map((inventory: InventoryWithRecords) => (
                <li key={inventory.id} className="inventory-records-list">
                    <LocationDetails inventory={inventory} itemValue={itemValue}/>
                    <ul className="inventory-records">
                        {inventory.records.map((record: ItemRecord) => (
                            <RecordListItem key={record.id} record={record}/>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
};

export default ItemInventoryList;
