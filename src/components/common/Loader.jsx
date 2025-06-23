import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({
  size = 'md',
  variant = 'primary',
  fullScreen = false,
  text = 'Loading...',
  className = ''
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const variants = {
    primary: 'border-primary-500',
    secondary: 'border-secondary-500',
    white: 'border-white'
  };

  const spinner = (
    <div className={`animate-spin rounded-full border-2 border-t-transparent ${sizes[size]} ${variants[variant]}`} />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-4">
          {spinner}
          {text && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-sm font-medium"
            >
              {text}
            </motion.p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      {spinner}
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-500 dark:text-gray-400 text-sm"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default Loader; 