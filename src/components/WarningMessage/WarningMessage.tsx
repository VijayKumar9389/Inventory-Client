import React from "react";
import {FaExclamationTriangle} from "react-icons/fa";
import "./WarningMessage.scss";


const WarningMessage: React.FC<{ message: string }> = ({ message }) => {
    return (
        <div className="warning-message">
            <FaExclamationTriangle className="warning-icon" />
            <p>{message}</p>
        </div>
    );
}

export default WarningMessage;