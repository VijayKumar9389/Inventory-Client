import React, {useEffect, useState} from "react";
import {NewUserInput, User} from "../../../../models/user.models.ts";
import {editUser} from "../../../../services/user.services.ts";
import {UpdateUserInput} from "../../../../models/user.models.ts";
import {BiSave} from "react-icons/bi";

const EditUser: React.FC<{ user: User }> = ({user}) => {
    const [formData, setFormData] = useState<NewUserInput>({
        username: "",
        password: ""
    });

    useEffect(() => {
        // Set initial form data with the user's current information
        setFormData({
            username: user.username,
            password: "" // Password should be empty initially for security reasons
        });
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const data: UpdateUserInput = {
            username: formData.username,
            password: formData.password,
            id: user.id
        };

        editUser(data)
            .then((response: User): void => {
                console.log('User edited successfully:', response);
                window.location.reload();
            })
            .catch((error): void => {
                console.error('Error editing user:', error);
            });
    };

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange}/>
                </div>
                <div className="btn-container">
                    <button type="submit"><BiSave className="icon"/>Edit User</button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
