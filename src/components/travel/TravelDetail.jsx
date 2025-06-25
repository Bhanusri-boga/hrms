import React from 'react';
import Modal from '../common/Modal';

const DetailItem = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-4 py-2">
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
    <dd className="text-sm text-gray-900 dark:text-white col-span-2">{value || '-'}</dd>
  </div>
);

const TravelDetail = ({ travelRequest, onClose }) => {
  if (!travelRequest) return null;

  const statusClass = {
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Travel Request Details"
      size="lg"
    >
      <div className="space-y-4">
        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
          <DetailItem label="Employee Name" value={travelRequest.employeeName} />
          <DetailItem label="Employee ID" value={travelRequest.employeeId} />
          <DetailItem label="Destination" value={travelRequest.destination} />
          <DetailItem label="Purpose" value={travelRequest.purpose} />
          <DetailItem label="Departure Date" value={new Date(travelRequest.departureDate || travelRequest.startDate).toLocaleDateString()} />
          <DetailItem label="Return Date" value={new Date(travelRequest.returnDate || travelRequest.endDate).toLocaleDateString()} />
          <DetailItem label="Estimated Cost" value={`$${travelRequest.estimatedCost.toLocaleString()}`} />
          <div className="grid grid-cols-3 gap-4 py-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass[travelRequest.status]}`}>
                {travelRequest.status.charAt(0).toUpperCase() + travelRequest.status.slice(1)}
              </span>
            </dd>
          </div>
          <DetailItem label="Notes/Comments" value={travelRequest.notes || travelRequest.comments} />
        </dl>
      </div>
    </Modal>
  );
};

export default TravelDetail; 