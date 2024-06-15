// hooks/useFetchItems.ts
import { useEffect, useState } from "react";
import {getItemByID, getItems} from "../services/item.service";
import { ItemWithInventory } from "../models/item.models";

export const useGetItems = () => {
    const [items, setItems] = useState<ItemWithInventory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect((): void => {
        const fetchItems = async (): Promise<void> => {
            try {
                setLoading(true);
                const items: ItemWithInventory[] = await getItems();
                setItems(items);
            } catch (error) {
                setError('Error getting items');
            } finally {
                setLoading(false);
            }
        };

        fetchItems()
            .then(() => console.log('Items fetched'));
    }, []);

    return { items, loading, error };
}

const useGetItem = (id: string | undefined) => {
    const [item, setItem] = useState<ItemWithInventory | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect((): void => {
        if (!id) return;
        const fetchItem = async (): Promise<void> => {
            try {
                setLoading(true);
                const itemId: number = parseInt(id);
                const item: ItemWithInventory = await getItemByID(itemId);
                setItem(item);
            } catch (error) {
                setError('Error fetching item');
            } finally {
                setLoading(false);
            }
        };

        fetchItem()
            .then(() => console.log('Item fetched successfully'));
    }, [id]);

    return { item, loading, error };
};

export default useGetItem;
