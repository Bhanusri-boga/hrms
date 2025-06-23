import { useState, useCallback } from 'react';
import { usePost, usePut } from './useFetch';
import { isValidEmail, isValidPassword, isValidPhoneNumber, isValidDate } from '../utils/validationUtils';

/**
 * Enhanced form handling hook with API integration and validation
 * @param {Object} options - Form configuration options
 * @param {Object} options.initialValues - Initial form values
 * @param {Object} options.validationRules - Form validation rules
 * @param {Function} options.onSubmit - Custom submit handler
 * @param {string} options.endpoint - API endpoint for form submission
 * @param {string} options.method - HTTP method for submission (POST or PUT)
 */
export const useForm = ({
  initialValues = {},
  validationRules = {},
  onSubmit,
  endpoint,
  method = 'POST'
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API hooks
  const { post, loading: postLoading } = usePost(endpoint);
  const { put, loading: putLoading } = usePut(endpoint);

  // Validate individual field
  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && !value) {
      return 'This field is required';
    }

    if (rules.email && !isValidEmail(value)) {
      return 'Invalid email address';
    }

    if (rules.password && !isValidPassword(value)) {
      return 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
    }

    if (rules.phone && !isValidPhoneNumber(value)) {
      return 'Invalid phone number';
    }

    if (rules.date && !isValidDate(value)) {
      return 'Invalid date';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.message || 'Invalid format';
    }

    if (rules.custom && typeof rules.custom === 'function') {
      const customError = rules.custom(value, values);
      if (customError) return customError;
    }

    return '';
  }, [validationRules, values]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const formErrors = {};
    Object.keys(validationRules).forEach(fieldName => {
      const value = values[fieldName];
      const error = validateField(fieldName, value);
      if (error) {
        formErrors[fieldName] = error;
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }, [validateField, validationRules, values]);

  // Handle field changes
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [validateField, touched]);

  // Handle field blur
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [validateField]);

  // Submit handler
  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      if (validateForm()) {
        let response;
        if (endpoint) {
          response = method === 'POST' 
            ? await post(values)
            : await put(values);
        }
        
        if (typeof onSubmit === 'function') {
          await onSubmit(response || values);
        }
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Submission failed'
      }));
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, endpoint, method, post, put, onSubmit]);

  // Utility functions
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [validateField, touched]);

  const setFieldValues = useCallback((newValues) => {
    setValues(prev => ({ ...prev, ...newValues }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting: isSubmitting || postLoading || putLoading,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldValues,
    setFieldError,
    resetForm,
    validateForm,
    validateField,
  };
};