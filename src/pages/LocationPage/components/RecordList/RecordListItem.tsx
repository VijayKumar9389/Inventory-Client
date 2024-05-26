import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {ItemRecord} from "../../../../models/item.models";
import React from "react";
import {deleteItemRecord} from "../../../../services/item.service.ts";
import Dialog from "../../../../components/Dialog/Dialog.tsx";
import EditItemRecord from "../EditItemRecord/EditItemRecord.tsx";
import {useState} from "react";
import {HiDownload} from "react-icons/hi";

const RecordListItem: React.FC<{ record: ItemRecord }> = ({record}) => {

    const [showEditDialog, setShowEditDialog] = useState(false);

    const toggleEditDialog = (): void => {
        setShowEditDialog(!showEditDialog);
    }

    const handleDeleteRecord = async (): Promise<void> => {
        try {
            await deleteItemRecord(record.id);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    }

    return (
        <li>
            <div className="record-card">
                <Dialog isOpen={showEditDialog} element={<EditItemRecord record={record}/>} toggle={toggleEditDialog} heading="Edit Record"/>
                <div className="record-details">
                    <div className="detail">
                        <label>Receipt:</label>
                        {record.receipt ? (
                            <span className="chip green">Attached</span>
                        ) : (
                            <span className="chip red">No Receipt</span>
                        )}
                    </div>
                    <div className="detail">
                        <label>Status:</label>
                        {record.missing ? (
                            <span className="chip red">Missing</span>
                        ) : (
                            <span className="chip green">Available</span>
                        )}
                    </div>
                    <div className="detail">
                        <label>Notes:</label>
                        {record.notes ? (
                            <p>{record.notes}</p>
                        ) : (
                            <span className="chip red">None</span>
                        )}
                    </div>
                </div>
                <div className="record-actions">
                    <button onClick={() => toggleEditDialog()}><FaEdit/></button>
                    <button><HiDownload/></button>
                    <button onClick={() => handleDeleteRecord()}><MdDelete/></button>
                </div>
            </div>
        </li>
    );

}

export default RecordListItem;