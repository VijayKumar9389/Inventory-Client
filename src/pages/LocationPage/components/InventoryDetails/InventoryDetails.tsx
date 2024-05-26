// InventoryDetails.tsx
import React from 'react';
import {InventoryDTO} from "../../../../models/location.models.ts";
import ImageWithAlt from "../../../../components/ImageWithAlt/ImageWithAlt.tsx";
const InventoryDetails: React.FC<{ inventory: InventoryDTO }> = ({ inventory }) => {
    return (
        <div className="inventory-details">
            <div className="inventory-image">
                <ImageWithAlt imageName={inventory.item.image} />
            </div>
            <div className="inventory-info">
                <h3>{inventory.item.name}</h3>
                <p>{inventory.item.description}</p>
                <div className="inventory-values">
                    <div className="value">
                        <span>Total Items:</span> <strong>{inventory.records.length}</strong>
                    </div>
                    <div className="value">
                        <span>Value:</span> <strong>${inventory.item.value}</strong>
                    </div>
                    <div className="value">
                        <span>Total Value:</span> <strong>${inventory.item.value * inventory.records.length}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default InventoryDetails;
