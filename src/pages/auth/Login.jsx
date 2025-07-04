import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import BackgroundScene from '../../components/three/BackgroundScene';
import Logo3D from '../../components/three/Logo3D';
import NeonButton from '../../components/common/NeonButton';

/**
 * Futuristic Login page with 3D elements and glassmorphic UI
 */
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setLoginError('');
    
    try {
      const result = await login(data);
      if (!result.success) {
        setLoginError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setLoginError('An unexpected error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
  {/* BackgroundScene can be removed or adapted for white background */}
  {/* <BackgroundScene className="opacity-10" /> */}

  <div className="absolute inset-0 pointer-events-none z-0"></div>

  <motion.div 
    className="max-w-md w-full z-10 p-8"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {/* <motion.div 
      className="flex justify-center mb-8"
      variants={itemVariants}
    >
      <div className="h-32 w-32 rounded-full bg-indigo-100 flex items-center justify-center shadow-md animate-pulse">
        <span className="text-4xl font-bold text-indigo-600">HR</span>
      </div>
    </motion.div> */}

    <motion.div variants={itemVariants}>
      <h2 className="text-center text-3xl font-bold text-gray-900 tracking-wider mb-2">
        HRMS ACCESS
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Enter your credentials to sign in
      </p>
    </motion.div>

    <motion.div 
      className="bg-white border border-gray-200 rounded-lg shadow-md p-6"
      variants={itemVariants}
    >
      {loginError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-md text-red-700 text-sm">
          {loginError}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            className="input w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1 block">
              Please enter a valid email
            </span>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            {...register('password', { required: true, minLength: 6 })}
            type="password"
            className="input w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1 block">
              Password must be at least 6 characters
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Link 
            to="/forgot-password" 
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition"
          >
            Forgot your password?
          </Link>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            {/* {loading ? "Authenticating..." : "Sign In"} */}
            Sign In
          </button>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register now
            </Link>
          </p>
        </div>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Didn't get the verification email?{' '}
          <Link to="/verify-email" className="text-indigo-600 hover:underline">
            Resend Verification Email
          </Link>
        </p>
      </form>
    </motion.div>
  </motion.div>
</div>

  );
};

export default Login; 