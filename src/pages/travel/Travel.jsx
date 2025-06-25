import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useNotification } from '../../context/NotificationContext';
import TravelForm from '../../components/travel/TravelForm';
import TravelDetail from '../../components/travel/TravelDetail';

const Travel = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewingRequest, setViewingRequest] = useState(null);
  const [editingRequest, setEditingRequest] = useState(null);
  const [travelRequests, setTravelRequests] = useState([
    { 
      id: 1, 
      employeeId: 101, 
      employeeName: 'John Doe', 
      destination: 'New York, USA',
      purpose: 'Client Meeting',
      departureDate: '2023-06-15',
      returnDate: '2023-06-20',
      estimatedCost: 1200,
      status: 'pending',
      notes: 'Meeting with potential clients to discuss project requirements'
    },
    { 
      id: 2, 
      employeeId: 102, 
      employeeName: 'Jane Smith', 
      destination: 'London, UK',
      purpose: 'Conference',
      departureDate: '2023-07-10',
      returnDate: '2023-07-15',
      estimatedCost: 2500,
      status: 'approved',
      notes: 'Attending the annual tech conference'
    },
    { 
      id: 3, 
      employeeId: 103, 
      employeeName: 'Michael Johnson', 
      destination: 'Tokyo, Japan',
      purpose: 'Training',
      departureDate: '2023-08-05',
      returnDate: '2023-08-12',
      estimatedCost: 3000,
      status: 'rejected',
      notes: 'Advanced training on new technologies'
    },
    { 
      id: 4, 
      employeeId: 104, 
      employeeName: 'Emily Davis', 
      destination: 'Berlin, Germany',
      purpose: 'Project Kickoff',
      departureDate: '2023-06-25',
      returnDate: '2023-06-30',
      estimatedCost: 1800,
      status: 'pending',
      notes: 'Initial meeting with the client team for project kickoff'
    },
  ]);
  
  const { addNotification } = useNotification();
  
  // Fetch travel requests data
  const { data: travelData, loading } = useFetch(`/travel-requests?status=${filterStatus}`);

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleNewRequest = () => {
    setEditingRequest(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingRequest(null);
  };

  const handleViewDetails = (request) => {
    setViewingRequest(request);
  };

  const handleCloseDetails = () => {
    setViewingRequest(null);
  };

  const handleEditRequest = (request) => {
    setEditingRequest(request);
    setIsFormOpen(true);
    setViewingRequest(null);
  };

  const handleSubmitRequest = async (id, formData) => {
    try {
      if (id) {
        // This would be an API call to update travel request
        // const response = await updateTravelRequest(id, formData);
        console.log('Updating travel request:', id, formData);
        
        // For mock data: Update the request in local state
        setTravelRequests(travelRequests.map(request => 
          request.id === id
            ? {
                ...request,
                ...formData,
                departureDate: formData.startDate,
                returnDate: formData.endDate,
                notes: formData.comments
              }
            : request
        ));
      } else {
        // This would be an API call to create travel request
        // const response = await createTravelRequest(formData);
        console.log('Submitting new travel request:', formData);
        
        // For mock data: Add the new request to the local state
        const newRequest = {
          id: travelRequests.length + 1,
          employeeId: formData.employeeId,
          employeeName: 'Current User', // This would come from your auth context in real app
          destination: formData.destination,
          purpose: formData.purpose,
          departureDate: formData.startDate,
          returnDate: formData.endDate,
          estimatedCost: formData.estimatedCost,
          status: 'pending',
          notes: formData.comments
        };

        setTravelRequests([...travelRequests, newRequest]);
      }
      
      addNotification({
        type: 'success',
        message: id ? 'Travel request updated successfully' : 'Travel request submitted successfully'
      });
      setIsFormOpen(false);
      setEditingRequest(null);
    } catch (error) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to submit travel request'
      });
    }
  };

  const handleApprove = async (requestId) => {
    try {
      // Update the status in local state for mock data
      setTravelRequests(travelRequests.map(request => 
        request.id === requestId 
          ? { ...request, status: 'approved' }
          : request
      ));
      
      addNotification({
        type: 'success',
        message: 'Travel request approved successfully'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to approve travel request'
      });
    }
  };

  const handleReject = async (requestId) => {
    try {
      // Update the status in local state for mock data
      setTravelRequests(travelRequests.map(request => 
        request.id === requestId 
          ? { ...request, status: 'rejected' }
          : request
      ));
      
      addNotification({
        type: 'success',
        message: 'Travel request rejected'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to reject travel request'
      });
    }
  };

  // Use local state for mock data instead of API data
  const displayData = travelData || travelRequests;

  // Filter travel requests based on selected status
  const filteredRequests = filterStatus === 'all' 
    ? displayData 
    : displayData.filter(request => request.status === filterStatus);

  if (loading && !travelRequests.length) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-2 py-2">
      {isFormOpen && (
        <TravelForm
          travel={editingRequest}
          onSubmit={handleSubmitRequest}
          onClose={handleCloseForm}
        />
      )}
      {viewingRequest && (
        <TravelDetail 
          travelRequest={viewingRequest}
          onClose={handleCloseDetails}
        />
      )}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-base font-bold text-gray-900">Travel Requests</h1>
        <div className="flex items-center">
          <select
            value={filterStatus}
            onChange={handleStatusChange}
            className="mr-2 border border-gray-300 rounded p-1 text-xs"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            onClick={handleNewRequest}
            className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
          >
            New Request
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-1 text-left text-xxs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-2 py-1 text-left text-xxs font-medium text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-2 py-1 text-left text-xxs font-medium text-gray-500 uppercase tracking-wider">
                Purpose
              </th>
              <th className="px-2 py-1 text-left text-xxs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-2 py-1 text-left text-xxs font-medium text-gray-500 uppercase tracking-wider">
                Est. Cost
              </th>
              <th className="px-2 py-1 text-left text-xxs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-2 py-1 text-right text-xxs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-xs font-medium text-gray-900">
                    {request.employeeName}
                  </div>
                  <div className="text-xxs text-gray-500">ID: {request.employeeId}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-xs text-gray-900">{request.destination}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-xs text-gray-900">{request.purpose}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-xs text-gray-900">
                    {new Date(request.departureDate || request.startDate).toLocaleDateString()} - {new Date(request.returnDate || request.endDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-xs text-gray-900">${request.estimatedCost.toLocaleString()}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <span
                    className={`px-1 inline-flex text-xxs leading-4 font-semibold rounded-full ${
                      request.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : request.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-right text-xs font-medium">
                  <button
                    onClick={() => handleViewDetails(request)}
                    className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                  >
                    View
                  </button>
                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleEditRequest(request)}
                        className="px-3 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="text-green-600 hover:text-green-900 mr-1"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Travel;