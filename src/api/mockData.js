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

export const mockEmployees = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
];

export const mockAttendance = [
  {
    id: "1-2024-06-01",
    employeeId: 1,
    employee: { name: "Alice Johnson" },
    date: "2024-06-01",
    intime: "09:00",
    outtime: "17:00",
    status: "present",
 
  },
  {
    id: "2-2024-06-01",
    employeeId: 2,
    employee: { name: "Bob Smith" },
    status: "absent",
    checkIn: null,
    checkOut: null,
  },
  {
    id: "3-2024-06-01",
    employeeId: 3,
    employee: { name: "Charlie Brown" },
    status: "on_leave",
    checkIn: null,
    checkOut: null,
  },
]; 