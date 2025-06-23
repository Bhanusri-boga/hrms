import React from "react";

const LeaveRequestList = ({ requests, onView, onEdit }) => (
  <table className="min-w-full bg-white rounded shadow">
    <thead>
      <tr>
        <th className="px-4 py-2">Employee</th>
        <th className="px-4 py-2">Type</th>
        <th className="px-4 py-2">Dates</th>
        <th className="px-4 py-2">Status</th>
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {requests.map(r => (
        <tr key={r.id}>
          <td className="px-4 py-2">{r.employeeName}</td>
          <td className="px-4 py-2">{r.leaveType}</td>
          <td className="px-4 py-2">{r.startDate} to {r.endDate}</td>
          <td className="px-4 py-2">{r.status}</td>
          <td className="px-4 py-2">
            <button className="text-blue-600 mr-2" onClick={() => onView(r)}>View</button>
            <button className="text-indigo-600" onClick={() => onEdit(r)}>Edit</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default LeaveRequestList;