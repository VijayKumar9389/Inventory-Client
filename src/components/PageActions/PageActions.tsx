import React from 'react';
import Input from "../Input/Input.tsx";
import {FaPlus} from "react-icons/fa6";
import './PageActions.scss';

interface PageActionsProps {
    onToggleModal: () => void;
    buttonLabel: string;
    searchTerm: string;
    onSearch: (searchTerm: string) => void;
    placeholder: string;
    heading: string;
}

const PageActions: React.FC<PageActionsProps> = ({onToggleModal, buttonLabel, searchTerm, onSearch, placeholder, heading}) => {
    return (
        <div className="section-heading">
            <h1>{heading}</h1>
            <div className="page-actions">
                <Input value={searchTerm} placeholder={placeholder} onChange={onSearch}/>
                <button onClick={onToggleModal}>
                    <FaPlus className="icon"/>
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
};

export default PageActions;
