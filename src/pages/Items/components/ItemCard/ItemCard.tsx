// ItemCard.jsx
import React from "react";
import {ItemWithInventory} from "../../../../models/item.models";
import "./ItemCard.scss";
import ImageWithFallback from "../../../../components/ImageWithAlt/ImageWithAlt";
import {useNavigate} from "react-router-dom";

const ItemCard: React.FC<{ item: ItemWithInventory }> = ({item}) => {
    const navigate = useNavigate();

    const getTotalValue = (): number => {
        return item.inventory.reduce((total, inventory) => {
            return total + inventory.records.length * item.value;
        }, 0);
    };

    const getQuantity = (): number => {
        return item.inventory.reduce((total, inventory) => {
            return total + inventory.records.length;
        }, 0);
    };

    const selectItem = (): void => {
        navigate(`/items/${item.id}`);
    }

    return (
        <li className="item-card" onClick={() => selectItem()}>
            <div className="item-image">
                <ImageWithFallback imageName={item.image} />
            </div>
            <div className="item-inventory">
                <div className="item-details">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                </div>
                <div className="stat-list">
                    <div className="stat">
                        <p className="stat-label">Value:</p>
                        <strong className="stat-value">${item.value}</strong>
                    </div>
                    <div className="stat">
                        <p className="stat-label">In Stock:</p>
                        <strong className="stat-value">{getQuantity()}</strong>
                    </div>
                    <div className="stat">
                        <p className="stat-label">Total Value:</p>
                        <strong className="stat-value">${getTotalValue()}</strong>
                    </div>
                </div>

                <ul className="location-list">
                    {item.inventory.map((inventory) => (
                        <li key={inventory.id} className="location-inventory">
                            <p><strong>{inventory.records.length}&nbsp;</strong> In {inventory.location.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
};

export default ItemCard;
