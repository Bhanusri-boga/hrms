import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { authApi } from '../../api/authApi';

const VerifyEmailHandler = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Verifying...');
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      authApi.verifyEmail(token)
        .then(() => setMessage('Email verified successfully! You can now log in.'))
        .catch(() => setMessage('Verification failed or token is invalid.'));
    } else {
      setMessage('No verification token found.');
    }
  }, [token]);

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmailHandler; 