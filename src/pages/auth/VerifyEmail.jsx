import React, { useState } from 'react';
import { authApi } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';

const VerifyEmail = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const userEmail = user?.email || '';

  const handleResend = async () => {
    setLoading(true);
    setMessage('');
    try {
      await authApi.resendVerificationEmail(userEmail);
      setMessage('Verification email sent!');
    } catch (error) {
      setMessage('Failed to send verification email.');
    } finally {
      setLoading(false);
    }
  };

  if (!userEmail) {
    return <div>No email found for the current user.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Please verify your email</h2>
      <p className="mb-4">We have sent a verification link to: <span className="font-semibold">{userEmail}</span></p>
      <button
        onClick={handleResend}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Resend Verification Email'}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default VerifyEmail; 