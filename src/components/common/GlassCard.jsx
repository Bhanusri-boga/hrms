import React from 'react';

/**
 * GlassCard - A glassmorphic card component with neon border effects
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.glowColor - Color of the glow effect (primary, blue, pink, green)
 * @param {boolean} props.hoverable - Whether the card should have hover effects
 * @param {boolean} props.bordered - Whether the card should have a border
 * @param {function} props.onClick - Click handler
 */
const GlassCard = ({ 
  title, 
  children, 
  className = '', 
  glowColor = 'primary',
  hoverable = false,
  bordered = false,
  onClick,
  ...props 
}) => {
  // Map color names to CSS classes
  const glowClasses = {
    primary: 'hover:shadow-neon-purple border-primary-500/50 hover:border-primary-400',
    blue: 'hover:shadow-neon-blue border-neon-blue/50 hover:border-neon-blue',
    pink: 'hover:shadow-neon-pink border-neon-pink/50 hover:border-neon-pink',
    green: 'hover:shadow-neon-green border-neon-green/50 hover:border-neon-green',
  };
  
  // Determine the appropriate glow class
  const glowClass = glowClasses[glowColor] || glowClasses.primary;
  
  return (
    <div 
      className={`
        glass-card 
        transition-all duration-300 ease-in-out
        ${bordered ? 'border border-opacity-30' : ''}
        ${hoverable ? `cursor-pointer ${glowClass}` : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {title && (
        <div className="px-3 py-2 border-b border-dark-300/50">
          <h3 className="text-sm font-medium text-white">{title}</h3>
        </div>
      )}
      <div className={`${title ? '' : 'p-3'}`}>
        {children}
      </div>
    </div>
  );
};

export default GlassCard;