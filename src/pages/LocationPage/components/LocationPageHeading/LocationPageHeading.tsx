import React, {useState} from "react";
import {BiArrowBack, BiDotsHorizontalRounded} from "react-icons/bi";
import {FaEdit, FaWindowClose} from "react-icons/fa";
import {LocationWithInventory} from "../../../../models/location.models";
import {deleteLocation} from "../../../../services/location.services";
import Dialog from "../../../../components/Dialog/Dialog";
import EditLocation from "../EditLocation/EditLocation";
import './LocationPageHeading.scss';
import {useNavigate} from "react-router-dom";
import ConfirmationButton from "../../../../components/ConfirmationButton/ConfirmationButton.tsx";

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
            window.alert('Failed to delete location')
        }
    }

    return (
        <div className="page-heading">
            <div className="heading-wrapper">
                <button className="action-btn" onClick={() => navigate(-1)}><BiArrowBack/></button>
                <div>
                    <h1>{location?.name}</h1>
                    <h2>{location?.description}</h2>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropdown-button" onClick={toggleDropdown}>
                    {isDropdownOpen ? <FaWindowClose/> : <BiDotsHorizontalRounded/>}
                </button>
                <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                    <button onClick={toggleModal}>
                        <FaEdit className="icon"/>
                        Edit Location
                    </button>
                    <ConfirmationButton onConfirm={handleDeleteLocation}
                                        confirmationMessage="Are you sure you want to delete this location?"
                                        buttonText="Delete Location"/>
                </div>
            </div>
            <Dialog
                isOpen={isModalOpen}
                toggle={toggleModal}
                heading={"Edit Location"}
                element={<EditLocation location={location}/>}
            />
        </div>
    );
}

export default LocationPageHeading;
