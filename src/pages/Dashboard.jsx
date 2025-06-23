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
} from '@heroicons/react/24/outline';

const appModules = [
  { label: 'Task Box', icon: <ClipboardDocumentListIcon className="w-5 h-5 text-green-600" />, path: '/tasks' },
  { label: 'Employees', icon: <UsersIcon className="w-5 h-5 text-blue-600" />, path: '/employees' },
  { label: 'Vibe', icon: <ChatBubbleLeftRightIcon className="w-5 h-5 text-purple-600" />, path: '/vibe' },
  { label: 'Attendance', icon: <ClockIcon className="w-5 h-5 text-red-600" />, path: '/attendance', badge: 'Time is Evolving!' },
  { label: 'Leave', icon: <BriefcaseIcon className="w-5 h-5 text-yellow-600" />, path: '/leave' },
  { label: 'HR Policies', icon: <DocumentTextIcon className="w-5 h-5 text-indigo-600" />, path: '/policies' },
  { label: 'HR Documents', icon: <FolderIcon className="w-5 h-5 text-pink-600" />, path: '/documents' },
  { label: 'Calendar', icon: <CalendarIcon className="w-5 h-5 text-orange-600" />, path: '/calendar' },
  { label: 'Performance', icon: <ChartBarIcon className="w-5 h-5 text-cyan-600" />, path: '/performance' },
  { label: 'Org View', icon: <Squares2X2Icon className="w-5 h-5 text-teal-600" />, path: '/org' },
  { label: 'Flows', icon: <ArrowPathIcon className="w-5 h-5 text-fuchsia-600" />, path: '/flows' },
];

const AppGridCard = ({ icon, label, badge, path }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-md p-3 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition group relative"
      onClick={() => navigate(path)}
    >
      <div className="mb-2">{icon}</div>
      <div className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-center text-xs">{label}</div>
      {badge && <span className="mt-1 text-xxs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded absolute top-2 right-2">{badge}</span>}
    </div>
  );
};

const SceneLoader = () => (
  <div className="flex justify-center items-center h-full w-full min-h-[200px]">
    <p className="font-display text-lg text-indigo-500 animate-pulse">Loading...</p>
  </div>
);

const DashboardCard = ({ title, value, icon, trend, color = 'indigo' }) => (
  <GlassCard className="p-4 flex flex-col hover:scale-105 transition-transform duration-200">
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
        <p className="text-xl font-bold mt-2 text-gray-900 dark:text-white">{value}</p>
      </div>
      <div className={`p-2 rounded-lg bg-${color}-50 dark:bg-${color}-900/50`}>
        {icon}
      </div>
    </div>
    {trend && (
      <div className="mt-3 flex items-center text-xs">
        <ArrowTrendingUpIcon className="w-3 h-3 mr-1 text-emerald-500" />
        <span className="text-emerald-500">{trend}</span>
      </div>
    )}
  </GlassCard>
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
  const { user } = useAuth();

  const dashboardStats = [
    {
      title: 'Total Workforce',
      value: '248',
      icon: <UsersIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      trend: '+3.5%',
      color: 'indigo'
    },
    {
      title: 'Active Personnel',
      value: '235',
      icon: <ClockIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      trend: '94.7%',
      color: 'emerald'
    },
    {
      title: 'Departments',
      value: '12',
      icon: <BuildingOfficeIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      trend: '+1 this month',
      color: 'blue'
    },
    {
      title: 'New Hires',
      value: '8',
      icon: <UserPlusIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      trend: '+2 this week',
      color: 'purple'
    },
  ];

  const quickActions = [
    { icon: CalendarIcon, label: 'Mark Attendance', onClick: () => {} },
    { icon: DocumentTextIcon, label: 'Submit Timesheet', onClick: () => {} },
    { icon: ChartBarIcon, label: 'View Reports', onClick: () => {} },
    { icon: CogIcon, label: 'Settings', onClick: () => {} },
  ];

  const recentActivities = [
    { title: 'New employee joined', time: '2 hours ago', type: 'Hiring' },
    { title: 'Monthly report generated', time: '4 hours ago', type: 'Report' },
    { title: 'Team meeting scheduled', time: '5 hours ago', type: 'Meeting' },
    { title: 'System update completed', time: '1 day ago', type: 'System' },
  ];

  return (
    <div className="container mx-auto px-3 py-5">
      {/* App Grid Section */}
      <div className="mb-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 gap-2">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">My Access</h2>
          <input
            type="text "
            placeholder="Search by Employee Name, Designation, etc."
            className="w-full md:w-48 p-2 text-xs border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-5 gap-12">
          {appModules.map((mod) => (
            <AppGridCard
              key={mod.label}
              icon={mod.icon}
              label={mod.label}
              badge={mod.badge}
              path={mod.path}
            />
          ))}
        </div>
      </div>

      {/* Existing dashboard content below */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-sm font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name || 'User'}
          </h1>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
            Here's what's happening in your organization today
          </p>
        </div>
        <button className="p-1 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
          <BellIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {dashboardStats.map((state, index) => (
          <DashboardCard key={index} {...state} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <GlassCard className="p-3">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
              View all
            </button>
          </div>
          <div className="space-y-2">
            {recentActivities.map((activity, index) => (
              <ActivityItem key={index} {...activity} />
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-3">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
            <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
              More
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <QuickActionButton key={index} {...action} />
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;