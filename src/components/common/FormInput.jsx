import React, { forwardRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
// eslint-disable-next-line no-unused-vars
import { useSpring, animated } from '@react-spring/three';

const FormInput = forwardRef(({
  label,
  name,
  type = 'text',
  error,
  className = '',
  required = false,
  disabled = false,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const glowAnimation = useSpring({
    boxShadow: isFocused
      ? '0 0 15px rgba(106, 13, 173, 0.3), 0 0 30px rgba(106, 13, 173, 0.2), inset 0 0 10px rgba(106, 13, 173, 0.1)'
      : '0 0 0 rgba(106, 13, 173, 0)',
  });

  const inputClasses = `
    block w-full rounded-lg px-4 py-3 
    transition-all duration-300 ease-in-out
    ${error
      ? 'border-red-400 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
      : 'border border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500'
    }
    ${disabled 
      ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' 
      : 'bg-white dark:bg-gray-800'
    }
    ${isFocused 
      ? 'transform scale-[1.02] shadow-lg' 
      : 'transform scale-100'
    }
    text-gray-900 dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
    hover:bg-gray-50 dark:hover:bg-gray-700
  `;

  const labelVariants = {
    focused: { 
      y: -25,
      scale: 0.85,
      color: '#6A0DAD',
    },
    blurred: { 
      y: -25,
      scale: 0.85,
      color: 'blackS',
    }
  };

  return (
    <div className={`${className} relative pt-6`}>
      <motion.div
        className="relative"
        style={glowAnimation}
      >
        {label && (
          <motion.label
            htmlFor={name}
            className="absolute left-4 font-medium transition-all duration-200 pointer-events-none"
            initial="blurred"
            animate={isFocused ? "focused" : "blurred"}
            variants={labelVariants}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </motion.label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={type}
            name={name}
            id={name}
            disabled={disabled}
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${name}-error` : undefined}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <svg
                  className="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-red-500 font-medium"
            id={`${name}-error`}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;