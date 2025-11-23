import React from "react";
import { LocationWithInventory } from "../../../../models/location.models";
import "./LocationStats.Module.scss";

const LocationStats: React.FC<{ locations: LocationWithInventory[] }> = ({ locations }) => {
    // Total locations
    const totalLocations: number = locations.length;

    // Calculate the total number of items across all locations
    const totalItems: number = locations.reduce((total, location) =>
            total + location.inventory.reduce((invTotal, inv) =>
                    invTotal + (inv.records.length || 0),
                0),
        0);

    // Calculate the total value of items across all locations
    const totalItemsValue: number = locations.reduce((total, location) =>
            total + location.inventory.reduce((invTotal, inv) =>
                    invTotal + (inv.records.length || 0) * inv.item.value,
                0),
        0);

    // Calculate missing items and their value
    const missingItems: number = locations.reduce((total, location) =>
            total + location.inventory.reduce((invTotal, inv) =>
                    invTotal + inv.records.filter(record => record.missing).length,
                0),
        0);

    const missingItemsValue: number = locations.reduce((total, location) =>
            total + location.inventory.reduce((invTotal, inv) =>
                    invTotal + inv.records.filter(record => record.missing).length * inv.item.value,
                0),
        0);

    // Calculate remaining items and their value
    const remainingItems: number = locations.reduce((total, location) =>
            total + location.inventory.reduce((invTotal, inv) =>
                    invTotal + inv.records.filter(record => !record.missing).length,
                0),
        0);

    const remainingItemsValue: number = locations.reduce((total, location) =>
            total + location.inventory.reduce((invTotal, inv) =>
                    invTotal + inv.records.filter(record => !record.missing).length * inv.item.value,
                0),
        0);

    return (
        <div className="stats-container">
            <div className="stat-item">
                <h3 className="stat-value">{totalLocations}</h3>
                <label className="stat-label">Total Locations</label>
            </div>
            <div className="stat-item">
                <h3 className="stat-value">{totalItems}</h3>
                <label className="stat-label">Total Items</label>
            </div>
            <div className="stat-item">
                <h3 className="stat-value">${totalItemsValue}</h3>
                <label className="stat-label">Total Items Value</label>
            </div>
            <div className="stat-item">
                <h3 className="stat-value">{missingItems}</h3>
                <label className="stat-label">Missing Items</label>
            </div>
            <div className="stat-item">
                <h3 className="stat-value">${missingItemsValue}</h3>
                <label className="stat-label">Missing Items Value</label>
            </div>
            <div className="stat-item">
                <h3 className="stat-value">{remainingItems}</h3>
                <label className="stat-label">Remaining Items</label>
            </div>
            <div className="stat-item">
                <h3 className="stat-value">${remainingItemsValue}</h3>
                <label className="stat-label">Remaining Items Value</label>
            </div>
        </div>
    );
}

export default LocationStats;