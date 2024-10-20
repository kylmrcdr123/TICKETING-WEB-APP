import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import '../styles/OTP.css';
import logo from '../assets/loge_new 2.png';

const OtpForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state || {};
    const [otp, setOtp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = { otp, username };

            const response = await Axios.post('http://localhost:8080/user/verify-otp', payload);
            if (response.status === 200) {
                setMessage('OTP verified successfully!');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page
                }, 2000);
            } else {
                setMessage('Invalid OTP.');
                setIsSubmitting(false);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred while verifying OTP.');
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/login'); // Navigate back to the login page when cancel is clicked
    };

    return (
        <div className="semi-body">
            <div className="logo-container">
                <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div className="otp-form">
                <form onSubmit={handleSubmit}>
                    <label>Enter OTP:</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        disabled={isSubmitting}
                        required
                    />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Verify OTP'}
                    </button>
                    {message && <p>{message}</p>}
                </form>
                {/* Cancel link */}
                <p className="cancel-link" onClick={handleCancel} style={{ cursor: 'pointer', color: '#007bff' }}>
                    Cancel
                </p>
            </div>
        </div>
    );
};

export default OtpForm;
