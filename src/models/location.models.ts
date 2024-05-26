// Base Location interface
import {Item, ItemRecord} from "./item.models.ts";

export interface Location {
    id: number;
    name: string;
    description?: string;
}

export interface LocationWithInventory extends Location {
    inventory: InventoryDTO[]; // Update to use InventoryDTO interface
}

export interface InventoryDTO {
    id: number;
    itemId: number;
    locationId: number;
    item: Item; // Assuming you have an Item interface defined
    records: ItemRecord[]; // Array of ItemRecord to represent item records
}

export interface NewInventoryInput {
    locationId: number;
    itemId: number;
}

export interface NewLocationInput {
    name: string;
    description?: string;
}
