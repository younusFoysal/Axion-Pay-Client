// src/ConfirmPassword.js
import React, { useState } from 'react';

const ConfirmPassword = ({ onConfirm, onCancel }) => {
    const [password, setPassword] = useState('');

    const handleConfirm = () => {
        onConfirm(password);
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="font-bold text-lg">Confirm Password</h2>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full mt-4"
                    required
                />
                <div className="modal-action">
                    <button onClick={handleConfirm} className="btn">Confirm</button>
                    <button onClick={onCancel} className="btn btn-outline">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPassword;
