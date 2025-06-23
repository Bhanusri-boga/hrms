// mock-server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock data
const mockUser = {
  id: 1,
  email: 'admin@hrms.com',
  name: 'Admin User',
  role: 'admin',
  permissions: ['all']
};

// Login endpoint
app.post('/auth/login', (req, res) => {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;
  
  // Simple validation
  if (email === 'admin@hrms.com' && password === 'admin123') {
    const response = {
      token: 'fake-jwt-token',
      accessToken: 'fake-jwt-token',
      refreshToken: 'fake-refresh-token',
      user: mockUser
    };
    console.log('Login successful, sending response:', response);
    res.json(response);
  } else {
    console.log('Login failed: Invalid credentials');
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Get current user endpoint
app.get('/auth/me', (req, res) => {
  console.log('Get current user request received');
  // In a real app, you would validate the token
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    console.log('Authorization header found, returning user data');
    res.json(mockUser);
  } else {
    console.log('No valid authorization header found');
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Logout endpoint
app.post('/auth/logout', (req, res) => {
  console.log('Logout request received');
  res.json({ message: 'Logged out successfully' });
});

// Add a catch-all route for debugging
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.path}`);
  next();
});

// Add error handling middleware
app.use((err, req, res) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('  POST /auth/login - Login with email and password');
  console.log('  GET /auth/me - Get current user (requires Authorization header)');
  console.log('  POST /auth/logout - Logout');
});