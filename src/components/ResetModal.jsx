import React from 'react';

export default function ResetModal({ isOpen, onClose, onConfirm, checkIcon, timesIcon }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg text-center">
                <button 
                    className="absolute top-4 right-4 text-4xl text-gray-400"
                    onClick={onClose}
                >
                    &times;
                </button>
                <p className="text-white text-9xl mb-8">Reset?</p>
                <div className="flex justify-center space-x-8">
                    <button 
                        className="bg-green-600 w-48 h-48 rounded-lg flex items-center justify-center"
                        onClick={onConfirm}
                    >
                        <img src={checkIcon} alt="Confirm" className="w-24 h-24" />
                    </button>
                    <button 
                        className="bg-red-600 w-48 h-48 rounded-lg flex items-center justify-center"
                        onClick={onClose}
                    >
                        <img src={timesIcon} alt="Cancel" className="w-24 h-24" />
                    </button>
                </div>
            </div>
        </div>
    );
}