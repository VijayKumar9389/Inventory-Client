import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LocationWithInventory } from "../../../../models/location.models.ts";
import { deleteLocation } from "../../../../services/location.services.ts";
import { useState } from "react";
import Dialog from "../../../../components/Dialog/Dialog.tsx";
import EditLocation from "../EditLocation/EditLocation.tsx";
import './LocationPageHeading.scss';
import {FaWindowClose} from "react-icons/fa"; // Import SCSS file

const LocationPageHeading: React.FC<{ location: LocationWithInventory }> = ({ location }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModelOpen, setIsModelOpen] = useState(false);

    const toggleModal = (): void => {
        setIsModelOpen(!isModelOpen);
    }

    const toggleDropdown = (): void => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleDeleteLocation = async (): Promise<void> => {
        if (!location) return;
        try {
            await deleteLocation(location.id);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting location:', error);
        }
    }

    return (
        <div className="page-heading">
            <div className="location-heading">
                <h1>{location?.name}</h1>
                <h2>{location?.description}</h2>
            </div>
            <div className="dropdown">
                <button className="dropdown-button" onClick={() => toggleDropdown()}>
                    {isDropdownOpen ? <FaWindowClose /> : <BiDotsHorizontalRounded />}

                </button>
                <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                    <button onClick={() => handleDeleteLocation()}>
                        Delete Location
                    </button>
                    <button onClick={() => toggleModal()}>
                        Edit Location
                    </button>
                </div>
            </div>
            <Dialog
                isOpen={isModelOpen}
                toggle={toggleModal}
                heading={"Edit Location"}
                element={<EditLocation location={location} />}
            />
        </div>
    );
}

export default LocationPageHeading;
