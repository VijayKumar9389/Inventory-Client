import React from 'react';
import {LocationWithInventory} from "../../../../models/location.models.ts";
import {
    calculateMissingItems,
    calculateMissingValue,
    calculateTotalItems,
    calculateTotalValue,
    calculateValidatedItems,
    calculateValidatedValue,
} from "../../../../utils/calculate.helper.ts";
import {useNavigation} from "../../../../utils/navigate.helper.ts";
import {FaLocationDot} from "react-icons/fa6";

const LocationTableRow: React.FC<{ location: LocationWithInventory }> = ({location}) => {
    const {selectLocation} = useNavigation();

    return (
        <tr key={location.id} className="select-table-row" onClick={() => selectLocation(location.id)}>
            <td className="tbl-icon">
                <FaLocationDot/>
            </td>
            <td className="tbl-details">
                <h2>{location.name}</h2>
                <p>{location.description}</p>
            </td>
            <td>
                {calculateTotalItems(location.inventory) !== 0 ? (
                    <>
                        <strong>{calculateTotalItems(location.inventory)}</strong>/$
                        {calculateTotalValue(location.inventory)}
                    </>
                ) : (
                    <a className="chip red">None</a>
                )}
            </td>
            <td>
                {calculateMissingItems(location.inventory) !== 0 ? (
                    <>
                        <strong>{calculateMissingItems(location.inventory)}</strong>/$
                        {calculateMissingValue(location.inventory)}
                    </>
                ) : (
                    <a className="chip red">None</a>
                )}
            </td>
            <td>
                {calculateValidatedItems(location.inventory) !== 0 ? (
                    <>
                        <strong>{calculateValidatedItems(location.inventory)}</strong>/$
                        {calculateValidatedValue(location.inventory)}
                    </>
                ) : (
                    <a className="chip red">None</a>
                )}
            </td>
            <td>
                <strong>{location.inventory.length}</strong>
            </td>
        </tr>
    );

}

export default LocationTableRow;
