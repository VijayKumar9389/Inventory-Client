import React from 'react';
import WarningMessage from "../../../../components/WarningMessage/WarningMessage.tsx";
import {LocationWithInventory} from "../../../../models/location.models.ts";
import LocationTableRow from "./LocationTableRow.tsx";

interface LocationListProps {
    locations: LocationWithInventory[];
}

const LocationTable: React.FC<LocationListProps> = ({locations}) => {
    if (locations.length === 0) {
        return (
            <WarningMessage message="No Locations Created."/>
        );
    }

    return (
        <div className="table-wrapper">
            <table className="select-table">
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Total Items</th>
                    <th>Missing</th>
                    <th>Validated</th>
                    <th>Items Types</th>
                </tr>
                </thead>
                <tbody>
                {locations.map(location => (
                    <LocationTableRow location={location} key={location.id}/>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LocationTable;
