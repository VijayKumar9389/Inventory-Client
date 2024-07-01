import './Navbar.scss';
import {GiHamburgerMenu} from "react-icons/gi";
import Sidebar from "../Sidebar/Sidebar.tsx";
import {useState} from "react";
import {PiPackageFill} from "react-icons/pi";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);

    const toggleSidebar = () => setToggle(!toggle);

    return (
        <div className="navbar">
            <div className="logo">
                <PiPackageFill/>
                <h1>Inventory</h1>
            </div>
            <button className="nav-btn" onClick={() => toggleSidebar()}>
                <GiHamburgerMenu/>
            </button>
            <Sidebar isOpen={toggle} toggle={toggleSidebar}/>
        </div>
    );
}

export default Navbar;
