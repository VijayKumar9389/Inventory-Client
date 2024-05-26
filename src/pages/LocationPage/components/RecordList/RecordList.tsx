// RecordList.tsx
import React from 'react';
import {ItemRecord} from "../../../../models/item.models.ts";
import RecordListItem from "./RecordListItem.tsx";

const RecordList: React.FC<{ records: ItemRecord[] }> = ({records}) => {

    return (
        <ul className="itemrecord-list">
            {records.map((record) => (
                <RecordListItem key={record.id} record={record}/>
            ))}
        </ul>
    );
};

export default RecordList;
