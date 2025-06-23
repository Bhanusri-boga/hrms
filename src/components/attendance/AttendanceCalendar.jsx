import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { formatDate } from '../../utils/formatUtils';

const AttendanceCalendar = ({ attendance, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAttendanceStatus = (date) => {
    const record = attendance?.find(
      (record) => formatDate(record.date) === formatDate(date)
    );
    return record?.status || 'no_record';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'half_day':
        return 'bg-blue-100 text-blue-800';
      case 'leave':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ←
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}

        {days.map((day) => {
          const status = getAttendanceStatus(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);

          return (
            <button
              key={day.toString()}
              onClick={() => onDateClick(day)}
              className={`relative p-4 bg-white hover:bg-gray-50 ${
                !isCurrentMonth ? 'text-gray-400' : ''
              } ${isCurrentDay ? 'ring-2 ring-blue-500' : ''}`}
            >
              <time dateTime={format(day, 'yyyy-MM-dd')}>
                {format(day, 'd')}
              </time>
              <span
                className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${getStatusColor(
                  status
                )}`}
              />
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-green-100 rounded-full mr-2" />
            <span className="text-sm text-gray-600">Present</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-red-100 rounded-full mr-2" />
            <span className="text-sm text-gray-600">Absent</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-yellow-100 rounded-full mr-2" />
            <span className="text-sm text-gray-600">Late</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-blue-100 rounded-full mr-2" />
            <span className="text-sm text-gray-600">Half Day</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-purple-100 rounded-full mr-2" />
            <span className="text-sm text-gray-600">Leave</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar; 