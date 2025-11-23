import React, {useState} from 'react';
import Dialog from "../../components/Dialog/Dialog.tsx";
import CreateLocation from "./components/CreateLocation/CreateLocation.tsx";
import PageActions from "../../components/PageActions/PageActions.tsx";
import {useGetLocations} from "../../hooks/location.hooks.ts";
import LocationTable from "./components/LocationTable/LocationTable.tsx";
import {LocationWithInventory} from "../../models/location.models.ts";
import SectionHeader from "../../components/SectionHeader/SeactionHeader.tsx";
import LocationStats from "./components/LocationStats/LocationStats.tsx";

const Locations: React.FC = () => {
    const {locations, loading, error} = useGetLocations();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Toggle window to create location
    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
    };

    // Handle search input
    const handleSearch = (term: string): void => {
        setSearchTerm(term);
    };

    // Filter locations based on search term
    const filteredLocations: LocationWithInventory[] = locations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="section">
            <SectionHeader title={"Locations"} />
            <LocationStats locations={locations} />
            <PageActions
                onToggleModal={toggleModal}
                buttonLabel="Add Location"
                searchTerm={searchTerm}
                onSearch={handleSearch}
                placeholder="Search Locations"
            />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div className="section-content">
                <LocationTable locations={filteredLocations}/>
                </div>
            )}
            <Dialog
                isOpen={isModalOpen}
                heading="Create Location"
                toggle={toggleModal}
                element={<CreateLocation/>}
            />
        </div>
    );
};

export default Locations;
