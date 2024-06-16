import React, {useState} from 'react';
import {loginUser} from "../../services/user.services.ts";
import {useDispatch} from "react-redux";
import {setLogin} from "../../store/reducers/auth.reducer.ts";
import './Login.scss';
import Logo from "../../assets/LogoTwo.png";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const onLoginClick = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const response = await loginUser(username, password);
            dispatch(setLogin(response));
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <h1 className="login-title">
                    <h2 className="form-title">Please Sign In</h2>
                    <img src={Logo} alt="Logo"/>
                </h1>
                <form onSubmit={onLoginClick} className="form">
                <div className="form-group">
                            <label htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="login-input"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-input"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button type="submit" className="form-btn">
                            Login
                        </button>
                    </form>
            </div>
        </div>
    );
};

export default Login;
