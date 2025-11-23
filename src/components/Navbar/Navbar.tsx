import './Navbar.Module.scss';
import Sidebar from "../Sidebar/Sidebar.tsx";
import { useState } from "react";
import logo from "../../assets/Logo.png";
import { NavLink } from "react-router-dom"; // Use NavLink for active link handling
import { FaBox, FaLocationDot, FaQuestion, FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import {IoClose, IoMenu} from "react-icons/io5";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const isAdmin: boolean = useSelector((state: RootState) => state.auth.admin);
    const user = useSelector((state: RootState) => state.auth.username);

    const toggleSidebar = () => setToggle(!toggle);

    return (
        <div className="navbar">
            <img className="logo" src={logo} alt="Logo" />
            <ul className="navbar-links">
                <div className="user-icon">
                    <div className="user-icon-image">
                        <FaUser/>
                    </div>
                    <span className="user-name">{user}</span>
                </div>
                <NavLink
                    className={({isActive}) => `navbar-link ${isActive ? 'active' : ''}`}
                    to="/"
                >
                    <FaBox/><span>Items</span>
                </NavLink>
                <NavLink
                    className={({isActive}) => `navbar-link ${isActive ? 'active' : ''}`}
                    to="/locations"
                >
                    <FaLocationDot/><span>Locations</span>
                </NavLink>
                {isAdmin && (
                    <>
                        <NavLink
                            className={({isActive}) => `navbar-link ${isActive ? 'active' : ''}`}
                            to="/users"
                        >
                            <FaUser/><span>Users</span>
                        </NavLink>
                        <NavLink
                            className={({isActive}) => `navbar-link ${isActive ? 'active' : ''}`}
                            to="/questions"
                        >
                            <FaQuestion/><span>Customer Questions</span>
                        </NavLink>
                    </>
                )}
            </ul>
            <button className="nav-btn" onClick={toggleSidebar}>
                {toggle ? <IoClose /> : <IoMenu />}
            </button>
            <Sidebar isOpen={toggle} toggle={toggleSidebar}/>
        </div>
    );
};

export default Navbar;