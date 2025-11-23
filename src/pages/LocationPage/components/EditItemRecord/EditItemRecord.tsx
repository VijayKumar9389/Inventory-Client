import React, {useState, ChangeEvent, FormEvent} from 'react';
import {updateItemRecord} from "../../../../services/item.service.ts";
import {ItemRecord, UpdateItemRecordInput} from "../../../../models/item.models.ts";
import ImageWithAlt from "../../../../components/ImageWithAlt/ImageWithAlt.tsx";
import './EditItemRecord.scss';

const EditItemRecord: React.FC<{ record: ItemRecord }> = ({record}) => {
    const [editedRecord, setEditedRecord] = useState({
        notes: record.notes || '',
        receipt: null as File | null,
        missing: record.missing || false,
    });

    const recordImage: string = record.receipt !== undefined ? record.receipt : '';

    const handleEditItemRecord = async (): Promise<void> => {
        try {
            const formData = new FormData();
            formData.append('notes', editedRecord.notes);
            if (editedRecord.receipt) {
                formData.append('receipt', editedRecord.receipt);
            }
            formData.append('missing', String(editedRecord.missing));

            const updateData: UpdateItemRecordInput = {
                notes: editedRecord.notes,
                receipt: editedRecord.receipt,
                missing: editedRecord.missing,
            };

            const updatedItemRecord: ItemRecord = await updateItemRecord(record.id, updateData);
            console.log('Item record updated:', updatedItemRecord);
            window.location.reload();
        } catch (error) {
            console.error('Error updating item record:', error);
            // Provide user feedback for error handling
        }
    };

    const handleInputChange = (field: keyof typeof editedRecord, value: string | boolean): void => {
        setEditedRecord(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setEditedRecord(prevState => ({
                ...prevState,
                receipt: files[0],
            }));
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        handleEditItemRecord()
            .then(() => console.log('Item record updated successfully'));
    };

    return (
        <div className="form-column">
            <div className="image-container">
                {editedRecord.receipt ? (
                    <img src={URL.createObjectURL(editedRecord.receipt)} alt={'Receipt'}/>
                ) : (
                    <ImageWithAlt imageName={recordImage}/>
                )}
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="image">Receipt:</label>
                    <input
                        className="form-input file-input"
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="notes">Notes:</label>
                    <textarea
                        className="form-input"
                        id="notes"
                        value={editedRecord.notes}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('notes', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="missing">Missing:</label>
                    <input
                        className="form-checkbox"
                        type="checkbox"
                        id="missing"
                        checked={editedRecord.missing}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('missing', e.target.checked)}
                    />
                </div>
                <div className="btn-container">
                    <button className="form-button" type="submit">Update</button>
                </div>
            </form>
        </div>
    );
};

export default EditItemRecord;
