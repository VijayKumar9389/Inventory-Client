import React from 'react';
import {InventoryDTO} from '../../../../models/location.models';
import ImageWithAlt from '../../../../components/ImageWithAlt/ImageWithAlt';

const InventoryDetails: React.FC<{ inventory: InventoryDTO }> = ({inventory}) => {
    const {item, records} = inventory;
    const {image, name, description, value} = item;

    const totalItems: number = records.length;
    const totalValue: number = value * totalItems;

    const totalMissing: number = records.filter((record) => record.missing).length;
    const totalMissingValue: number = value * totalMissing;

    const totalValidated: number = records.filter((record) => record.receipt).length;
    const totalValidatedValue: number = value * totalValidated;

    const remainingItems: number = totalItems - totalMissing;
    const remainingValue: number = value * remainingItems;

    return (
        <div className="details-container">
            <div className="details-image">
                <ImageWithAlt imageName={image}/>
            </div>
            <div className="details-info">
                <h2>{name}</h2>
                <p>{description}</p>
            </div>
            <div className="stat-list">
                <div className="stat">
                    <p className="stat-label">Total:</p>
                    <p className="stat-value"><strong>{inventory.records.length}/</strong>${totalValue}</p>
                </div>
                <div className="stat">
                    <p className="stat-label">Remaining:</p>
                    <p className="stat-value"><strong>{remainingItems}/</strong>${remainingValue}</p>
                </div>
                <div className="stat">
                    <p className="stat-label">Missing:</p>
                    <p className="stat-value"><strong>{totalMissing}/</strong>${totalMissingValue}</p>
                </div>
                <div className="stat">
                    <p className="stat-label">Validated:</p>
                    <p className="stat-value"><strong>{totalValidated}/</strong>${totalValidatedValue}</p>
                </div>
            </div>
        </div>
    );
};

export default InventoryDetails;
