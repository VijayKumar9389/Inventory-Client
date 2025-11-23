import React from "react";
import { ItemWithInventory } from "../../../../models/item.models";
import "./ItemStats.Module.scss";

const ItemStats: React.FC<{ items: ItemWithInventory[] }> = ({ items }) => {
    // Calculate the total value of unique items
    const totalItemTypes: number = items.length;

    // Calculate the total number of items recorded
    const totalItems: number = items.reduce((total, item) =>
            total + item.inventory.reduce((invTotal, inv) => invTotal + (inv.records?.length ?? 0), 0),
        0);

    // Calculate the total value of items
    const totalItemsValue: number = items.reduce((total, item) =>
            total + (item.value * item.inventory.reduce((invTotal, inv) => invTotal + (inv.records?.length ?? 0), 0)),
        0);

    // Calculate missing items and their value
    const missingItems: number = items.reduce((total, item) =>
            total + item.inventory.reduce((invTotal, inv) => invTotal + (inv.records.filter(record => record.missing).length ?? 0), 0),
        0);

    const missingItemsValue: number = items.reduce((total, item) =>
            total + (item.value * item.inventory.reduce((invTotal, inv) => invTotal + (inv.records.filter(record => record.missing).length ?? 0), 0)),
        0);

    // Calculate remaining items and their value
    const remainingItems: number = totalItems - missingItems;
    const remainingItemsValue: number = totalItemsValue - missingItemsValue;

    return (
        <div className="stats-container">
            <div className="stat-item">
                <h3 className="stat-value">{totalItemTypes}</h3>
                <label className="stat-label">Total Item Types</label>
            </div>
            <div className="stat-item">
                <h3 className="stat-value">{totalItems}</h3>
                <label className="stat-label">Total Items Recorded</label>
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
};

export default ItemStats;