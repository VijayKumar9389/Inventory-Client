import React from "react";
import {InventoryWithRecords} from "../../../../models/item.models.ts";


const LocationDetails: React.FC<{inventory: InventoryWithRecords, itemValue: number}> = ({inventory, itemValue}) => {

    return(
        <div className="location-details">
            <h3>{inventory.location.name}</h3>
            <p>{inventory.location.description}</p>
            <div className="inventory-values">
                <div className="value">
                    <span>Total Stock:</span> <strong>{inventory.records.length}</strong>
                </div>
                <div className="value">
                    <span>Total Value:</span> <strong>${inventory.records.length * itemValue}</strong>

                </div>
            </div>
        </div>
    );
}

export default LocationDetails;