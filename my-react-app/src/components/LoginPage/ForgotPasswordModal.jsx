// ForgotPasswordModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { auth, db } from '../../firebase/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        padding: '20px',
    },
};

// Modal.setAppElement('#root'); // Important for accessibility

export default function ForgotPasswordModal({ isOpen, onRequestClose }) {
    const [resetEmail, setResetEmail] = useState('');
    const [firebaseError, setFirebaseError] = useState(null);

    const handleForgotPassword = () => {
        if (resetEmail) {
            sendPasswordResetEmail(auth, resetEmail)
                .then(() => {
                    alert('Password reset email sent!');
                    onRequestClose(); // Close modal after success
                })
                .catch((error) => {
                    setFirebaseError(error.message);
                });
        } else {
            alert('Please enter your email address.');
        }
    };

    return (
        <Modal
            isOpen={isOpen}//visibility
            onRequestClose={onRequestClose}//close modal
            style={customStyles}
            contentLabel="Forgot Password Modal"//Purpose of modal
        >
            <h2>Reset Password</h2>
            {firebaseError && <div className="error">{firebaseError}</div>}
            <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <button onClick={handleForgotPassword} className="btn btn-primary" style={{ width: "100%" }}>Send Reset Link</button>
            <button onClick={onRequestClose} className="btn btn-secondary" style={{ width: "100%", marginTop: '5px' }}>Cancel</button>
        </Modal>
    );
}