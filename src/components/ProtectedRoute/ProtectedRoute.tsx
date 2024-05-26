import React, {ReactElement} from "react";
import {Navigate} from "react-router-dom";

interface ProtectedRouteProps {
    element: ReactElement;
    isLoggedIn: boolean;
}

// ProtectedRoute.tsx component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, isLoggedIn }) => {
    return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;