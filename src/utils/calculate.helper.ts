import {InventoryDTO} from "../models/location.models.ts";
import {InventoryWithRecords, ItemWithInventory} from "../models/item.models.ts";

// Get the total number of items across all locations
export const calculateTotalItems = (inventory: InventoryDTO[]): number => {
    return inventory.reduce((total: number, inventory: InventoryDTO): number => {
        if (inventory.records) {
            return total + inventory.records.length;
        } else {
            return total;
        }
    }, 0);
};

// Get the total number of items missing in the location
export const calculateMissingItems = (inventory: InventoryDTO[]): number => {
    return inventory.reduce((total: number, inventory: InventoryDTO): number => {
        if (inventory.records) {
            return total + inventory.records.filter((record) => record.missing).length;
        } else {
            return total;
        }
    }, 0);
};

// Get the total number of items that are validated in the location
export const calculateValidatedItems = (inventory: InventoryDTO[]): number => {
    return inventory.reduce((total: number, inventory: InventoryDTO): number => {
        if (inventory.records) {
            return total + inventory.records.filter((record) => record.receipt).length;
        } else {
            return total;
        }
    }, 0);
};

// Get the total value of items across all locations
export const calculateTotalValue = (inventory: InventoryDTO[]): number => {
    return inventory.reduce((total: number, inventory: InventoryDTO): number => {
        if (inventory.records) {
            return total + (inventory.records.length * inventory.item.value);
        } else {
            return total;
        }
    }, 0);
};

// Get the total number of items in the location
export const getTotalValue = (item: ItemWithInventory): number => {
    return item.inventory.reduce((total: number, inventory: InventoryWithRecords) => {
        return total + inventory.records.length * item.value;
    }, 0);
};

// Get the total number of items that are missing for an item
export const getMissingItems = (item: ItemWithInventory): number => {
    return item.inventory.reduce((total: number, inventory: InventoryWithRecords) => {
        return total + inventory.records.filter((record) => record.missing).length;
    }, 0);
};

//Get the number of validated items for an item
export const getValidatedItems = (item: ItemWithInventory): number => {
    return item.inventory.reduce((total: number, inventory: InventoryWithRecords) => {
        return total + inventory.records.filter((record) => record.receipt).length;
    }, 0);
};

// Get the total value of items in the location
export const getQuantity = (item: ItemWithInventory): number => {
    return item.inventory.reduce((total: number, inventory: InventoryWithRecords) => {
        return total + inventory.records.length;
    }, 0);
};
