export const getMockTimesheets = (month) => {
  return [
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      month: month,
      totalHours: 168,
      status: 'pending',
      entries: [
        { date: '2024-03-01', hours: 8, description: 'Development work' },
        { date: '2024-03-02', hours: 8, description: 'Bug fixes' }
      ]
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Jane Smith',
      month: month,
      totalHours: 160,
      status: 'approved',
      entries: [
        { date: '2024-03-01', hours: 8, description: 'Client meeting' },
        { date: '2024-03-02', hours: 8, description: 'Documentation' }
      ]
    }
  ];
}; 