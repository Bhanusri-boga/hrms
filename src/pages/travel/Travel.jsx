import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useNotification } from '../../context/NotificationContext';
import TravelForm from '../../components/travel/TravelForm';
import TravelDetail from '../../components/travel/TravelDetail';
import TravelList from '../../components/travel/TravelList';

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
        // Update the request in local state
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
        // Add the new request to the local state
        const newRequest = {
          id: travelRequests.length + 1,
          employeeId: formData.employeeId,
          employeeName: 'Current User', // Replace with real user in production
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

  const handleApprove = async (request) => {
    try {
      setTravelRequests(travelRequests.map(r =>
        r.id === request.id
          ? { ...r, status: 'approved' }
          : r
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

  const handleReject = async (request) => {
    try {
      setTravelRequests(travelRequests.map(r =>
        r.id === request.id
          ? { ...r, status: 'rejected' }
          : r
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

      <TravelList
        travels={filteredRequests}
        onView={handleViewDetails}
        onEdit={handleEditRequest}
        onDelete={(request) =>
          setTravelRequests(travelRequests.filter(r => r.id !== request.id))
        }
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default Travel;