import {getItems} from "../../services/item.service.ts";
import {useEffect, useState} from "react";
import {ItemWithInventory} from "../../models/item.models.ts";
import ItemCard from "./components/ItemCard/ItemCard.tsx";
import Input from "../../components/Input/Input.tsx";
import {FaPlus} from "react-icons/fa6";
import Dialog from "../../components/Dialog/Dialog.tsx";
import CreateItem from "./components/CreateItem/CreateItem.tsx";

const Items = () => {

    const [items, setItems] = useState<ItemWithInventory[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
    }

    useEffect((): void => {
        const fetchItems = async (): Promise<void> => {
            try {
                const items: ItemWithInventory[] = await getItems();
                setItems(items);
            } catch (error) {
                console.error('Error getting items:', error);
            }
        }
        fetchItems()
            .then(() => console.log('Items fetched'));
    }, []);

    return (
        <div className="section">
            <div className="section-heading">
                <h1>ITEMS</h1>
            </div>
            <div className="page-actions">
                <Input value="" placeholder="Search items..." onChange={(): void => {
                }}/>
                <button onClick={() => toggleModal()}>
                    <FaPlus className="icon"/>
                    Add Item
                </button>
            </div>
            <ul className="item-list">
                {items.map((item: ItemWithInventory) => (
                    <ItemCard item={item} key={item.id}/>
                ))}
            </ul>
            <Dialog heading={"Create Item"}
                    isOpen={isModalOpen}
                    toggle={() => toggleModal()}
                    element={<CreateItem/>}
            />
        </div>
    );
}

export default Items;