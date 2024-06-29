import UserTable from "./components/UserTable/UserTable.tsx";
import Dialog from "../../components/Dialog/Dialog.tsx";
import CreateUser from "./components/CreateUser/CreateUser.tsx";
import {useState} from "react";
import PageActions from "../../components/PageActions/PageActions.tsx";

const Users = () => {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const toggleModal = (): void => {
        setIsModelOpen(!isModelOpen);
    }

    // Handle search input
    const handleSearch = (term: string): void => {
        setSearchTerm(term);
    };

    return (
        <div className="section">
            <PageActions
                onToggleModal={toggleModal}
                buttonLabel="Add User"
                searchTerm={searchTerm}
                onSearch={handleSearch}
                placeholder="Search Users"
                heading="Users"
            />
            <div className="section-content">
                <UserTable/>
            </div>
            <Dialog
                heading={"Create User"}
                isOpen={isModelOpen}
                toggle={toggleModal}
                element={<CreateUser/>}
            />
        </div>
    );
};

export default Users;
