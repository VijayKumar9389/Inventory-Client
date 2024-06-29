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

// calculate the total value of missing items in the location
export const calculateMissingValue = (inventory: InventoryDTO[]): number => {
    return inventory.reduce((total: number, inventory: InventoryDTO): number => {
        if (inventory.records) {
            return total + inventory.records.filter((record) => record.missing).length * inventory.item.value;
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

// Get the total value of validated items in the location
export const calculateValidatedValue = (inventory: InventoryDTO[]): number => {
    return inventory.reduce((total: number, inventory: InventoryDTO): number => {
        if (inventory.records) {
            return total + inventory.records.filter((record) => record.receipt).length * inventory.item.value;
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

// Get the total value of missing items for an item
export const getMissingValue = (item: ItemWithInventory): number => {
    return item.inventory.reduce((total: number, inventory: InventoryWithRecords) => {
        return total + inventory.records.filter((record) => record.missing).length * item.value;
    }, 0);
};

//Get the number of validated items for an item
export const getValidatedItems = (item: ItemWithInventory): number => {
    return item.inventory.reduce((total: number, inventory: InventoryWithRecords) => {
        return total + inventory.records.filter((record) => record.receipt).length;
    }, 0);
};

// Get the value of validated items for an item
export const getValidatedValue = (item: ItemWithInventory): number => {
    return item.inventory.reduce((total: number, inventory: InventoryWithRecords) => {
        return total + inventory.records.filter((record) => record.receipt).length * item.value;
    }, 0);
};

// Get the value of remaining items for an item
export const getRemainingValue = (item: ItemWithInventory): number => {
    return item.inventory.reduce((total: number, inventory: InventoryWithRecords) => {
        return total + inventory.records.filter((record) => !record.missing).length * item.value;
    }, 0);
};

// Get the total value of items in the location
export const getQuantity = (item: ItemWithInventory): number => {
    return item.inventory.reduce((total: number, inventory: InventoryWithRecords) => {
        return total + inventory.records.length;
    }, 0);
};

// Get remaining items in the location
export const getRemainingItems = (item: ItemWithInventory): number => {
    return item.inventory.reduce((total: number, inventory: InventoryWithRecords) => {
        return total + inventory.records.filter((record) => !record.missing).length;
    }, 0);
};

