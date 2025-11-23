import React, {useState} from "react";
import {BiArrowBack, BiDotsHorizontalRounded} from "react-icons/bi";
import {FaEdit} from "react-icons/fa";
import {LocationWithInventory} from "../../../../models/location.models";
import {deleteLocation} from "../../../../services/location.services";
import Dialog from "../../../../components/Dialog/Dialog";
import EditLocation from "../EditLocation/EditLocation";
import {useNavigate} from "react-router-dom";
import ConfirmationButton from "../../../../components/ConfirmationButton/ConfirmationButton.tsx";
import {MdOutlineClose} from "react-icons/md";

interface LocationPageHeadingProps {
    location: LocationWithInventory;
}

const LocationPageHeading: React.FC<LocationPageHeadingProps> = ({location}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
    }

    const toggleDropdown = (): void => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleDeleteLocation = async (): Promise<void> => {
        if (!location) return;
        try {
            await deleteLocation(location.id);
            navigate(-1);
        } catch (error) {
            console.error('Error deleting location:', error);
            window.alert('Cannot delete location associated with inventory records.');
        }
    }

    return (
        <div className="page-heading">
            <button className="action-btn" onClick={() => navigate(-1)}>
                <BiArrowBack />
            </button>

            <div className="heading-content">
                <h1>{location?.name}</h1>
                <div className="dropdown-container">
                    <button className="menu-btn" onClick={toggleDropdown}>
                        {isDropdownOpen ? <MdOutlineClose /> : <BiDotsHorizontalRounded />}
                    </button>

                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <button className="edit-btn" onClick={toggleModal}>
                                <FaEdit className="icon" />
                                Edit Location
                            </button>
                            <ConfirmationButton
                                onConfirm={handleDeleteLocation}
                                confirmationMessage={`Are you sure you want to delete ${location.name}?`}
                                buttonText="Delete Location"
                            />
                        </div>
                    )}
                </div>
            </div>

            <Dialog
                isOpen={isModalOpen}
                toggle={toggleModal}
                heading="Edit Location"
                element={<EditLocation location={location} />}
            />
        </div>
    );
}

export default LocationPageHeading;
