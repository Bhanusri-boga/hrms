import React, { useState, useEffect, useCallback } from 'react';
import { documentService } from '../../api';
import { useNotification } from '../../context/NotificationContext';
import GlassCard from '../../components/common/GlassCard';
import Loader from '../../components/common/Loader';

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const { addNotification } = useNotification();

  const fetchDocuments = useCallback(async () => {
    try {
      const response = await documentService.getDocuments();
      setDocuments(response.data);
    } catch (error) {
      addNotification('error', 'Failed to fetch documents');
    }
  }, [addNotification]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await documentService.getDocumentCategories();
      setStats(response.data);
    } catch (error) {
      addNotification('error', 'Failed to fetch document statistics');
    } finally {
      setLoading(false);
    }
  }, [addNotification]);

  useEffect(() => {
    fetchDocuments();
    fetchStats();
  }, [fetchDocuments, fetchStats]);

  const handleDownloadDocument = async (id) => {
    try {
      const response = await documentService.downloadDocument(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `document-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      addNotification('error', 'Failed to download document');
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      await documentService.deleteDocument(id);
      addNotification('success', 'Document deleted successfully');
      await fetchDocuments();
    } catch (error) {
      addNotification('error', 'Failed to delete document');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Document Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">Total Documents</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats?.total || 0}</p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <p className="text-3xl font-bold text-purple-600">{stats?.categories?.length || 0}</p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">Recent Uploads</h3>
          <p className="text-3xl font-bold text-blue-600">{stats?.recent || 0}</p>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map((document) => (
                <tr key={document.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {document.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {document.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(document.uploadDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.round(document.size / 1024)} KB
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDownloadDocument(document.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDeleteDocument(document.id)}
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
      </GlassCard>
    </div>
  );
};

export default DocumentsPage;