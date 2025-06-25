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
const GlassCard = ({ children, className = '', ...props }) => (
  <div className={`card ${className}`} {...props}>
    {children}
  </div>
);

export default GlassCard;