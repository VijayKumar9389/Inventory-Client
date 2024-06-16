import React from "react";
import {InventoryWithRecords, NewItemRecordInput} from "../../../../models/item.models";
import {Stat} from "../../../../models/user.models.ts";
import StatList from "../../../../components/StatList/StatList.tsx";
import {MdLocationOn} from "react-icons/md";
import './LocationDetails.scss';
import {createItemRecord} from "../../../../services/item.service.ts";
import {FaPlus} from "react-icons/fa";

interface LocationDetailsProps {
    inventory: InventoryWithRecords;
    itemValue: number;
}


const LocationDetails: React.FC<LocationDetailsProps> = ({inventory, itemValue}) => {

    //calculate missing records
    const missingRecords = inventory.records.filter(record => record.missing);

    // calculate the value of missing items
    const missingValue = missingRecords.length * itemValue;

    // calculate the validated items
    const validatedItems = inventory.records.filter(record => record.receipt);

    const locationStats: Stat[] = [
        {label: 'Total Stock:', value: inventory.records.length},
        {label: 'Validated:', value: validatedItems.length},
        {label: 'Missing:', value: missingRecords.length},
        {label: 'Total Value:', value: `$${inventory.records.length * itemValue}`},
        {label: 'Loss Value:', value: `$${missingValue}`},
        {label: 'Remaining Value:', value: `$${(inventory.records.length * itemValue) - missingValue}`},
    ]

    // Handle the create record event
    const handleCreateRecord = async (): Promise<void> => {
        try {
            const newRecordInput: NewItemRecordInput = {
                itemId: inventory.itemId,
                locationId: inventory.locationId,
                inventoryId: inventory.id,
            };
            await createItemRecord(newRecordInput);
            window.location.reload();
        } catch (error) {
            console.error('Error creating record:', error);
            alert('There was an error creating the record. Please try again.');
        }
    };

    return (
        <div className="item-location-details">
            <div className="location-icon">
                <MdLocationOn/>
            </div>
            <div className="item-location-info">
                <h2>{inventory.location.name}</h2>
                <p>{inventory.location.description}</p>
                <StatList stats={locationStats}/>
                <div className="btn-container">
                    <button onClick={handleCreateRecord}>
                        <FaPlus className="icon"/>
                        Add Record
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LocationDetails;
