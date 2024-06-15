import React, {useState} from 'react';
import './ItemPage.scss';
import {useNavigate, useParams} from "react-router-dom";
import EditItem from "./components/EditItem/EditItem";
import {deleteItem} from "../../services/item.service";
import useGetItem from "../../hooks/item.hooks.ts";
import ItemPageHeading from "./components/ItemDetails/ItemPageHeading.tsx";
import ItemInventoryList from "./components/ItemInventoryList/ItemInventoryList.tsx";
import ConfirmationButton from "../../components/ConfirmationButton/ConfirmationButton.tsx";
import Input from "../../components/Input/Input.tsx";
import {InventoryWithRecords} from "../../models/item.models.ts";

const ItemPage: React.FC = () => {
    const {id} = useParams();
    const {item, loading, error} = useGetItem(id);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const navigate = useNavigate();

    const handleDeleteItem = async (): Promise<void> => {
        if (!item) return;
        try {
            await deleteItem(item.id);
            navigate(-1);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const filteredInventory: InventoryWithRecords[] = item?.inventory.filter(inv =>
        inv.location.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Add loading and error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!item) return <div>Item not found</div>;

    return (
        <div className="section">
            <ItemPageHeading item={item}/>
            <EditItem item={item}/>
            <Input value={searchTerm}
                   onChange={setSearchTerm}
                   placeholder={"Search Inventory"}
            />
            <ItemInventoryList inventory={filteredInventory}
                               itemValue={item.value}
            />
            <div className="btn-container">
                <ConfirmationButton
                    buttonText={"Delete Item"}
                    confirmationMessage={`Are you sure you want to delete ${item.name}?`}
                    onConfirm={handleDeleteItem}
                />
            </div>
        </div>
    );
};

export default ItemPage;
