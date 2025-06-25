import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from '../../hooks/useForm';
import Modal from '../common/Modal';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';

const DocumentUpload = ({ onUpload, onClose }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const { values, errors, handleChange, handleBlur, validateForm } = useForm(
    {
      name: '',
      description: '',
      type: '',
      category: '',
      visibility: 'private'
    },
    {
      name: { required: true },
      type: { required: true },
      category: { required: true }
    }
  );

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });

      await onUpload(formData);
      onClose();
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const documentTypes = [
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'ppt',
    'pptx',
    'txt',
    'image'
  ];

  const categories = [
    'Contract',
    'ID',
    'Certificate',
    'Report',
    'Policy',
    'Other'
  ];

  return (
    <Modal title="Upload Document" onClose={onClose} isOpen={true}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          {files.length > 0 ? (
            <div>
              <p className="text-sm text-gray-600">{files[0].name}</p>
              <p className="text-xs text-gray-500">
                {(files[0].size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-600">
                Drag and drop a file here, or click to select
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, Images
              </p>
            </div>
          )}
        </div>

        <FormInput
          label="Document Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          required
        />

        <FormInput
          label="Description"
          name="description"
          type="textarea"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.description}
        />

        <FormSelect
          label="Document Type"
          name="type"
          value={values.type}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.type}
          options={documentTypes}
          required
        />

        <FormSelect
          label="Category"
          name="category"
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.category}
          options={categories}
          required
        />

        <FormSelect
          label="Visibility"
          name="visibility"
          value={values.visibility}
          onChange={handleChange}
          options={[
            { value: 'private', label: 'Private' },
            { value: 'public', label: 'Public' }
          ]}
        />

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={uploading || files.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DocumentUpload; 