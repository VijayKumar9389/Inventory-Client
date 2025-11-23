import {NavigateFunction, useNavigate} from 'react-router-dom';

export const useNavigation = () => {
    const navigate: NavigateFunction = useNavigate();

    // Select location by id
    const selectLocation = (locationId: number): void => {
        navigate(`/locations/${locationId}`);
    };

    // Select item by id
    const selectItem = (itemId: number): void => {
        navigate(`/${itemId}`);
    }

    return {
        selectLocation,
        selectItem
    };
};
