import { useEffect, useState } from "react";
import { User } from "../../../../models/user.models.ts";
import { getUsers } from "../../../../services/user.services.ts";
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";

const UserTable = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect((): void => {
        getUsersData().then(() => console.log('Users loaded'));
    }, []);

    const getUsersData = async (): Promise<void> => {
        try {
            const users: User[] = await getUsers();
            setUsers(users);
        } catch (error) {
            console.error('Error getting users:', error);
        }
    }

    return (
        <div className="panel">
            <div className="panel-header">
                <h2>Current Users</h2>
            </div>

            <div className="panel-content">
                <table className="user-table">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user: User) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.isAdmin ? "True" : "False"}</td>
                            <td className="record-actions">
                                <button>
                                    <FaEdit/>
                                </button>
                                <button>
                                    <MdDelete/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>

    );
}

export default UserTable;
