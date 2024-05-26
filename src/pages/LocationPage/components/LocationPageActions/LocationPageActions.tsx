import Input from "../../../../components/Input/Input.tsx";
import {FaPlus} from "react-icons/fa6";
import {useState} from "react";
import Dialog from "../../../../components/Dialog/Dialog.tsx";
import AddRecord from "../AddRecord/AddRecord.tsx";

const LocationPageActions: React.FC<{ locationId: number }> = ({locationId}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Toggle modal
    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <div className="page-actions">
            <Dialog
                isOpen={isModalOpen}
                toggle={toggleModal}
                heading={"Add Item"}
                element={<AddRecord locationId={locationId}/>}
            />
            <Input value="" onChange={(): void => {
            }} placeholder="Search Inventory"/>
            <button onClick={toggleModal} className="button">
                <FaPlus className="icon"/>
                Add Inventory
            </button>
        </div>
    );
}

export default LocationPageActions;