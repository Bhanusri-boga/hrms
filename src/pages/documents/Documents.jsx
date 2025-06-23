import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useNotification } from '../../context/NotificationContext';
import DocumentUpload from '../../components/document/DocumentUpload';

const Documents = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { addNotification } = useNotification();
  
  // Fetch documents data
  const { data: documentsData, loading, refetch } = useFetch(`/documents?category=${selectedCategory}`);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const handleUploadDocument = async () => {
    addNotification({
      type: 'success',
      message: 'Document uploaded successfully (mock)'
    });
    setShowUploadModal(false);
    refetch();
  };

  const handleDelete = async () => {
    try {
      addNotification({
        type: 'success',
        message: 'Document deleted successfully'
      });
      refetch();
    } catch (error) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to delete document'
      });
    }
  };

  // Mock data for demonstration
  const mockDocumentsData = [
    { 
      id: 1, 
      name: 'Employee Handbook.pdf', 
      category: 'policy',
      uploadedBy: 'Admin',
      uploadDate: '2023-04-15',
      size: '2.5 MB'
    },
    { 
      id: 2, 
      name: 'Vacation Policy.docx', 
      category: 'policy',
      uploadedBy: 'HR Manager',
      uploadDate: '2023-03-22',
      size: '1.2 MB'
    },
    { 
      id: 3, 
      name: 'Q1 Financial Report.xlsx', 
      category: 'finance',
      uploadedBy: 'Finance Director',
      uploadDate: '2023-04-05',
      size: '3.7 MB'
    },
    { 
      id: 4, 
      name: 'Project Timeline.pptx', 
      category: 'project',
      uploadedBy: 'Project Manager',
      uploadDate: '2023-04-10',
      size: '5.1 MB'
    },
    { 
      id: 5, 
      name: 'Health Insurance Forms.pdf', 
      category: 'benefits',
      uploadedBy: 'HR Specialist',
      uploadDate: '2023-02-18',
      size: '1.8 MB'
    },
  ];

  // Use mock data for now
  const displayData = documentsData || mockDocumentsData;

  // Filter documents based on selected category
  const filteredDocuments = selectedCategory === 'all' 
    ? displayData 
    : displayData.filter(doc => doc.category === selectedCategory);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <div className="flex items-center">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mr-4 border border-gray-300 rounded p-2"
          >
            <option value="all">All Categories</option>
            <option value="policy">Policies</option>
            <option value="finance">Finance</option>
            <option value="project">Projects</option>
            <option value="benefits">Benefits</option>
          </select>
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload Document
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploaded By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDocuments.map((document) => (
              <tr key={document.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded">
                      <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                        {document.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {document.category.charAt(0).toUpperCase() + document.category.slice(1)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{document.uploadedBy}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(document.uploadDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{document.size}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {/* Download document */}}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(document.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showUploadModal && (
        <DocumentUpload
          onUpload={handleUploadDocument}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
};

export default Documents;