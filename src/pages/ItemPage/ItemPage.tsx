import React, {useState} from 'react';
import './ItemPage.module.scss';
import {useParams} from "react-router-dom";
import EditItem from "./components/EditItem/EditItem";
import useGetItem from "../../hooks/item.hooks.ts";
import ItemPageHeading from "./components/ItemDetails/ItemPageHeading.tsx";
import ItemInventoryList from "./components/ItemInventoryList/ItemInventoryList.tsx";
import Input from "../../components/Input/Input.tsx";
import {InventoryWithRecords} from "../../models/item.models.ts";

const ItemPage: React.FC = () => {
    const {id} = useParams();
    const {item, loading, error} = useGetItem(id);
    const [searchTerm, setSearchTerm] = useState<string>("");


    // Filter inventory based on search term
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
            {item.inventory.length !== 0 && (
                <Input value={searchTerm}
                       onChange={setSearchTerm}
                       placeholder={"Search Locations"}
                />
            )}
            <ItemInventoryList inventory={filteredInventory}
                               itemValue={item.value}
            />
        </div>
    );
};

export default ItemPage;
