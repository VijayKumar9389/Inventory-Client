import React, {useState, useEffect} from 'react';
import {FaPaperclip} from 'react-icons/fa';
import {HiDownload} from 'react-icons/hi';
import {ItemRecord} from '../../models/item.models';
import {deleteItemRecord} from '../../services/item.service';
import Dialog from '../Dialog/Dialog';
import EditItemRecord from '../../pages/LocationPage/components/EditItemRecord/EditItemRecord';
import ConfirmationButton from '../ConfirmationButton/ConfirmationButton';
import './RecordListItem.scss';
import axios from 'axios';
import {FaReceipt} from "react-icons/fa6";

const RecordListItem: React.FC<{ record: ItemRecord }> = ({record}) => {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const recordImage: string = record.receipt !== undefined ? record.receipt : '';

    useEffect(() => {
        const fetchImageUrl = async (): Promise<void> => {
            try {
                // Get the base URL from environment variables
                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

                if (!API_BASE_URL) {
                    throw new Error("VITE_API_BASE_URL is not defined");
                }

                const endpoint = `${API_BASE_URL}/api/images/${recordImage}`;
                const response = await axios.get(endpoint);

                if (response.status === 200) {
                    const data = response.data;
                    setImageUrl(data.url);
                } else {
                    throw new Error('Failed to fetch image URL');
                }
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };

        if (recordImage) {
            fetchImageUrl()
                .then(() => console.log('Image URL fetched successfully'));
        }

        // Cleanup function (optional)
        return (): void => {
            setImageUrl(null); // Reset image URL on component unmount
        };
    }, [recordImage]);

    const toggleEditDialog = (): void => {
        setShowEditDialog(!showEditDialog);
    };

    const handleDeleteRecord = async (): Promise<void> => {
        try {
            await deleteItemRecord(record.id);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const handleDownloadImage = async (): Promise<void> => {
        try {
            if (!imageUrl) {
                alert('Receipt image is not attached.');
                throw new Error('Image URL is not available.')
            }

            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const filename = "Receipt";
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <tr>
            <td className="record-receipt">
                <div className="receipt-icon"><FaReceipt/></div>
            </td>
            <td>
                {record.receipt ? (
                    <span className="chip green">Attached</span>
                ) : (
                    <span className="chip red">N/A</span>
                )}
            </td>
            <td>
                {record.missing ? (
                    <span className="chip red">Missing</span>
                ) : (
                    <span className="chip green">Available</span>
                )}
            </td>
            <td className="record-notes">
                {record.notes ? (
                    <p className="notes-text">{record.notes}</p>
                ) : (
                    <p className="notes-text">No Notes</p>
                )}
            </td>
            <td>
                <div className="record-item-actions">
                    <button onClick={toggleEditDialog}><FaPaperclip className="icon"/>Attach</button>
                    <button onClick={handleDownloadImage}><HiDownload className="icon"/>Download</button>
                    <ConfirmationButton
                        buttonText={"Delete"}
                        confirmationMessage={"Are you sure you want to delete this record?"}
                        onConfirm={handleDeleteRecord}
                    />
                </div>
            </td>
            <Dialog
                isOpen={showEditDialog}
                toggle={toggleEditDialog}
                heading="Edit Record"
                element={<EditItemRecord record={record}/>}
            />
        </tr>
    );
};

export default RecordListItem;
