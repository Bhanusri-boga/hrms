# Frontend Project Structure (React)

```
hrms-frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       └── images/
├── src/
│   ├── index.js
│   ├── App.js
│   ├── api/
│   │   ├── axios.js
│   │   ├── authApi.js
│   │   ├── userApi.js
│   │   ├── employeeApi.js
│   │   ├── attendanceApi.js
│   │   ├── timeSheetApi.js
│   │   ├── documentApi.js
│   │   ├── salaryApi.js
│   │   └── travelApi.js
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Alert.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── FormInput.jsx
│   │   │   ├── FormSelect.jsx
│   │   │   └── Button.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── ForgotPasswordForm.jsx
│   │   ├── user/
│   │   │   ├── UserList.jsx
│   │   │   ├── UserForm.jsx
│   │   │   └── UserDetail.jsx
│   │   ├── employee/
│   │   │   ├── EmployeeList.jsx
│   │   │   ├── EmployeeForm.jsx
│   │   │   └── EmployeeDetail.jsx
│   │   ├── attendance/
│   │   │   ├── AttendanceList.jsx
│   │   │   ├── AttendanceForm.jsx
│   │   │   └── AttendanceCalendar.jsx
│   │   ├── timesheet/
│   │   │   ├── TimeSheetList.jsx
│   │   │   └── TimeSheetForm.jsx
│   │   ├── document/
│   │   │   ├── DocumentList.jsx
│   │   │   └── DocumentUpload.jsx
│   │   ├── salary/
│   │   │   ├── SalaryList.jsx
│   │   │   └── SalaryDetail.jsx
│   │   ├── travel/
│   │   │   ├── TravelList.jsx
│   │   │   └── TravelForm.jsx
│   │   └── dashboard/
│   │       ├── Dashboard.jsx
│   │       ├── EmployeeStats.jsx
│   │       ├── AttendanceStats.jsx
│   │       └── Charts.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── NotificationContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   ├── useForm.js
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Users.jsx
│   │   ├── Employees.jsx
│   │   ├── Attendance.jsx
│   │   ├── TimeSheets.jsx
│   │   ├── Documents.jsx
│   │   ├── Salary.jsx
│   │   ├── Travel.jsx
│   │   ├── Reports.jsx
│   │   ├── Settings.jsx
│   │   └── NotFound.jsx
│   ├── utils/
│   │   ├── dateUtils.js
│   │   ├── formatUtils.js
│   │   ├── validationUtils.js
│   │   └── storageUtils.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── components/
│   │       ├── header.css
│   │       ├── sidebar.css
│   │       └── forms.css
│   └── routes/
│       ├── PrivateRoute.jsx
│       ├── PublicRoute.jsx
│       └── AppRoutes.jsx
├── .env
├── .env.development
├── .env.production
├── package.json
├── Dockerfile
└── README.md
```

## Key Components

### API Layer
- **axios.js**: Axios instance with interceptors for authentication
- Module-specific API files for each backend service

### Components
- **Common**: Reusable UI components
- Module-specific components organized by feature

### Context
- **AuthContext**: Authentication state management
- **ThemeContext**: Theme/UI preferences
- **NotificationContext**: Global notifications/alerts

### Hooks
- **useAuth**: Authentication related hooks
- **useFetch**: Data fetching with loading/error states
- **useForm**: Form handling with validation

### Pages
- Main page components that use smaller components
- Each represents a major section of the application

### Utils
- Helper functions for common tasks
- Date formatting, validation, etc.

### Styles
- Global styles and variables
- Component-specific styles

### Routes
- **PrivateRoute**: Protected routes requiring authentication
- **PublicRoute**: Routes accessible without authentication
- **AppRoutes**: Main routing configuration