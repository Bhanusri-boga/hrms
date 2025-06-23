// server.cjs
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = 5000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom routes for authentication
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Get users from db.json
  const users = router.db.get('auth.users').value();
  
  // Find user by email and password
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Return login response from db.json
    const loginResponse = router.db.get('auth.login').value();
    // Update user info in the response
    loginResponse.user.id = user.id;
    loginResponse.user.email = user.email;
    loginResponse.user.name = user.name;
    loginResponse.user.role = user.role;
    
    res.status(200).jsonp(loginResponse);
  } else {
    res.status(401).jsonp({ message: 'Invalid email or password' });
  }
});

server.get('/auth/me', (req, res) => {
  // Check for Authorization header
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // In a real app, you would validate the token
    // For this mock, we'll just return the user data
    const userData = router.db.get('auth.me').value();
    res.status(200).jsonp(userData);
  } else {
    res.status(401).jsonp({ message: 'Unauthorized' });
  }
});

server.post('/auth/logout', (req, res) => {
  res.status(200).jsonp({ message: 'Logged out successfully' });
});

// Use default router for other routes
server.use('/api', router);

// Start server
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});