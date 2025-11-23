import React, { useState, useEffect } from 'react';
import { FaPaperclip, FaReceipt } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
import { ItemRecord } from '../../models/item.models';
import { deleteItemRecord } from '../../services/item.service';
import Dialog from '../Dialog/Dialog';
import EditItemRecord from '../../pages/LocationPage/components/EditItemRecord/EditItemRecord';
import ConfirmationButton from '../ConfirmationButton/ConfirmationButton';
import './RecordListItem.Module.scss';
import axios from 'axios';

interface RecordListItemProps {
    record: ItemRecord;
}

const RecordListItem: React.FC<RecordListItemProps> = ({ record }) => {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { receipt, missing, notes } = record;

    useEffect(() => {
        if (!receipt) return;

        const fetchImageUrl = async () => {
            try {
                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
                if (!API_BASE_URL) throw new Error("VITE_API_BASE_URL is not defined");

                const endpoint = `${API_BASE_URL}/api/images/${receipt}`;
                const { data, status } = await axios.get(endpoint);

                if (status === 200) {
                    setImageUrl(data.url);
                } else {
                    throw new Error('Failed to fetch image URL');
                }
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };

        fetchImageUrl();

        return () => setImageUrl(null);
    }, [receipt]);

    const handleDownloadImage = async () => {
        if (!imageUrl) {
            alert('Receipt image is not attached.');
            return;
        }

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'Receipt';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    const handleDeleteRecord = async () => {
        try {
            await deleteItemRecord(record.id);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    return (
        <tr>
            <td className="record-receipt">
                <FaReceipt className="receipt-icon" />
            </td>
            <td>
                <span className={`chip ${receipt ? 'green' : 'red'}`}>
                    {receipt ? 'Receipt Attached' : 'Receipt N/A'}
                </span>
            </td>
            <td>
                <span className={`chip ${missing ? 'red' : 'green'}`}>
                    {missing ? 'Missing' : 'Available'}
                </span>
            </td>
            <td className="record-notes">
                <p className="notes-text">{notes || 'No Notes'}</p>
            </td>
            <td className="record-item-actions">
                <button onClick={() => setShowEditDialog(true)}>
                    <FaPaperclip className="icon" />
                    Attach
                </button>
                <button onClick={handleDownloadImage}>
                    <HiDownload className="icon" />
                    Download
                </button>
                <ConfirmationButton
                    buttonText="Delete"
                    confirmationMessage="Are you sure you want to delete this record?"
                    onConfirm={handleDeleteRecord}
                />
            </td>
            <Dialog
                isOpen={showEditDialog}
                toggle={() => setShowEditDialog(false)}
                heading="Edit Record"
                element={<EditItemRecord record={record} />}
            />
        </tr>
    );
};

export default RecordListItem;