import React, { useState } from "react";

const LeaveRequestDetail = ({ request, onClose, onApprove, onReject, onCancel }) => {
  const [showReject, setShowReject] = useState(false);
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Leave Request Details</h2>
        <div className="mb-2"><b>Employee:</b> {request.employeeName}</div>
        <div className="mb-2"><b>Type:</b> {request.leaveType}</div>
        <div className="mb-2"><b>Dates:</b> {request.startDate} to {request.endDate}</div>
        <div className="mb-2"><b>Status:</b> {request.status}</div>
        <div className="mb-2"><b>Reason:</b> {request.reason}</div>
        <div className="flex justify-end space-x-2 mt-4">
          <button className="px-4 py-2 border rounded" onClick={onClose}>Close</button>
          {request.status === "pending" && (
            <>
              <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => onApprove(request.id, 1)}>Approve</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => setShowReject(true)}>Reject</button>
            </>
          )}
          {request.status === "pending" && (
            <button className="px-4 py-2 bg-gray-600 text-white rounded" onClick={() => onCancel(request.id)}>Cancel</button>
          )}
        </div>
        {showReject && (
          <div className="mt-4">
            <textarea
              className="w-full mb-2 p-2 border rounded"
              placeholder="Rejection reason"
              value={reason}
              onChange={e => setReason(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 border rounded" onClick={() => setShowReject(false)}>Back</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => onReject(request.id, 1, reason)}>Reject</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestDetail;