import React, { useEffect, useState } from "react";
import api from "../api/apiService";
import LeaveRequestList from "../components/leave/LeaveRequestList";
import LeaveRequestForm from "../components/leave/LeaveRequestForm";
import LeaveRequestDetail from "../components/leave/LeaveRequestDetail";

const LeaveRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editRequest, setEditRequest] = useState(null);

  // Fetch all leave requests (for demo, you may want to filter by employee/department)
  useEffect(() => {
    api.get("/api/v1/leaves/requests").then(res => {
      setRequests(res.data);
      setLoading(false);
    });
  }, []);

  const handleCreate = (data) => {
    api.post("/api/v1/leaves/requests", data).then(res => {
      setRequests(prev => [res.data, ...prev]);
      setShowForm(false);
    });
  };

  const handleUpdate = (id, data) => {
    api.put(`/api/v1/leaves/requests/${id}`, data).then(res => {
      setRequests(prev => prev.map(r => r.id === id ? res.data : r));
      setEditRequest(null);
    });
  };

  const handleApprove = (id, approverId) => {
    api.post(`/api/v1/leaves/requests/${id}/approve?approverId=${approverId}`).then(res => {
      setRequests(prev => prev.map(r => r.id === id ? res.data : r));
      setSelected(null);
    });
  };

  const handleReject = (id, approverId, reason) => {
    api.post(`/api/v1/leaves/requests/${id}/reject?approverId=${approverId}&reason=${encodeURIComponent(reason)}`).then(res => {
      setRequests(prev => prev.map(r => r.id === id ? res.data : r));
      setSelected(null);
    });
  };

  const handleCancel = (id) => {
    api.post(`/api/v1/leaves/requests/${id}/cancel`).then(res => {
      setRequests(prev => prev.map(r => r.id === id ? res.data : r));
      setSelected(null);
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leave Requests</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          New Leave Request
        </button>
      </div>
      <LeaveRequestList
        requests={requests}
        onView={setSelected}
        onEdit={setEditRequest}
      />
      {showForm && (
        <LeaveRequestForm
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}
      {editRequest && (
        <LeaveRequestForm
          initial={editRequest}
          onSubmit={data => handleUpdate(editRequest.id, data)}
          onClose={() => setEditRequest(null)}
        />
      )}
      {selected && (
        <LeaveRequestDetail
          request={selected}
          onClose={() => setSelected(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default LeaveRequestsPage;