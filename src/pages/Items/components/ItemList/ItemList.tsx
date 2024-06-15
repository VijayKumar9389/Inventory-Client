import React from 'react';
import ItemCard from "./ItemCard.tsx";
import {ItemWithInventory} from "../../../../models/item.models.ts";
import WarningMessage from "../../../../components/WarningMessage/WarningMessage.tsx";

interface ItemListProps {
    items: ItemWithInventory[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
    if (items.length === 0) return <WarningMessage message={"No Items Create"} />

    return (
        <ul className="item-list">
            {items.map(item => (
                <ItemCard item={item} key={item.id} />
            ))}
        </ul>
    );
};

export default ItemList;
