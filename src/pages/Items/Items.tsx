import React, { useState } from 'react';
import Dialog from '../../components/Dialog/Dialog.tsx';
import { useGetItems } from "../../hooks/item.hooks.ts";
import PageActions from "../../components/PageActions/PageActions.tsx";
import CreateItem from "./components/CreateItem/CreateItem.tsx";
import './components/ItemList/ItemList.scss';
import ItemList from "./components/ItemList/ItemList.tsx";
import {ItemWithInventory} from "../../models/item.models.ts";

const Items: React.FC = () => {
    const { items, loading, error } = useGetItems();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Toggle window to create item
    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
    };

    // Handle search input
    const handleSearch = (term: string): void => {
        setSearchTerm(term);
    };

    // Filter items based on search term
    const filteredItems: ItemWithInventory[] = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="section">
            <div className="section-heading">
                <h1>ITEMS</h1>
            </div>
            <PageActions
                onToggleModal={toggleModal}
                buttonLabel="Add Item"
                searchTerm={searchTerm}
                onSearch={handleSearch}
                placeholder="Search Items"
            />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <ItemList items={filteredItems} />
            )}
            <Dialog
                heading="Create Item"
                isOpen={isModalOpen}
                toggle={toggleModal}
                element={<CreateItem />}
            />
        </div>
    );
}

export default Items;
