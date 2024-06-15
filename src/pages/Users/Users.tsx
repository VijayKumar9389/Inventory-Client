import UserTable from "./components/UserTable/UserTable.tsx";
import Dialog from "../../components/Dialog/Dialog.tsx";
import CreateUser from "./components/CreateUser/CreateUser.tsx";
import {useState} from "react";
import {FaPlus} from "react-icons/fa6";

const Users = () => {
    const [isModelOpen, setIsModelOpen] = useState(false);

    const toggleModal = (): void => {
        setIsModelOpen(!isModelOpen);
    }

    return (
        <div className="section">
            <div className="section-heading">
                <h1>USERS</h1>
            </div>
            <div className="btn-container">
                <button onClick={toggleModal}><FaPlus className="icon"/>Add User</button>
            </div>
            <Dialog
                heading={"Create User"}
                isOpen={isModelOpen}
                toggle={toggleModal}
                element={<CreateUser/>}
            />
            <UserTable/>
        </div>
    );
};

export default Users;
