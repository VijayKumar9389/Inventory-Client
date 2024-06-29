import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import LocationPageHeading from './components/LocationPageHeading/LocationPageHeading.tsx';
import {useGetLocationById} from '../../hooks/location.hooks.ts';
import Dialog from '../../components/Dialog/Dialog.tsx';
import AddRecord from './components/AddRecord/AddRecord.tsx';
import LocationInventoryList from './components/LocationInventoryList/LocationInventoryList.tsx';
import {InventoryDTO} from '../../models/location.models.ts';
import Input from "../../components/Input/Input.tsx";
import {FaPlus} from "react-icons/fa6";

const LocationPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {location, loading, error} = useGetLocationById(id);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Function to toggle modal
    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
        // Reload page after closing modal to update inventory list
        if (isModalOpen) {
            window.location.reload();
        }
    };

    // Function to handle search term
    const handleSearch = (term: string): void => {
        setSearchTerm(term);
    };

    // Function to filter inventory items based on item name
    const filterInventory = (inventory: InventoryDTO[], term: string): InventoryDTO[] => {
        return inventory.filter(item =>
            item.item.name.toLowerCase().includes(term.toLowerCase())
        );
    };

    // Filtered inventory based on search term
    const filteredInventory: InventoryDTO[] = searchTerm ? filterInventory(location?.inventory || [], searchTerm) : location?.inventory || [];

    // Render loading state
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="section">
            {location && (
                <>
                    <LocationPageHeading location={location}/>
                    <div className="input-wrapper">
                        <Input value={searchTerm} placeholder={"Search Items"} onChange={(e) => handleSearch(e)}/>
                        <button onClick={toggleModal}>
                            <FaPlus className="icon"/>
                            Add Item
                        </button>
                    </div>
                    <LocationInventoryList inventory={filteredInventory}/>
                    <Dialog
                        isOpen={isModalOpen}
                        toggle={toggleModal}
                        heading="Add Item"
                        element={<AddRecord locationId={location.id}/>}
                    />
                </>
            )}
        </div>
    );
};

export default LocationPage;
