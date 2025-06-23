import React, { useState } from "react";

const LeaveRequestForm = ({ initial = {}, onSubmit, onClose }) => {
  const [form, setForm] = useState({
    employeeId: initial.employeeId || "",
    leaveTypeId: initial.leaveTypeId || "",
    startDate: initial.startDate || "",
    endDate: initial.endDate || "",
    reason: initial.reason || "",
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form className="bg-white p-6 rounded shadow w-96" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">{initial.id ? "Edit" : "New"} Leave Request</h2>
        <input
          className="w-full mb-2 p-2 border rounded"
          name="employeeId"
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-2 p-2 border rounded"
          name="leaveTypeId"
          placeholder="Leave Type ID"
          value={form.leaveTypeId}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-2 p-2 border rounded"
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-2 p-2 border rounded"
          name="endDate"
          type="date"
          value={form.endDate}
          onChange={handleChange}
          required
        />
        <textarea
          className="w-full mb-2 p-2 border rounded"
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" className="px-4 py-2 border rounded" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{initial.id ? "Update" : "Submit"}</button>
        </div>
      </form>
    </div>
  );
};

export default LeaveRequestForm;