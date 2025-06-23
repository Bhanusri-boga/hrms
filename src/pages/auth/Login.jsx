import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
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
    <div className="min-h-screen flex items-center justify-center bg-dark-600 relative overflow-hidden">
      {/* 3D animated background */}
      <BackgroundScene className="opacity-70" />
      
      {/* Glassmorphic overlay for better readability */}
      <div className="absolute inset-0 bg-dark-600 bg-opacity-30 backdrop-blur-sm z-0"></div>
      
      {/* Radial gradient for highlighting content area */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none z-0"></div>
      
      {/* Login form */}
      <motion.div 
        className="max-w-md w-full z-10 p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <div className="h-32 w-32 rounded-full bg-gradient-purple flex items-center justify-center shadow-neon-purple animate-pulse">
            <span className="text-4xl font-bold text-white">HR</span>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <h2 className="text-center text-3xl font-bold neon-text font-sans tracking-wider mb-2">
            HRMS ACCESS
          </h2>
          <p className="text-center text-gray-300 mb-8">
            Enter your credentials to sign in
          </p>
        </motion.div>
        
        <motion.div 
          className="glass-card p-6 border border-primary-500/30 shadow-neon-purple"
          variants={itemVariants}
        >
          {loginError && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-300 text-sm">
              {loginError}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </label>
              <input
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                type="email"
                className="input w-full"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-400 text-sm mt-1 block">
                  Please enter a valid email
                </span>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                {...register('password', { required: true, minLength: 6 })}
                type="password"
                className="input w-full"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-400 text-sm mt-1 block">
                  Password must be at least 6 characters
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link 
                  to="/forgot-password" 
                  className="font-medium text-primary-400 hover:text-primary-300 transition-colors duration-300"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div className="pt-2">
              {/* Neon Button for login */}
              <NeonButton
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                type="submit"
                className="animate-glow-pulse"
              >
                {loading ? "Authenticating..." : "Sign In"}
              </NeonButton>
            </div>
            
            <div className="divider-glow my-4"></div>
            
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="font-medium text-primary-400 hover:text-primary-300 transition-colors duration-300"
                >
                  Register now
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login; 