// Base Item interface
export interface Item {
    id: number;
    name: string;
    description: string;
    image: string;
    value: number;
}

// Item interface with inventory
export interface ItemWithInventory extends Item {
    inventory: InventoryWithRecords[];
}

// Inventory with records and location interface
export interface InventoryWithRecords extends Inventory {
    records: ItemRecord[];
    location: Location;
}

// Base Location interface
export interface Location {
    id: number;
    name: string;
    description?: string;
}

// Base Item Record interface
export interface ItemRecord {
    id: number;
    receipt?: string;
    notes?: string;
    missing: boolean;
    item: Item;
    location: Location;
    inventory?: Inventory; // Update to use InventoryDTO interface
}

export interface NewItemRecordInput {
    itemId: number;
    locationId: number;
    inventoryId: number;
}

export interface NewItemInput {
    name: string;
    description: string;
    image: File | null; // Multer file object
    value: number;
}

export interface UpdateItemInput {
    name: string;
    description: string | null;
    image: File | null;
    value: number;
}


export interface Inventory {
    id: number;
    locationId: number;
    itemId: number;
}

export interface UpdateItemRecordInput {
    notes: string;
    receipt: File | null;
    missing: boolean;
}

