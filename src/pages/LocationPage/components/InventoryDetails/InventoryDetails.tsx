import React from 'react';
import {InventoryDTO} from '../../../../models/location.models';
import {Stat} from '../../../../models/user.models';
import ImageWithAlt from '../../../../components/ImageWithAlt/ImageWithAlt';
import StatList from '../../../../components/StatList/StatList';
import './InventoryDetails.scss';
import {NewItemRecordInput} from "../../../../models/item.models.ts";
import {createItemRecord} from "../../../../services/item.service.ts";
import {FaPlus} from "react-icons/fa";

const InventoryDetails: React.FC<{ inventory: InventoryDTO }> = ({inventory}) => {
    const {item, records} = inventory;
    const {image, name, description, value} = item;

    const totalItems: number = records.length;
    const totalValue: number = value * totalItems;
    const totalMissing: number = records.filter((record) => record.missing).length;
    const totalMissingValue: number = value * totalMissing;
    const totalValidated: number = records.filter((record) => record.receipt).length;

    const locationInventoryStats: Stat[] = [
        {label: 'Total Items:', value: totalItems},
        {label: 'Total Missing:', value: totalMissing},
        {label: 'Total Validated:', value: totalValidated},
        {label: 'Value:', value: `$${value}`},
        {label: 'Total Value:', value: `$${totalValue}`},
        {label: 'Loss Value:', value: `$${totalMissingValue}`},
        {label: 'Remaining Value:', value: `$${totalValue - totalMissingValue}`},
    ];

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
        <div className="inventory-details">
            <div className="inventory-image">
                <ImageWithAlt imageName={image}/>
            </div>
            <div className="inventory-info">
                <h2>{name}</h2>
                <p>{description}</p>
                <StatList stats={locationInventoryStats}/>
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

export default InventoryDetails;
