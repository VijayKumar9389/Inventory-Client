import {Link} from 'react-router-dom';
import './Navbar.scss';
import icon from '../../assets/Logo.png'
import {FaBox, FaLocationDot, FaUser} from "react-icons/fa6";
import {setLogout} from "../../store/reducers/auth.reducer.ts";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {GrLogout} from "react-icons/gr";

const Navbar = () => {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.username);

    const handleLogout = (): void => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setLogout())
    }

    return (
        <div className="navbar">
            <div className="logo">
                <img src={icon} alt="logo"/>
                <h1>Inventory</h1>
            </div>
            <ul className="menu-list">
                <Link className="menu-item" to="/"><FaBox/><a>Items</a></Link>
                <Link className="menu-item" to="/locations"><FaLocationDot/><a>Locations</a></Link>
                <Link className="menu-item" to="/users"><FaUser/><a>Users</a></Link>
            </ul>
            <button className="logout-btn" onClick={() => handleLogout()}>{user}<GrLogout className="icon" /></button>
        </div>
    );
}

export default Navbar;