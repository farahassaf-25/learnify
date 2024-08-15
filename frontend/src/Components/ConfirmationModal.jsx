import React from 'react';
import Button from './Button';

const ConfirmationModal = ({ title, description, btnText, onClose, onConfirm }) => {
    if (!onClose) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full z-10">
                <h3 className="text-lg font-bold mb-4">{title}</h3>
                <p className="mb-6">{description}</p>
                <div className="flex justify-end">
                    <Button onClick={onConfirm} className="mr-2 bg-red-600 text-white">{btnText}</Button>
                    <Button onClick={onClose} className="bg-gray-300">Close</Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
