import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/common/GlassCard';
import {
  UsersIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  UserPlusIcon,
  CalendarIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  Squares2X2Icon,
  ArrowPathIcon,
  CurrencyDollarIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import HasRole from '../components/common/HasRole';

const cardBgColors = [
  'bg-green-50',     // Task Box
  'bg-blue-50',      // Employees
  'bg-purple-50',    // Vibe
  'bg-pink-50',      // Attendance
  'bg-yellow-50',    // Leave
  'bg-indigo-50',    // HR Policies
  'bg-rose-50',      // HR Documents
  'bg-orange-50',    // Calendar
  'bg-cyan-50',      // Performance
  'bg-teal-50',      // Org View
  'bg-fuchsia-50',   // Flows
  'bg-emerald-50',   // Time Sheets
  'bg-amber-50',     // Salary
  'bg-sky-50',       // Travel
  'bg-violet-50',    // Reports
  'bg-purple-50',    // 3D Demo
];

const appModules = [
  
  { 
    label: 'Employees', 
    icon: <UsersIcon className="w-5 h-5 text-blue-600" />, 
    path: '/employees' 
  },
  { 
    label: 'Vibe', 
    icon: <ChatBubbleLeftRightIcon className="w-5 h-5 text-purple-600" />, 
    path: '/vibe' 
  },
  { 
    label: 'Attendance', 
    icon: <ClockIcon className="w-5 h-5 text-pink-600" />, 
    path: '/attendance',
    badge: 'Time is Evolving!' 
  },
  { 
    label: 'Leave', 
    icon: <BriefcaseIcon className="w-5 h-5 text-yellow-600" />, 
    path: '/leave' 
  },
  { 
    label: 'HR Policies', 
    icon: <DocumentTextIcon className="w-5 h-5 text-indigo-600" />, 
    path: '/policies' 
  },
  { 
    label: 'HR Documents', 
    icon: <FolderIcon className="w-5 h-5 text-rose-600" />, 
    path: '/documents' 
  },
  { 
    label: 'Calendar', 
    icon: <CalendarIcon className="w-5 h-5 text-orange-600" />, 
    path: '/calendar' 
  },
  { 
    label: 'Performance', 
    icon: <ChartBarIcon className="w-5 h-5 text-cyan-600" />, 
    path: '/performance' 
  },
  { 
    label: 'Org View', 
    icon: <Squares2X2Icon className="w-5 h-5 text-teal-600" />, 
    path: '/org' 
  },
  { 
    label: 'Flows', 
    icon: <ArrowPathIcon className="w-5 h-5 text-fuchsia-600" />, 
    path: '/flows' 
  },
  { 
    label: 'Time Sheets', 
    icon: <DocumentTextIcon className="w-5 h-5 text-emerald-600" />, 
    path: '/timesheets' 
  },
  { 
    label: 'Salary', 
    icon: <CurrencyDollarIcon className="w-5 h-5 text-amber-600" />, 
    path: '/salary' 
  },
  { 
    label: 'Travel', 
    icon: <PaperAirplaneIcon className="w-5 h-5 text-sky-600" />, 
    path: '/travel' 
  },
  { 
    label: 'Reports', 
    icon: <ChartBarIcon className="w-5 h-5 text-violet-600" />, 
    path: '/reports' 
  },
  { 
    label: '3D Demo', 
    icon: <Squares2X2Icon className="w-5 h-5 text-purple-600" />, 
    path: '/nav-menu-3d-demo' 
  },
];

// Add descriptions for each module
const moduleDescriptions = {
  'Task Box': 'Manage and track daily tasks',
  'Employees': 'Manage employee profiles, information, and records',
  'Vibe': 'Track company culture and engagement',
  'Attendance': 'Track employee attendance and time records',
  'Leave': 'Handle employee leave requests and approvals',
  'HR Policies': 'Access and manage HR policies and guidelines',
  'HR Documents': 'Store and manage employee documents',
  'Calendar': 'View and manage company events',
  'Performance': 'Track and evaluate employee performance',
  'Org View': 'View organizational structure and hierarchy',
  'Flows': 'Manage workflow and processes',
  'Time Sheets': 'Track and manage employee time sheets',
  'Salary': 'Manage employee salaries and compensation',
  'Travel': 'Handle travel requests and expenses',
  'Reports': 'Generate and view various reports',
  // '3D Demo': 'Experience 3D visualization features'
};

const AppGridCard = ({ icon, label, badge, path, bgColor }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl ${bgColor} border border-white/20 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-105`}
      onClick={() => navigate(path)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-shrink-0 p-3 rounded-xl bg-white/90 shadow-sm group-hover:scale-110 transition-transform duration-300">
            {React.cloneElement(icon, { className: "w-6 h-6" })}
          </div>
          {badge && (
            <span className="text-xs bg-indigo-500/20 text-indigo-700 px-3 py-1 rounded-full font-medium">
              {badge}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-gray-800 text-lg mb-2 group-hover:text-gray-900 transition-colors">
          {label}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {moduleDescriptions[label]}
        </p>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
};

const SceneLoader = () => (
  <div className="flex justify-center items-center h-full w-full min-h-[200px]">
    <p className="font-display text-lg text-indigo-500 animate-pulse">Loading...</p>
  </div>
);

const DashboardCard = ({ title, value, icon, trend, color = 'indigo' }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`p-3 rounded-xl bg-gradient-to-r ${color} text-white`}>
        {icon}
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center">
        <ArrowTrendingUpIcon className="w-4 h-4 text-emerald-500 mr-1" />
        <span className="text-sm text-emerald-600 font-medium">{trend}</span>
      </div>
    )}
  </div>
);

const QuickActionButton = ({ 
  // eslint-disable-next-line no-unused-vars
  icon: Icon, 
  label, 
  onClick 
}) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 p-3 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
  >
    <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{label}</span>
  </button>
);

const ActivityItem = ({ title, time, type }) => (
  <div className="flex items-start space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
    <div className="flex-shrink-0">
      <div className="w-2 h-2 mt-1.5 rounded-full bg-indigo-500"></div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-gray-900 dark:text-white">{title}</p>
      <p className="text-xxs text-gray-500 dark:text-gray-400 mt-0.5">{time}</p>
    </div>
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xxs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
      {type}
    </span>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const dashboardStats = [
    {
      title: 'Total Workforce',
      value: '248',
      icon: <UsersIcon className="w-6 h-6" />,
      trend: '+3.5%',
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Personnel',
      value: '235',
      icon: <ClockIcon className="w-6 h-6" />,
      trend: '94.7%',
      color: 'from-emerald-500 to-emerald-600',
      textColor: 'text-emerald-600'
    },
    {
      title: 'Departments',
      value: '12',
      icon: <BuildingOfficeIcon className="w-6 h-6" />,
      trend: '+1 this month',
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600'
    },
    {
      title: 'New Hires',
      value: '8',
      icon: <UserPlusIcon className="w-6 h-6" />,
      trend: '+2 this week',
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600'
    },
  ];

  const quickActions = [
    { icon: CalendarIcon, label: 'Mark Attendance', onClick: () => navigate('/attendance') },
    { icon: DocumentTextIcon, label: 'Submit Timesheet', onClick: () => navigate('/timesheets') },
    { icon: ChartBarIcon, label: 'View Reports', onClick: () => navigate('/reports') },
  ];

  const recentActivities = [
    { title: 'New employee joined', time: '2 hours ago', type: 'Hiring', status: 'success' },
    { title: 'Monthly report generated', time: '4 hours ago', type: 'Report', status: 'info' },
    { title: 'Team meeting scheduled', time: '5 hours ago', type: 'Meeting', status: 'warning' },
    { title: 'System update completed', time: '1 day ago', type: 'System', status: 'success' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
            <p className="text-indigo-100 text-lg">
              Here's what's happening in your organization today
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-sm text-indigo-100">Today's Date</p>
              <p className="text-xl font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                {stat.trend && (
                  <div className="flex items-center mt-2">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-emerald-500 mr-1" />
                    <span className="text-sm text-emerald-600 font-medium">{stat.trend}</span>
                  </div>
                )}
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
                {React.cloneElement(stat.icon, { className: "w-6 h-6 text-white" })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* App Modules Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Access</h2>
            <p className="text-gray-600">Access your most used modules</p>
          </div>
          <div className="mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search modules..."
              className="w-full md:w-80 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appModules.map((mod, idx) => (
            <AppGridCard
              key={mod.label}
              icon={mod.icon}
              label={mod.label}
              badge={mod.badge}
              path={mod.path}
              bgColor={cardBgColors[idx % cardBgColors.length]}
            />
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            <button className="text-indigo-600 hover:text-indigo-500 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.status === 'success' ? 'bg-emerald-100' :
                  activity.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'success' ? 'bg-emerald-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'success' ? 'bg-emerald-50 text-emerald-700' :
                  activity.status === 'warning' ? 'bg-yellow-50 text-yellow-700' : 'bg-blue-50 text-blue-700'
                }`}>
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="w-full flex items-center space-x-3 p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 text-left group"
              >
                <div className="flex-shrink-0 p-2 rounded-lg bg-white group-hover:bg-indigo-100 transition-colors">
                  <action.icon className="w-5 h-5 text-gray-600 group-hover:text-indigo-600" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-indigo-600">{action.label}</span>
              </button>
            ))}
            <HasRole roles={['ADMIN', 'HR']}>
              <button
                onClick={() => navigate('/settings')}
                className="w-full flex items-center space-x-3 p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 text-left group"
              >
                <div className="flex-shrink-0 p-2 rounded-lg bg-white group-hover:bg-indigo-100 transition-colors">
                  <CogIcon className="w-5 h-5 text-gray-600 group-hover:text-indigo-600" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-indigo-600">Settings</span>
              </button>
            </HasRole>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;