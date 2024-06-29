import {Link} from 'react-router-dom';
import './Navbar.scss';
import {FaBox, FaLocationDot, FaUsers} from "react-icons/fa6";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {GiHamburgerMenu} from "react-icons/gi";
import Sidebar from "../Sidebar/Sidebar.tsx";
import {useState} from "react";
import {PiPackageFill} from "react-icons/pi";

const Navbar = () => {
    const isAdmin: boolean = useSelector((state: RootState) => state.auth.admin);
    const [toggle, setToggle] = useState(false);

    const toggleSidebar = () => setToggle(!toggle);

    return (
        <div className="navbar">
            <div className="logo">
                <PiPackageFill/>
                <h1>Inventory</h1>
            </div>
            <ul className="menu-list">
                <Link className="menu-item" to="/"><FaBox/><a>Items</a></Link>
                <Link className="menu-item" to="/locations"><FaLocationDot/><a>Locations</a></Link>
                {isAdmin && (
                    <>
                        <Link className="menu-item" to="/users"><FaUsers/><a>Users</a></Link>
                    </>
                )}
            </ul>
            <button className="nav-btn" onClick={() => toggleSidebar()}>
                <GiHamburgerMenu/>
            </button>
            {/*<div className="user-icon">*/}
            {/*    <FaUser/>*/}
            {/*    {user}*/}
            {/*</div>*/}
            <Sidebar isOpen={toggle} toggle={toggleSidebar}/>
        </div>
    );
}

export default Navbar;
