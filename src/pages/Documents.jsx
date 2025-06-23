import React, { useState, useEffect, useCallback } from 'react'
import { documentService } from '../api'
import { useNotification } from '../context/NotificationContext'
import GlassCard from '../components/common/GlassCard'
import DocumentUpload from '../components/document/DocumentUpload'

const Documents = () => {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const { addNotification } = useNotification()

  const fetchDocuments = useCallback(async () => {
    try {
      const response = await documentService.getDocuments()
      setDocuments(response.data)
    } catch (error) {
      addNotification('Error fetching documents', 'error')
    } finally {
      setLoading(false)
    }
  }, [addNotification])

  const fetchStats = useCallback(async () => {
    try {
      const response = await documentService.getDocumentCategories()
      setStats(response.data)
    } catch (error) {
      addNotification('Error fetching document stats', 'error')
    }
  }, [addNotification])

  useEffect(() => {
    fetchDocuments()
    fetchStats()
  }, [fetchDocuments, fetchStats])

  const handleDownload = async (id) => {
    try {
      const response = await documentService.downloadDocument(id)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const a = document.createElement('a')
      a.href = url
      a.download = `document-${id}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      addNotification('Error downloading document', 'error')
    }
  }

  const handleDelete = async (id) => {
    try {
      await documentService.deleteDocument(id)
      addNotification('Document deleted successfully', 'success')
      await Promise.all([fetchDocuments(), fetchStats()])
    } catch (error) {
      addNotification('Error deleting document', 'error')
    }
  }

  const handleUploadDocument = async (formData) => {
    try {
      await documentService.uploadDocument(formData)
      addNotification('Document uploaded successfully', 'success')
      setShowUploadModal(false)
      fetchDocuments()
    } catch (error) {
      addNotification('Error uploading document', 'error')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">Total Documents</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {stats?.totalDocuments || 0}
          </p>
        </GlassCard>
        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">Recent Uploads</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats?.recentUploads || 0}
          </p>
        </GlassCard>
        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">Storage Used</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats?.storageUsed || '0 MB'}
          </p>
        </GlassCard>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
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
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((document) => (
              <tr
                key={document.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{document.size}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDownload(document.id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
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
  )
}

export default Documents