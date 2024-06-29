import React from "react";
import {ItemWithInventory} from "../../../../models/item.models";
import ImageWithFallback from "../../../../components/ImageWithAlt/ImageWithAlt";
import {useNavigation} from "../../../../utils/navigate.helper.ts";
import {
    getMissingItems,
    getMissingValue,
    getQuantity, getRemainingItems, getRemainingValue,
    getTotalValue,
    getValidatedItems, getValidatedValue
} from "../../../../utils/calculate.helper.ts";

const ItemTableRow: React.FC<{ item: ItemWithInventory }> = ({item}) => {
    const {selectItem} = useNavigation();

    return (
        <tr className="select-table-row" onClick={() => selectItem(item.id)}>
            <td className="tbl-image">
                <ImageWithFallback imageName={item.image}/>
            </td>
            <td className="tbl-details">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
            </td>
            <td>
                <strong>${item.value}</strong>
            </td>
            <td>
                {getQuantity(item) !== 0 ? (
                    <>
                        <strong>{getQuantity(item)}</strong>/${getTotalValue(item)}
                    </>
                ) : (
                    <a className="chip red">None</a>
                )}
            </td>
            <td>
                {getRemainingItems(item) !== 0 ? (
                    <>
                        <strong>{getRemainingItems(item)}</strong>/${getRemainingValue(item)}
                    </>
                ) : (
                    <a className="chip red">None</a>
                )}
            </td>
            <td>
                {getMissingItems(item) !== 0 ? (
                    <>
                        <strong>{getMissingItems(item)}</strong>/${getMissingValue(item)}
                    </>
                ) : (
                    <a className="chip red">None</a>
                )}
            </td>
            <td>
                {getValidatedItems(item) !== 0 ? (
                    <>
                        <strong>{getValidatedItems(item)}</strong>/${getValidatedValue(item)}
                    </>
                ) : (
                    <a className="chip red">None</a>
                )}
            </td>
            <td className="item-card-inventory">
                <strong>{item.inventory.length}</strong>
            </td>
        </tr>

    );
};

export default ItemTableRow;
