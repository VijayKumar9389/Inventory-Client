import UserTable from "./components/UserTable/UserTable.tsx";
import Dialog from "../../components/Dialog/Dialog.tsx";
import CreateUser from "./components/CreateUser/CreateUser.tsx";
import {useState} from "react";

const Users = () => {
    const [isModelOpen, setIsModelOpen] = useState(false);

    const toggleModal = (): void => {
        setIsModelOpen(!isModelOpen);
    }

    return (
        <div className="section">
            <div className="section-heading">
                <label>Only Admins can make changes</label>
                <button onClick={toggleModal}>Add User</button>
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
