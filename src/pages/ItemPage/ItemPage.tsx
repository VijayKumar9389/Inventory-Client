import './ItemPage.scss';
import {useParams} from "react-router-dom";
import {getItemById} from "../../services/item.service.ts";
import {useState, useEffect} from "react";
import {InventoryWithRecords, ItemRecord, ItemWithInventory} from "../../models/item.models.ts";
import EditItem from "./components/EditItem/EditItem.tsx";
import {deleteItem} from "../../services/item.service.ts";
import RecordListItem from "../LocationPage/components/RecordList/RecordListItem.tsx";
import LocationDetails from "./components/LocationDetails/LocationDetails.tsx";

const ItemPage = () => {
    const {id} = useParams();

    const [item, setItem] = useState<ItemWithInventory | null>(null);

    const handleDeleteItem = async (): Promise<void> => {
        if (!item) return;
        try {
            await deleteItem(item.id);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    useEffect((): void => {
        const fetchItem = async (): Promise<void> => {
            if (!id) return;
            try {
                const itemId: number = parseInt(id);
                const item: ItemWithInventory = await getItemById(itemId);
                setItem(item);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };
        fetchItem().then(() => console.log('Item fetched successfully'));
    }, []);

    if (!item) return <div>Loading...</div>

    return (
        <div className="section">
            <div className="section-heading">
                <div>
                    <h1>{item.name}</h1>
                    <h2>{item.description}</h2>
                </div>
                <button onClick={() => handleDeleteItem()}>
                    Delete Item
                </button>
            </div>
            <div className="panel">
                <EditItem item={item}/>
            </div>
            <ul className="locationrecord-list">
                {item.inventory.map((inventory: InventoryWithRecords) => (
                    <li key={inventory.id} className="location-record">
                        <LocationDetails inventory={inventory} itemValue={item.value}/>
                        <ul className="itemrecord-list">
                            {inventory.records.map((record: ItemRecord) => (
                                <RecordListItem key={record.id} record={record}/>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ItemPage;