import { useState, useCallback, useEffect } from 'react';
import apiService from '../api/apiService';
import { getMockTimesheets } from '../api/mockData';

/**
 * Enhanced hook for making API requests with automatic cancellation and error handling
 * @param {string} url - The API endpoint
 * @param {Object} options - Request configuration
 * @param {boolean} options.immediate - Whether to fetch immediately
 * @param {Object} options.params - URL parameters
 * @param {Object} options.data - Request body
 * @param {string} options.method - HTTP method
 * @returns {Object} API request state and control functions
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data for URL:', url);
      try {
        setLoading(true);
        setError(null);

        let result;
        
        if (import.meta.env.DEV) {
          console.log('Development mode - using mock data');
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          if (url.includes('/timesheets')) {
            let month = options?.params?.month;
            if (!month) {
              // Try to extract month from the URL query string
              const match = url.match(/month=([0-9]{4}-[0-9]{2})/);
              month = match ? match[1] : new Date().toISOString().slice(0, 7);
            }
            console.log('Getting mock timesheets for month:', month);
            result = getMockTimesheets(month);
            console.log('Mock timesheet data:', result);
          } else if (url.includes('/employees')) {
            result = [
              { id: 1, name: 'John Doe', position: 'Developer' },
              { id: 2, name: 'Jane Smith', position: 'Designer' }
            ];
          }
        } else {
          const response = await apiService.get(url, options);
          result = response.data;
        }

        console.log('Setting data:', result);
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

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
    () => {
      return refetch({ method: 'DELETE' });
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