# HRMS Frontend

A modern Human Resource Management System frontend built with React, Vite, and Three.js.

## Features

- Modern React with Vite for fast development
- Three.js integration for 3D visualizations
- Responsive design with Tailwind CSS
- Authentication and authorization
- Employee management
- Attendance tracking
- Time sheet management
- Document management
- Salary management
- Travel management
- Reports and analytics

## Prerequisites

- Node.js 16.x or later
- npm 7.x or later

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd hrms-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=HRMS
VITE_APP_VERSION=1.0.0
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
hrms-frontend/
├── public/              # Static files
├── src/
│   ├── api/            # API integration
│   ├── components/     # React components
│   ├── context/        # React context
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Page components
│   ├── routes/         # Routing configuration
│   ├── styles/         # Global styles
│   └── utils/          # Utility functions
├── .env               # Environment variables
├── vite.config.js     # Vite configuration
└── package.json       # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
