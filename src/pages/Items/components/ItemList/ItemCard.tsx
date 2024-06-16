import React from "react";
import {InventoryWithRecords, ItemWithInventory} from "../../../../models/item.models";
import ImageWithFallback from "../../../../components/ImageWithAlt/ImageWithAlt";
import {useNavigation} from "../../../../utils/navigate.helper.ts";
import {getMissingItems, getQuantity, getTotalValue, getValidatedItems} from "../../../../utils/calculate.helper.ts";
import {Stat} from "../../../../models/user.models.ts";
import StatList from "../../../../components/StatList/StatList.tsx";

const ItemCard: React.FC<{ item: ItemWithInventory }> = ({item}) => {
    const {selectItem} = useNavigation();

    const ItemCardStats: Stat[] = [
        {
            label: "Value:",
            value: `$${item.value}`
        },
        {
            label: "In Stock:",
            value: getQuantity(item)
        },
        {
            label: "Missing",
            value: getMissingItems(item)
        },
        {
            label: "Validated:",
            value: getValidatedItems(item)
        },
        {
            label: "Total Value:",
            value: `$${getTotalValue(item)}`
        },
    ]

    return (
        <li className="item-card" onClick={() => selectItem(item.id)}>
            <div className="item-card-image">
                <ImageWithFallback imageName={item.image}/>
            </div>
            <div className="item-card-details">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
            </div>
            <StatList stats={ItemCardStats}/>
            <ul className="item-inventory-list">
                {item.inventory.map((inventory: InventoryWithRecords) => (
                    <li key={inventory.id} className="item-inventory">
                        <p><strong>{inventory.records.length}&nbsp;</strong> In {inventory.location.name}</p>
                    </li>
                ))}
            </ul>
        </li>
    );
};

export default ItemCard;
