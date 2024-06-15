import React from 'react';
import {Stat} from "../../models/user.models.ts";
import "./StatList.scss";

const StatList: React.FC<{stats: Stat[]}> = ({ stats }) => {
    return (
        <div className="stat-list">
            {stats.map((stat: Stat, index: number) => (
                <div key={index} className="stat">
                    <p className="stat-label">{stat.label}</p>
                    <strong className="stat-value">{stat.value}</strong>
                </div>
            ))}
        </div>
    );
};

export default StatList;
