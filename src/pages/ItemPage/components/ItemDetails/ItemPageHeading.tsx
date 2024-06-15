import React from 'react';
import {ItemWithInventory} from "../../../../models/item.models.ts";
import {BiArrowBack} from "react-icons/bi";
import {useNavigate} from "react-router-dom";

interface ItemDetailsProps {
    item: ItemWithInventory;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({item}) => {
    const navigate = useNavigate();

    return (
        <div className="page-heading">
            <div className="heading-wrapper">
                <button className="action-btn" onClick={() => navigate(-1)}>
                    <BiArrowBack/>
                </button>
                <div>
                    <h1>{item.name}</h1>
                    <h2>{item.description}</h2>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;

