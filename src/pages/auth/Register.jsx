import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { userApi } from '../../api/apiService';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch('password');
  const email = watch('email', '');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('EMPLOYEE');
  const [userLevel, setUserLevel] = useState('STANDARD');
  // const [userRoles, setUserRoles] = useState(['EMPLOYEE']);
  const allRoles = ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE'];
  const [emailExists, setEmailExists] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const handleRegister = async (formData) => {
    try {
      const payload = {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        userLevel,
        // userRoles,
        role
      };
      const user = await authApi.register(payload);
      setMessage(`Registration successful for ${user.username}! Please check your email to verify your account.`);
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      setMessage('Registration failed.');
    }
  };

  // Check if email exists when email changes
  useEffect(() => {
    let ignore = false;
    if (!email) {
      setEmailExists(false);
      return;
    }
    setCheckingEmail(true);
    userApi.existsEmail(email)
      .then(res => {
        if (!ignore) setEmailExists(res.data === true);
      })
      .catch(() => {
        if (!ignore) setEmailExists(false);
      })
      .finally(() => {
        if (!ignore) setCheckingEmail(false);
      });
    return () => { ignore = true; };
  }, [email]);

  const onSubmit = async (data) => {
    if (emailExists) {
      setMessage('This email is already registered. Please use another email or login.');
      return;
    }
    try {
      await handleRegister(data);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Create your account</h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <input
                {...register('name', { required: true })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Full Name"
              />
              {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
            </div>

            <div>
              <select
                value={userLevel}
                onChange={e => setUserLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="STANDARD">Standard</option>
                <option value="PREMIUM">Premium</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {allRoles.map(r => (
                  <option key={r} value={r}>{r.charAt(0) + r.slice(1).toLowerCase()}</option>
                ))}
              </select>
            </div>

            {/* <div>
              <select
                multiple
                value={userRoles}
                onChange={e => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value);
                  setUserRoles(selected);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm min-h-[80px]"
              >
                {allRoles.map(r => (
                  <option key={r} value={r}>{r.charAt(0) + r.slice(1).toLowerCase()}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple roles</p>
            </div> */}

            <div className="relative">
              <div className="flex gap-2">
                <input
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  className={`w-full px-3 py-2 border ${emailExists ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm`}
                  placeholder="Email address"
                />
                {email && (
                  <Link
                    to="/verify-email"
                    className="self-center text-indigo-600 text-sm hover:underline"
                  >
                    Verify Email
                  </Link>
                )}
              </div>
              {checkingEmail && <span className="text-gray-500 text-xs mt-1">Checking email...</span>}
              {emailExists && <span className="text-red-500 text-sm block mt-1">This email is already registered.</span>}
              {errors.email && (
                <span className="text-red-500 text-sm block mt-1">Please enter a valid email</span>
              )}
            </div>

            <div>
              <input
                {...register('password', { required: true, minLength: 6 })}
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">Password must be at least 6 characters</span>
              )}
            </div>

            <div>
              <input
                {...register('confirmPassword', {
                  required: true,
                  validate: value => value === password || 'Passwords do not match'
                })}
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm"
            disabled={emailExists || checkingEmail}
          >
            Register
          </button>

          <div className="text-sm text-center">
            <Link to="/login" className="text-indigo-600 hover:underline">
              Already have an account? Sign in
            </Link>
          </div>

          <p className="mt-4 text-sm text-center">
            Didn't receive the verification email?{' '}
            <Link to="/verify-email" className="text-indigo-600 hover:underline">
              Resend Verification Email
            </Link>
          </p>

          {message && <p className="text-center text-sm text-gray-600 mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
