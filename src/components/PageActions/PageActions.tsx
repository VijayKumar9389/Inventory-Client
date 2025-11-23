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
}

const PageActions: React.FC<PageActionsProps> = ({onToggleModal, buttonLabel, searchTerm, onSearch, placeholder}) => {
    return (
            <div className="page-actions">
                <Input value={searchTerm} placeholder={placeholder} onChange={onSearch}/>
                <button onClick={onToggleModal}>
                    <FaPlus className="icon"/>
                    {buttonLabel}
                </button>
            </div>
    );
};

export default PageActions;
