import React from 'react';
import ItemTableRow from "./ItemTableRow.tsx";
import {ItemWithInventory} from "../../../../models/item.models.ts";
import WarningMessage from "../../../../components/WarningMessage/WarningMessage.tsx";

interface ItemListProps {
    items: ItemWithInventory[];
}

const ItemTable: React.FC<ItemListProps> = ({items}) => {
    if (items.length === 0) return <WarningMessage message={"No Items Create"}/>

    return (
        <div className="table-wrapper">
            <table className="select-table">
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Total</th>
                    <th>Remaining</th>
                    <th>Missing</th>
                    <th>Validated</th>
                    <th>Locations</th>
                </tr>
                </thead>
                <tbody>
                {items.map(item => (
                    <ItemTableRow item={item} key={item.id}/>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemTable;
