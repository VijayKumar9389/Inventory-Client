import React from 'react';
import {LocationWithInventory} from "../../../../models/location.models.ts";
import {calculateMissingItems, calculateTotalItems, calculateTotalValue, calculateValidatedItems} from "../../../../utils/calculate.helper.ts";
import {useNavigation} from "../../../../utils/navigate.helper.ts";
import {Stat} from "../../../../models/user.models.ts";
import StatList from "../../../../components/StatList/StatList.tsx";

const LocationCard: React.FC<{ location: LocationWithInventory }> = ({location}) => {
    const {selectLocation} = useNavigation();
    const LocationCardStats: Stat[] = [
        {
            label: "Total Items",
            value: location.inventory.length
        },
        {
            label: "Total Quantity",
            value: calculateTotalItems(location.inventory)
        },
        {
            label: "Missing",
            value: calculateMissingItems(location.inventory)
        },
        {
            label: "Validated",
            value: calculateValidatedItems(location.inventory)
        },
        {
            label: "Total Value",
            value: `$${calculateTotalValue(location.inventory)}`
        },
    ];

    return (
        <div key={location.id} className="location-card" onClick={() => selectLocation(location.id)}>
            <div className="location-details">
                <h3>{location.name}</h3>
                <p>{location.description}</p>
            </div>
            <StatList stats={LocationCardStats}/>
        </div>
    );
}

export default LocationCard;
