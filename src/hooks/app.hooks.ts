// In a file named useInitializeApp.ts
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {checkAdminStatus, verifyRefreshToken} from "../services/auth.services.ts";
import {SetAdmin, setLogin, setLogout} from "../store/reducers/auth.reducer.ts";
import {activateInterceptor} from "../utils/interceptors.ts";
import {Action, Dispatch} from "redux";
import {User} from "../models/user.models.ts";
import {getUsers} from "../services/user.services.ts";

export const useInitializeApp = () => {
    const isLoggedIn: boolean = useSelector(
        (state: RootState) => state.auth.loggedIn
    );

    const dispatch: Dispatch<Action> = useDispatch();

    useEffect((): void => {
        activateInterceptor(dispatch);
        const initializeApp = async (): Promise<void> => {
            try {
                // Verify the refresh token
                const response = await verifyRefreshToken();
                const isAdmin = await checkAdminStatus();

                // Dispatch action indicating successful verification
                dispatch(setLogin(response));
                dispatch(SetAdmin(isAdmin));
                console.log("Refresh token verified");
            } catch (error) {
                // Dispatch action indicating failed verification
                dispatch(setLogout());
                console.error("Error verifying refresh token:", error);
            }
        };

        initializeApp().then(() => console.log("App initialized"));
    }, [dispatch,]);

    return isLoggedIn;
};

// Get all accounts from the API
export const useGetUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect((): void => {
        const fetchUsers = async (): Promise<void> => {
            try {
                setLoading(true);
                const users: User[] = await getUsers();
                setUsers(users);
            } catch (error) {
                setError('Error getting users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers()
            .then(() => console.log('Users fetched'));
    });

    return {users, loading, error};
}