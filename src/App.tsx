import {Routes, Route} from 'react-router-dom';
import Items from './pages/Items/Items';
import Navbar from './components/Navbar/Navbar.tsx';
import Locations from './pages/Locations/Locations';
import LocationPage from './pages/LocationPage/LocationPage';
import ItemPage from './pages/ItemPage/ItemPage';
import Users from './pages/Users/Users';
import Login from './pages/Login/Login';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import './styles/App.scss';
import {useEffect} from "react";
import {verifyRefreshToken} from "./services/auth.services.ts";
import {setLogin, setLogout} from "./store/reducers/auth.reducer.ts";
import {activateInterceptor} from "./utils/interceptors.ts";
import Test from "./pages/Tests/Test.tsx";

// App component
function App() {
    const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.loggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        activateInterceptor(); // Call the interceptor function

        const initializeApp = async (): Promise<void> => {
            try {
                // Verify the refresh token
                const response = await verifyRefreshToken();
                // Dispatch action indicating successful verification
                dispatch(setLogin(response));
                console.log('Refresh token verified');
            } catch (error) {
                // Dispatch action indicating failed verification
                dispatch(setLogout());
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                console.error('Error verifying refresh token:', error);
            }
        };

        initializeApp().then(() => console.log('App initialized'));
    }, [dispatch]);

    if (!isLoggedIn) {
        return <Login />;
    }

    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Items />} />
                    <Route path="/items/:id" element={<ItemPage />} />
                    <Route path="/locations" element={<Locations />} />
                    <Route path="/locations/:id" element={<LocationPage />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
            </div>
        </div>
    );
}


export default App;
