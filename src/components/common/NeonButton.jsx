import React from 'react';

/**
 * NeonButton - A button with neon glow effects
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant (primary, secondary, outline, glass, 3d)
 * @param {string} props.color - Color of the button (primary, blue, pink, green)
 * @param {string} props.size - Size of the button (sm, md, lg)
 * @param {boolean} props.fullWidth - Whether the button should take full width
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 */
const NeonButton = ({ 
  variant = 'primary', 
  color = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  onClick,
  children,
  className = '',
  ...props 
}) => {
  // Map variants to CSS classes
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    glass: 'glass hover:shadow-neon-purple',
    '3d': 'btn-3d',
  };
  
  // Map colors to CSS classes
  const colorClasses = {
    primary: {
      bg: 'bg-primary-600 hover:bg-primary-500',
      text: 'text-white',
      border: 'border-primary-500',
      glow: 'hover:shadow-neon-purple',
    },
    blue: {
      bg: 'bg-neon-blue hover:bg-blue-500',
      text: 'text-white',
      border: 'border-neon-blue',
      glow: 'hover:shadow-neon-blue',
    },
    pink: {
      bg: 'bg-neon-pink hover:bg-pink-500',
      text: 'text-white',
      border: 'border-neon-pink',
      glow: 'hover:shadow-neon-pink',
    },
    green: {
      bg: 'bg-neon-green hover:bg-green-500',
      text: 'text-dark-900',
      border: 'border-neon-green',
      glow: 'hover:shadow-neon-green',
    },
  };
  
  // Map sizes to CSS classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  // Determine the appropriate classes based on props
  const buttonClass = variantClasses[variant] || variantClasses.primary;
  const colorClass = colorClasses[color] || colorClasses.primary;
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  
  // Custom styles for specific variants
  let customClasses = '';
  
  if (variant === 'outline') {
    customClasses = `border ${colorClass.border} ${colorClass.text} hover:${colorClass.glow}`;
  } else if (variant === 'glass') {
    customClasses = `backdrop-blur-md bg-opacity-10 border border-opacity-30 ${colorClass.border} ${colorClass.text} ${colorClass.glow}`;
  } else if (variant !== '3d') {
    customClasses = `${colorClass.bg} ${colorClass.text} ${colorClass.glow}`;
  }
  
  return (
    <button
      className={`
        btn
        rounded-md
        font-medium
        transition-all
        duration-300
        ${buttonClass}
        ${sizeClass}
        ${customClasses}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeonButton;