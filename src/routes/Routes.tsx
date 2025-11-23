import {Routes, Route} from 'react-router-dom';
import Items from "../pages/Items/Items.tsx";
import Locations from "../pages/Locations/Locations.tsx";
import ItemPage from "../pages/ItemPage/ItemPage.tsx";
import LocationPage from "../pages/LocationPage/LocationPage.tsx";
import Users from "../pages/Users/Users.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import CustomerQuestions from "../pages/CustomerQuestions/CustomerQuestions.tsx";

const RoutesConfig = () => {
    const isAdmin: boolean = useSelector((state: RootState) => state.auth.admin);

    return (
        <Routes>
            <Route path="/" element={<Items/>}/>
            <Route path="/:id" element={<ItemPage/>}/>
            <Route path="/locations" element={<Locations/>}/>
            <Route path="/locations/:id" element={<LocationPage/>}/>
            {isAdmin && (
                <>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/questions" element={<CustomerQuestions/>}/>
                </>
            )}
        </Routes>
    );
}

export default RoutesConfig;
