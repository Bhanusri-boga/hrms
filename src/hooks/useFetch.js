import { useState, useCallback, useEffect } from 'react';
import apiService from '../api/apiService';
import { getMockTimesheets } from '../api/mockData';

// ---- Move this OUTSIDE the hook ----
let mockEmployees = [
  {
    employeeId: 1,
    firstName: 'John',
    middleName: '',
    lastName: 'Doe',
    nationality: 'Indian',
    birthday: '1990-01-01',
    gender: 'Male',
    maritalStatus: 'Single',
    ssnNum: '',
    nicNum: '',
    otherId: '',
    employmentStatus: 'Full Time',
    jobTitle: 'Developer',
    payGrade: 'Grade 1',
    workStationId: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    province: '',
    postalCode: '',
    homePhone: '',
    mobilePhone: '',
    workPhone: '',
    workEmail: 'john.doe@example.com',
    privateEmail: '',
    joinedDate: '2022-01-01',
    confirmationDate: '',
    department: 'Engineering',
    supervisor: '',
    indirectSupervisors: { techLead: '', hrManager: '' },
    timezone: '',
    profileImage: '',
    status: 'Active'
  },
  {
    employeeId: 2,
    firstName: 'Jane',
    middleName: '',
    lastName: 'Smith',
    nationality: 'American',
    birthday: '1992-02-02',
    gender: 'Female',
    maritalStatus: 'Married',
    ssnNum: '',
    nicNum: '',
    otherId: '',
    employmentStatus: 'Part Time',
    jobTitle: 'Designer',
    payGrade: 'Grade 2',
    workStationId: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    province: '',
    postalCode: '',
    homePhone: '',
    mobilePhone: '',
    workPhone: '',
    workEmail: 'jane.smith@example.com',
    privateEmail: '',
    joinedDate: '2023-02-02',
    confirmationDate: '',
    department: 'HR',
    supervisor: '',
    indirectSupervisors: { techLead: '', hrManager: '' },
    timezone: '',
    profileImage: '',
    status: 'Active'
  }
];
// ---- End move ----

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let result;

        if (import.meta.env.DEV) {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));

          if (url && url.includes('/timesheets')) {
            let month = options?.params?.month;
            if (!month) {
              const match = url.match(/month=([0-9]{4}-[0-9]{2})/);
              month = match ? match[1] : new Date().toISOString().slice(0, 7);
            }
            result = getMockTimesheets(month);
          } else if (url && url.includes('/employees')) {
            if (options.method === 'POST') {
              // Add new employee
              const newEmployee = {
                ...options.data,
                employeeId: mockEmployees.length
                  ? Math.max(...mockEmployees.map(e => Number(e.employeeId) || 0)) + 1
                  : 1,
                status: options.data.status || 'Active'
              };
              mockEmployees.push(newEmployee);
              result = newEmployee;
            } else if (options.method === 'PUT') {
              // Edit employee
              const idx = mockEmployees.findIndex(
                e => String(e.employeeId) === String(options.data.employeeId)
              );
              if (idx !== -1) {
                mockEmployees[idx] = { ...mockEmployees[idx], ...options.data };
                result = mockEmployees[idx];
              } else {
                throw new Error('Employee not found');
              }
            } else if (options.method === 'DELETE') {
              // Delete employee (expects { employeeId } in options.data)
              const idToDelete = options.data?.employeeId;
              mockEmployees = mockEmployees.filter(
                e => String(e.employeeId) !== String(idToDelete)
              );
              result = { success: true };
            } else {
              // GET all employees
              result = mockEmployees;
            }
          }
        } else {
          // Real API call in production
          result = await apiService(url, options);
        }

        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [url, options.method, options.data]);

  const refetch = () => {
    setLoading(true);
    setError(null);
    setData(null);
  };

  return {
    data,
    loading,
    error,
    refetch
  };
};

/**
 * Hook for making POST requests
 */
export const usePost = (endpoint) => {
  const { refetch, loading, error } = useFetch(endpoint, { immediate: false });

  const post = useCallback(
    (data) => {
      return refetch({ method: 'POST', data });
    },
    [refetch]
  );

  return { post, loading, error };
};

/**
 * Hook for making PUT requests
 */
export const usePut = (endpoint) => {
  const { refetch, loading, error } = useFetch(endpoint, { immediate: false });

  const put = useCallback(
    (data) => {
      return refetch({ method: 'PUT', data });
    },
    [refetch]
  );

  return { put, loading, error };
};

/**
 * Hook for making DELETE requests
 */
export const useDelete = (endpoint) => {
  const { refetch, loading, error } = useFetch(endpoint, { immediate: false });

  const remove = useCallback(
    (employeeId) => {
      return refetch({ method: 'DELETE', data: { employeeId } });
    },
    [refetch]
  );

  return { remove, loading, error };
};

/**
 * Hook for making PATCH requests
 */
export const usePatch = (endpoint) => {
  const { refetch, loading, error } = useFetch(endpoint, { immediate: false });

  const patch = useCallback(
    (data) => {
      return refetch({ method: 'PATCH', data });
    },
    [refetch]
  );

  return { patch, loading, error };
};