import React, { useState } from 'react';
import NavMenu3D from '../three/NavMenu3D';

const menuItems = [
  { text: 'Dashboard', path: '/dashboard', icon: '📊' },
  { text: 'Employees', path: '/employees', icon: '👥' },
  { text: 'Attendance', path: '/attendance', icon: '🕒' },
  { text: 'Time Sheets', path: '/timesheets', icon: '📝' },
  { text: 'Documents', path: '/documents', icon: '📄' },
  { text: 'Salary', path: '/salary', icon: '💰' },
  { text: 'Travel', path: '/travel', icon: '✈️' },
  { text: 'Reports', path: '/reports', icon: '📈' }
];

const styleOptions = [
  { name: 'Cyber', value: 'cyber', colors: { main: '#6A0DAD', hover: '#8214ff', active: '#9643ff', glow: '#b700ff', bg: '#13131c' } },
  { name: 'Holographic', value: 'holographic', colors: { main: '#00b3ff', hover: '#00fff2', active: '#00d6ff', glow: '#00b3ff', bg: '#0f0f16' } },
  { name: 'Neon', value: 'neon', colors: { main: '#ff00e6', hover: '#ff66f5', active: '#ff33eb', glow: '#ff00e6', bg: '#13131c' } },
  { name: 'Minimal', value: 'minimal', colors: { main: '#6A0DAD', hover: '#8214ff', active: '#9643ff', glow: '#b700ff', bg: '#1a1a24' } }
];

const NavMenu3DExample = () => {
  const [selectedStyle, setSelectedStyle] = useState(styleOptions[0]);
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 glass-card mb-4">
        <h2 className="text-xl font-display mb-4 neon-text">3D Navigation Menu</h2>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px]">
            <label className="label mb-2">Style</label>
            <select 
              className="select"
              value={selectedStyle.value}
              onChange={(e) => setSelectedStyle(styleOptions.find(style => style.value === e.target.value))}
            >
              {styleOptions.map(style => (
                <option key={style.value} value={style.value}>{style.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end mb-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-primary-500 rounded focus:ring-primary-500 border-gray-600 bg-dark-400"
                checked={effectsEnabled}
                onChange={() => setEffectsEnabled(!effectsEnabled)}
              />
              <span>Enable Effects</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex-1 glass-card p-0 overflow-hidden">
        <div className="h-[500px]">
          <NavMenu3D 
            items={menuItems}
            style={selectedStyle.value}
            color={selectedStyle.colors.main}
            hoverColor={selectedStyle.colors.hover}
            activeColor={selectedStyle.colors.active}
            glowColor={selectedStyle.colors.glow}
            backgroundColor={selectedStyle.colors.bg}
            enableEffects={effectsEnabled}
          />
        </div>
      </div>
    </div>
  );
};

export default NavMenu3DExample;