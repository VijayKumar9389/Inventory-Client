import { Link } from "react-router-dom";
import { FaBox, FaLocationDot, FaUser } from "react-icons/fa6";
import React from "react";
import { setLogout } from "../../store/reducers/auth.reducer.ts";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.scss";
import { RootState } from "../../store/store.ts";

interface SidebarProps {
    isOpen: boolean;
    toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
    const dispatch = useDispatch();
    const isAdmin: boolean = useSelector((state: RootState) => state.auth.admin);

    const handleLogout = (): void => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setLogout());
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <button className="action-btn" onClick={toggle}><MdClose /></button>
            </div>
            <ul className="sidebar-links">
                <Link className="sidebar-link" onClick={toggle} to="/"><FaBox /><span>Items</span></Link>
                <Link className="sidebar-link" onClick={toggle} to="/locations"><FaLocationDot /><span>Locations</span></Link>
                {isAdmin && (
                    <>
                        <Link className="sidebar-link" onClick={toggle} to="/users"><FaUser /><span>Users</span></Link>
                    </>
                )}
            </ul>
            <div className="sidebar-logout-container">
                <button className="sidebar-logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
