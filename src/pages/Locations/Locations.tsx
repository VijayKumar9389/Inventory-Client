import {getAllLocations} from "../../services/location.services.ts";
import {LocationWithInventory} from "../../models/location.models.ts";
import {useEffect, useState} from "react";
import LocationCard from "./components/LocationCard/LocationCard.tsx";
import Input from "../../components/Input/Input.tsx";
import {FaPlus} from "react-icons/fa6";
import CreateLocation from "./components/CreateLocation/CreateLocation.tsx";
import Dialog from "../../components/Dialog/Dialog.tsx";

const Locations = () => {
    const [locations, setLocations] = useState<LocationWithInventory[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Toggle modal
    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
    }

    // Fetch all locations
    useEffect((): void => {
        const fetchLocations = async (): Promise<void> => {
            try {
                const locations: LocationWithInventory[] = await getAllLocations();
                setLocations(locations);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        fetchLocations()
            .then(() => console.log('Locations fetched'));
    }, []);

    return (
        <div className="section">
            <div className="section-heading">
                <h1>LOCATIONS</h1>
            </div>
            <div className="page-actions">
                <Input value="" placeholder="Search Locations..." onChange={(): void => {
                }}/>
                <button onClick={() => toggleModal()}>
                    <FaPlus className="icon"/>
                    Add Location
                </button>
            </div>
            <ul>
                {locations.map((location: LocationWithInventory) => (
                    <LocationCard location={location} key={location.id}/>
                ))}
            </ul>
            <Dialog isOpen={isModalOpen}
                    heading="Create Location"
                    toggle={() => toggleModal()}
                    element={<CreateLocation/>}
            />
        </div>
    );
}

export default Locations;