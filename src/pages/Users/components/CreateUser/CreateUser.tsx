import {createUser} from "../../../../services/user.services.ts";
import React, {useState} from "react";
import {NewUserInput} from "../../../../models/user.models.ts";
import {MdCreate} from "react-icons/md";

const CreateUser = () => {

    const [formData, setFormData] = useState<NewUserInput>({
        username: "",
        password: ""
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to the server
        createUser(formData)
            .then((response) => {
                console.log('User created successfully:', response);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    };


    return (
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
                <button type="submit"><MdCreate className="icon"/>Create User</button>
            </div>
        </form>
    );
}

export default CreateUser;