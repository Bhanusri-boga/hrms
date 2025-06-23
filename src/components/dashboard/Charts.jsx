import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { colors } from '../../design/DesignSystem';

// Custom tooltip component with glassmorphism
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3">
        <p className="text-sm font-display text-white mb-1">{label}</p>
        {payload.map((item, index) => (
          <p key={index} className="text-sm" style={{ color: item.color }}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Charts = ({ attendanceData, departmentData }) => {
  // Chart style configuration
  const chartConfig = {
    stroke: colors.primary[600],
    fill: colors.primary[500],
    gradient: [colors.primary[600], colors.futuristic.glowPurple],
    gridColor: colors.dark[400],
    textColor: '#ffffff'
  };

  // Department chart colors
  const deptColors = [
    colors.primary[600],
    colors.futuristic.glowCyan,
    colors.futuristic.energyBlue,
    colors.futuristic.plasmaViolet,
    colors.futuristic.digitalGreen
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Attendance Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 hover:shadow-neon-purple transition-shadow duration-300"
      >
        <h3 className="text-lg font-display text-white mb-4 neon-text">
          Attendance Trend
        </h3>
        <div className="h-80 relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfig.gradient[0]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={chartConfig.gradient[1]} stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} opacity={0.3} />
              <XAxis dataKey="date" stroke={chartConfig.textColor} tick={{ fill: chartConfig.textColor }} />
              <YAxis stroke={chartConfig.textColor} tick={{ fill: chartConfig.textColor }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: chartConfig.textColor }} />
              <Line
                type="monotone"
                dataKey="present"
                stroke={chartConfig.stroke}
                strokeWidth={2}
                dot={{ fill: chartConfig.stroke }}
                activeDot={{ r: 8, fill: colors.futuristic.glowPurple }}
                fill="url(#attendanceGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary-600/5 to-transparent" />
        </div>
      </motion.div>

      {/* Department Distribution Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 hover:shadow-neon-purple transition-shadow duration-300"
      >
        <h3 className="text-lg font-display text-white mb-4 neon-text">
          Department Distribution
        </h3>
        <div className="h-80 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={deptColors[index % deptColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="middle" 
                align="right"
                layout="vertical"
                wrapperStyle={{ color: chartConfig.textColor }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary-600/5 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
};

export default Charts;