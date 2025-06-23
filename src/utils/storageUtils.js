// Storage utility functions

const PREFIX = 'hrms_';
const TOKEN_KEY = 'auth_token';

export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(PREFIX + key, serializedValue);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getItem = (key) => {
  try {
    const serializedValue = localStorage.getItem(PREFIX + key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

export const clearAll = () => {
  try {
    Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export const getToken = () => {
  return localStorage.getItem(PREFIX + TOKEN_KEY);
};

export const setToken = (token) => {
  localStorage.setItem(PREFIX + TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(PREFIX + TOKEN_KEY);
};

export const getUser = () => {
  return getItem('user');
};

export const setUser = (user) => {
  setItem('user', user);
};

export const removeUser = () => {
  removeItem('user');
}; 