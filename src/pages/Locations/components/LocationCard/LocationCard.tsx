// LocationCard.tsx
import React from 'react';
import './LocationCard.scss';
import {LocationWithInventory, InventoryDTO} from "../../../../models/location.models.ts";
import {useNavigate} from "react-router-dom";

const LocationCard: React.FC<{ location: LocationWithInventory }> = ({location}) => {
    const navigate = useNavigate();

    const selectLocation = (id: number): void => {
        navigate(`/locations/${id}`);
    }

    const calculateTotalItems = () => {
        return location.inventory.reduce((total: number, inventory: InventoryDTO): number => {
            if (inventory.records) {
                return total + inventory.records.length;
            } else {
                return total;
            }
        }, 0);
    }

    const calculateTotalValue = () => {
        return location.inventory.reduce((total: number, inventory: InventoryDTO): number => {
            if (inventory.records) {
                return total + (inventory.records.length * inventory.item.value);
            } else {
                return total;
            }
        }, 0);
    }

    return (
        <div key={location.id} className="location-card" onClick={() => selectLocation(location.id)}>
            <div className="location-stats">
                <div className="location-details">
                    <h3>{location.name}</h3>
                    <p>{location.description}</p>
                </div>
                <div className="location-list">
                    <div className="stat">
                        <p className="stat-label">Unique Items:</p>
                        <strong className="stat-value">{location.inventory.length}</strong>
                    </div>
                    <div className="stat">
                        <p className="stat-label">Total Items:</p>
                        <strong className="stat-value">{calculateTotalItems()}</strong>
                    </div>
                    <div className="stat">
                        <p className="stat-label">Total Value:</p>
                        <strong className="stat-value">${calculateTotalValue()}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocationCard;
