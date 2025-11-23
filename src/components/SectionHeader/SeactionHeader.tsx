import React from "react";
import './SectionHeader.Module.scss';

const SectionHeader: React.FC<{ title: string }> = ({title}) => {
    return (
        <div className="section-header">
            <h1>{title}</h1>
        </div>
    );
};

export default SectionHeader;