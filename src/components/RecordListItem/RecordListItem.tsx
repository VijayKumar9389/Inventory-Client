import {FaPaperclip} from "react-icons/fa";
import {ItemRecord} from "../../models/item.models.ts";
import React from "react";
import {deleteItemRecord} from "../../services/item.service.ts";
import Dialog from "../Dialog/Dialog.tsx";
import EditItemRecord from "../../pages/LocationPage/components/EditItemRecord/EditItemRecord.tsx";
import {useState} from "react";
import {HiDownload} from "react-icons/hi";
import './RecordListItem.scss';
import ImageWithAlt from "../ImageWithAlt/ImageWithAlt.tsx";
import ConfirmationButton from "../ConfirmationButton/ConfirmationButton.tsx";

const RecordListItem: React.FC<{ record: ItemRecord }> = ({record}) => {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const recordImage: string = record.receipt !== undefined ? record.receipt : '';

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
        <li className="record-card">
            <div className="record-receipt">
                <ImageWithAlt imageName={recordImage}/>
            </div>
            <div className="record-details">
                <div className="detail">
                    <label>Receipt:</label>
                    {record.receipt ? (
                        <span className="chip green">Attached</span>
                    ) : (
                        <span className="chip red">None</span>
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
            </div>
            <div className="record-notes">
                <label>Note:</label>
                {record.notes ? (
                    <p className="notes-text">{record.notes}</p>
                ) : (
                    <p>None</p>
                )}
            </div>
            <div className="record-item-actions">
                <button onClick={toggleEditDialog}><FaPaperclip/>Attach</button>
                <button><HiDownload/>Download</button>
                <ConfirmationButton
                    buttonText={"Delete Record"}
                    confirmationMessage={"Are you sure you want to delete this record?"}
                    onConfirm={handleDeleteRecord} />
            </div>
            <Dialog
                isOpen={showEditDialog}
                toggle={toggleEditDialog}
                heading="Edit Record"
                element={<EditItemRecord record={record}/>}
            />
        </li>
    );

}

export default RecordListItem;