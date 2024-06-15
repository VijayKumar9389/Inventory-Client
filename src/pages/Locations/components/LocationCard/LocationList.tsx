import React from 'react';
import './LocationList.scss';
import WarningMessage from "../../../../components/WarningMessage/WarningMessage.tsx";
import {LocationWithInventory} from "../../../../models/location.models.ts";
import LocationCard from "./LocationCard.tsx";

interface LocationListProps {
    locations: LocationWithInventory[];
}

const LocationList: React.FC<LocationListProps> = ({ locations }) => {
    if (locations.length === 0) {
        return (
            <WarningMessage message="No Locations Created."/>
        );
    }

    return (
        <ul className="location-card-list">
            {locations.map(location => (
                <LocationCard location={location} key={location.id} />
            ))}
        </ul>
    );
};

export default LocationList;
