import React from "react";
import { LocationWithInventory } from "../../../../models/location.models";
import "./LocationStats.Module.scss";

const LocationStats: React.FC<{ locations: LocationWithInventory[] }> = ({ locations }) => {
    const totalLocations = locations.length;

    const totalItems = locations.reduce(
        (total, location) =>
            total + location.inventory.reduce(
                (invTotal, inv) => invTotal + (inv.records.length || 0),
                0
            ),
        0
    );

    const totalItemsValue = locations.reduce(
        (total, location) =>
            total + location.inventory.reduce(
                (invTotal, inv) => invTotal + (inv.records.length || 0) * inv.item.value,
                0
            ),
        0
    );

    const missingItems = locations.reduce(
        (total, location) =>
            total + location.inventory.reduce(
                (invTotal, inv) => invTotal + inv.records.filter(r => r.missing).length,
                0
            ),
        0
    );

    const missingItemsValue = locations.reduce(
        (total, location) =>
            total + location.inventory.reduce(
                (invTotal, inv) =>
                    invTotal + inv.records.filter(r => r.missing).length * inv.item.value,
                0
            ),
        0
    );

    const remainingItems = locations.reduce(
        (total, location) =>
            total + location.inventory.reduce(
                (invTotal, inv) =>
                    invTotal + inv.records.filter(r => !r.missing).length,
                0
            ),
        0
    );

    const remainingItemsValue = locations.reduce(
        (total, location) =>
            total + location.inventory.reduce(
                (invTotal, inv) =>
                    invTotal + inv.records.filter(r => !r.missing).length * inv.item.value,
                0
            ),
        0
    );

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
                <h3 className="stat-value">${totalItemsValue.toFixed(2)}</h3>
                <label className="stat-label">Total Items Value</label>
            </div>

            <div className="stat-item">
                <h3 className="stat-value">{missingItems}</h3>
                <label className="stat-label">Missing Items</label>
            </div>

            <div className="stat-item">
                <h3 className="stat-value">${missingItemsValue.toFixed(2)}</h3>
                <label className="stat-label">Missing Items Value</label>
            </div>

            <div className="stat-item">
                <h3 className="stat-value">{remainingItems}</h3>
                <label className="stat-label">Remaining Items</label>
            </div>

            <div className="stat-item">
                <h3 className="stat-value">${remainingItemsValue.toFixed(2)}</h3>
                <label className="stat-label">Remaining Items Value</label>
            </div>
        </div>
    );
};

export default LocationStats;