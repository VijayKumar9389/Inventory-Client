import {FaEdit} from "react-icons/fa";
import {User} from "../../../../models/user.models.ts";
import React from "react";
import {deleteUser} from "../../../../services/user.services.ts";
import {useState} from "react";
import EditUser from "../EditUser/EditUser.tsx";
import Dialog from "../../../../components/Dialog/Dialog.tsx";
import ConfirmationButton from "../../../../components/ConfirmationButton/ConfirmationButton.tsx";

const UserTableRow: React.FC<{ user: User }> = ({user}) => {

    const [isModelOpen, setIsModelOpen] = useState(false);

    const toggleModal = (): void => {
        setIsModelOpen(!isModelOpen);
    }

    const removeUser = (): void => {
        deleteUser(user.id)
            .then((): void => {
                console.log('User deleted');
                window.location.reload(); // This will reload the page
            })
            .catch((error) => console.error('Error deleting user:', error));
    };

    return (
        <>
            <Dialog
                heading={"Edit User"}
                isOpen={isModelOpen}
                toggle={toggleModal}
                element={<EditUser user={user}/>}
            />

            <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.isAdmin ? "True" : "False"}</td>
                <td className="record-actions">
                    <button onClick={() => toggleModal()}>
                        <FaEdit className="icon"/> Edit
                    </button>
                    {!user.isAdmin && (
                        <>
                            <ConfirmationButton buttonText={"Remove"}
                                                confirmationMessage={`Are you sure you want to delete ${user.username}?`}
                                                onConfirm={removeUser}/>
                        </>
                    )}
                </td>
            </tr>
        </>
    );
}

export default UserTableRow;