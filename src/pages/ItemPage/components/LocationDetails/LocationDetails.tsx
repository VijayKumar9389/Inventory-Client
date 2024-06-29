import React from "react";
import {InventoryWithRecords, ItemRecord} from "../../../../models/item.models";
import {MdLocationOn} from "react-icons/md";

interface LocationDetailsProps {
    inventory: InventoryWithRecords;
    itemValue: number;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({inventory, itemValue}) => {
    const missingRecords: ItemRecord[] = inventory.records.filter(record => record.missing);
    const missingValue: number = missingRecords.length * itemValue;
    const validatedItems: ItemRecord[] = inventory.records.filter(record => record.receipt);
    const validatedValue: number = validatedItems.length * itemValue;
    const remainingValue: number = (inventory.records.length * itemValue) - missingValue;
    const remainingItems: ItemRecord[] = inventory.records.filter(record => !record.missing);

    return (
        <div className="details-container">
            <div className="details-icon">
                <MdLocationOn/>
            </div>
            <div className="details-info">
                <h2>{inventory.location.name}</h2>
                <p>{inventory.location.description}</p>
            </div>
            <div className="stat-list">
                <div className="stat">
                    <p className="stat-label">Total:</p>
                    <p className="stat-value">
                        <strong>{inventory.records.length}/</strong>${inventory.records.length * itemValue}</p>
                </div>
                <div className="stat">
                    <p className="stat-label">Remaining:</p>
                    <p className="stat-value"><strong>{remainingItems.length}/</strong>${remainingValue}</p>
                </div>
                <div className="stat">
                    <p className="stat-label">Missing:</p>
                    <p className="stat-value"><strong>{missingRecords.length}/</strong>${missingValue}</p>
                </div>
                <div className="stat">
                    <p className="stat-label">Validated:</p>
                    <p className="stat-value"><strong>{validatedItems.length}/</strong>${validatedValue}</p>
                </div>
            </div>
        </div>
    );
};

export default LocationDetails;
