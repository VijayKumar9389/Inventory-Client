import {useEffect, useState} from "react";
import {User} from "../../../../models/user.models.ts";
import {getUsers} from "../../../../services/user.services.ts";
import UserTableRow from "./UserTableRow.tsx";

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
            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user: User) => (
                        <UserTableRow key={user.id} user={user} />
                    ))}
                    </tbody>
                </table>
            </div>

        </div>

    );
}

export default UserTable;
