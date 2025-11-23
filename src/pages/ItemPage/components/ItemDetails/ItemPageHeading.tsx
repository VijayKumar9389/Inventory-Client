import React, {useState} from 'react';
import {ItemWithInventory} from "../../../../models/item.models.ts";
import {BiArrowBack, BiDotsHorizontalRounded} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import ConfirmationButton from "../../../../components/ConfirmationButton/ConfirmationButton.tsx";
import {deleteItem} from "../../../../services/item.service.ts";
import {MdOutlineClose} from "react-icons/md";

interface ItemDetailsProps {
    item: ItemWithInventory;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({item}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = (): void => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleDeleteItem = async (): Promise<void> => {
        if (!item) return;
        try {
            await deleteItem(item.id);
            navigate(-1);
        } catch (error) {
            console.error('Error deleting item:', error);
            window.alert('Cannot delete item associated with inventory records.');
        }
    };

    return (
        <div className="page-heading">
            <button className="action-btn" onClick={() => navigate(-1)}>
                <BiArrowBack />
            </button>

            <div className="heading-content">
                <h1>{item.name}</h1>
                <div className="dropdown-container">
                    <button className="menu-btn" onClick={toggleDropdown}>
                        {isDropdownOpen ? <MdOutlineClose /> : <BiDotsHorizontalRounded />}
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <ConfirmationButton
                                buttonText="Delete Item"
                                confirmationMessage={`Are you sure you want to delete ${item.name}?`}
                                onConfirm={handleDeleteItem}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;

