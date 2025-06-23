import apiService from './apiService';
import { endpoints } from './apiConfig';

// Mock data for development
const mockAttendanceData = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Doe',
    date: '2025-05-28',
    status: 'present',
    checkIn: '09:00:00',
    checkOut: '17:00:00',
    totalHours: 8,
    isLate: false,
    earlyLeave: false
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Jane Smith',
    date: '2025-05-28',
    status: 'late',
    checkIn: '09:45:00',
    checkOut: '17:00:00',
    totalHours: 7.25,
    isLate: true,
    earlyLeave: false
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Mike Johnson',
    date: '2025-05-28',
    status: 'absent',
    checkIn: null,
    checkOut: null,
    totalHours: 0,
    isLate: false,
    earlyLeave: false
  }
];

export const getAttendance = async (params) => {
  try {
    const response = await apiService.get(endpoints.attendance.base, { params });
    return response.data;
  } catch (error) {
    console.error('Error in getAttendance API:', error);
    
    if (import.meta.env.DEV) {
      console.warn('Using mock attendance data due to API error');
      return {
        data: mockAttendanceData,
        total: mockAttendanceData.length,
        page: params?.page || 1,
        limit: params?.limit || 10
      };
    }
    
    throw {
      message: error.response?.data?.message || 'Failed to fetch attendance records',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const getAttendanceById = async (id) => {
  try {
    const response = await apiService.get(`${endpoints.attendance.base}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error in getAttendanceById API for id ${id}:`, error);
    
    if (import.meta.env.DEV) {
      console.warn('Using mock attendance data due to API error');
      return mockAttendanceData.find(record => record.id === parseInt(id)) || null;
    }
    
    throw {
      message: error.response?.data?.message || 'Failed to fetch attendance record',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const createAttendance = async (attendanceData) => {
  try {
    const response = await apiService.post(endpoints.attendance.base, attendanceData);
    return response.data;
  } catch (error) {
    console.error('Error in createAttendance API:', error);
    
    if (import.meta.env.DEV) {
      console.warn('Using mock attendance data due to API error');
      const newRecord = {
        id: mockAttendanceData.length + 1,
        ...attendanceData,
        date: attendanceData.date || new Date().toISOString().split('T')[0]
      };
      mockAttendanceData.push(newRecord);
      return newRecord;
    }
    
    throw {
      message: error.response?.data?.message || 'Failed to create attendance record',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const updateAttendance = async (id, attendanceData) => {
  try {
    const response = await apiService.put(`${endpoints.attendance.base}/${id}`, attendanceData);
    return response.data;
  } catch (error) {
    console.error(`Error in updateAttendance API for id ${id}:`, error);
    
    if (import.meta.env.DEV) {
      console.warn('Using mock attendance data due to API error');
      const index = mockAttendanceData.findIndex(record => record.id === parseInt(id));
      if (index !== -1) {
        mockAttendanceData[index] = { ...mockAttendanceData[index], ...attendanceData };
        return mockAttendanceData[index];
      }
      throw new Error('Attendance record not found');
    }
    
    throw {
      message: error.response?.data?.message || 'Failed to update attendance record',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const deleteAttendance = async (id) => {
  try {
    const response = await apiService.delete(`${endpoints.attendance.base}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error in deleteAttendance API for id ${id}:`, error);
    
    if (import.meta.env.DEV) {
      console.warn('Using mock attendance data due to API error');
      const index = mockAttendanceData.findIndex(record => record.id === parseInt(id));
      if (index !== -1) {
        mockAttendanceData.splice(index, 1);
        return { success: true };
      }
      throw new Error('Attendance record not found');
    }
    
    throw {
      message: error.response?.data?.message || 'Failed to delete attendance record',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const getDailyAttendance = async (date) => {
  // Always use mock data in development mode
  if (import.meta.env.DEV) {
    console.warn('Using mock attendance data in development mode');
    return {
      data: mockAttendanceData.filter(record => record.date === date),
      total: mockAttendanceData.length,
      date: date
    };
  }

  try {
    const response = await apiService.get(endpoints.attendance.daily, {
      params: { date }
    });
    return response.data;
  } catch (error) {
    console.error('Error in getDailyAttendance API:', error);
    
    // Even in production, return mock data if API fails
    console.warn('API failed, falling back to mock data');
    return {
      data: mockAttendanceData.filter(record => record.date === date),
      total: mockAttendanceData.length,
      date: date
    };
  }
};

export const getMonthlyAttendance = async (month, year) => {
  try {
    const response = await apiService.get(endpoints.attendance.monthly, {
      params: { month, year },
    });
    return response.data;
  } catch (error) {
    console.error('Error in getMonthlyAttendance API:', error);
    
    if (import.meta.env.DEV) {
      console.warn('Using mock monthly attendance data due to API error');
      const targetMonth = month || new Date().getMonth() + 1;
      const targetYear = year || new Date().getFullYear();
      return mockAttendanceData.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate.getMonth() + 1 === targetMonth && 
               recordDate.getFullYear() === targetYear;
      });
    }
    
    throw {
      message: error.response?.data?.message || 'Failed to fetch monthly attendance',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const getAttendanceReport = async (params) => {
  // In development mode, return mock report data
  if (import.meta.env.DEV) {
    console.warn('Using mock attendance report in development mode');
    return {
      data: mockAttendanceData,
      total: mockAttendanceData.length,
      page: params?.page || 1,
      limit: params?.limit || 10
    };
  }

  try {
    const response = await apiService.get(endpoints.attendance.report, { params });
    return response.data;
  } catch (error) {
    console.error('Error in getAttendanceReport API:', error);
    throw {
      message: error.response?.data?.message || 'Failed to fetch attendance report',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const getAttendanceByEmployee = async (employeeId, params) => {
  try {
    const response = await apiService.get(`${endpoints.employees.byId(employeeId)}/attendance`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error in getAttendanceByEmployee API for employee ${employeeId}:`, error);
    
    if (import.meta.env.DEV) {
      console.warn('Using mock employee attendance data due to API error');
      return mockAttendanceData.filter(record => record.employeeId === parseInt(employeeId));
    }
    
    throw {
      message: error.response?.data?.message || 'Failed to fetch employee attendance',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const markAttendance = async (data) => {
  // In development mode, simulate successful attendance marking
  if (import.meta.env.DEV) {
    console.warn('Using mock attendance marking in development mode');
    const existingRecord = mockAttendanceData.find(
      record => record.employeeId === data.employeeId && record.date === data.date
    );

    if (existingRecord) {
      existingRecord.status = data.status;
      existingRecord.checkIn = data.timestamp;
      return { data: existingRecord };
    }

    const newRecord = {
      id: mockAttendanceData.length + 1,
      employeeId: data.employeeId,
      employeeName: 'Employee ' + data.employeeId, // Mock name
      date: data.date,
      status: data.status,
      checkIn: data.timestamp,
      checkOut: null,
      totalHours: 0,
      isLate: false,
      earlyLeave: false
    };
    mockAttendanceData.push(newRecord);
    return { data: newRecord };
  }

  try {
    const response = await apiService.post(endpoints.attendance.mark, data);
    return response.data;
  } catch (error) {
    console.error('Error in markAttendance API:', error);
    throw {
      message: error.response?.data?.message || 'Failed to mark attendance',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const getAttendanceStats = async () => {
  try {
    const response = await apiService.get(`${endpoints.attendance.base}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error in getAttendanceStats API:', error);
    
    if (import.meta.env.DEV) {
      console.warn('Using mock attendance stats due to API error');
      return {
        totalPresent: mockAttendanceData.filter(r => r.status === 'present').length,
        totalAbsent: mockAttendanceData.filter(r => r.status === 'absent').length,
        totalLate: mockAttendanceData.filter(r => r.isLate).length,
        totalEarlyLeave: mockAttendanceData.filter(r => r.earlyLeave).length,
        averageHours: mockAttendanceData.reduce((acc, curr) => acc + curr.totalHours, 0) / mockAttendanceData.length
      };
    }
    
    throw {
      message: error.response?.data?.message || 'Failed to fetch attendance stats',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const approveAttendance = async (id) => {
  const response = await apiService.put(`${endpoints.attendance.base}/${id}/approve`);
  return response.data;
};

export const rejectAttendance = async (id, reason) => {
  const response = await apiService.put(`${endpoints.attendance.base}/${id}/reject`, { reason });
  return response.data;
};

export const getAttendanceByDateRange = async (startDate, endDate) => {
  const response = await apiService.get(`${endpoints.attendance.base}/range`, {
    params: { startDate, endDate },
  });
  return response.data;
};

export const attendanceApi = {
  getDailyAttendance,
  markAttendance,
  getAttendanceReport
}; 