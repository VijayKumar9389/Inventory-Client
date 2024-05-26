import './LocationPage.scss';
import {getLocationById} from "../../services/location.services.ts";
import {InventoryDTO, LocationWithInventory} from "../../models/location.models.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import InventoryDetails from "./components/InventoryDetails/InventoryDetails.tsx";
import RecordList from "./components/RecordList/RecordList.tsx";
import {createItemRecord} from "../../services/item.service.ts";
import {NewItemRecordInput} from "../../models/item.models.ts";
import LocationPageActions from "./components/LocationPageActions/LocationPageActions.tsx";
import LocationPageHeading from "./components/LocationPageHeading/LocationPageHeading.tsx";
import {FaPlus} from "react-icons/fa6";

const LocationPage = () => {
    const {id} = useParams();
    const [location, setLocation] = useState<LocationWithInventory | null>(null);

    // Fetch location by id
    useEffect((): void => {
        const fetchLocation = async (): Promise<void> => {
            if (!id) return;
            try {
                const locationId: number = parseInt(id);
                const location: LocationWithInventory = await getLocationById(locationId);
                setLocation(location);
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        };
        fetchLocation().then(() => console.log('Location fetched successfully'));
    }, [id]);

    // Create new item record
    const handleCreateRecord = async (itemId: number, inventoryId: number): Promise<void> => {
        if (!location) return;
        try {
            const newRecordInput: NewItemRecordInput = {
                itemId: itemId,
                locationId: location.id,
                inventoryId: inventoryId, // Use the provided inventoryId
            };
            await createItemRecord(newRecordInput);
            window.location.reload();
        } catch (error) {
            console.error('Error creating record:', error);
        }
    }

    // Render loading state
    if (!location) {
        return <p>No location id provided</p>;
    }

    return (
        <div className="section">
            <LocationPageHeading location={location}/>
            <LocationPageActions locationId={location.id}/>
            <ul className="inventory-list">
                {location && location.inventory.map((inventory: InventoryDTO) => (
                    <li key={inventory.id} className="inventory-item">
                        <InventoryDetails inventory={inventory}/>
                        <RecordList records={inventory.records}/>
                        <button onClick={() => handleCreateRecord(inventory.itemId, inventory.id)}>
                            <FaPlus className="icon" />
                            Add Record
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LocationPage;
