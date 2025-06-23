// auth-middleware.js
import db from './db.json';

export default (req, res, next) => {
  console.log(`[Middleware] ${req.method} ${req.path}`);
  
  // Handle login endpoint
  if (req.method === 'POST' && req.path === '/auth/login') {
    console.log('[Middleware] Processing login request:', req.body);
    const { email, password } = req.body || {};
    
    if (!email || !password) {
      console.log('[Middleware] Missing email or password');
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }
    
    try {
      const users = db.users || [];
      
      console.log('[Middleware] Looking for user with email:', email);
      
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        console.log('[Middleware] User found, preparing response');
        const loginResponse = db.auth && db.auth.login ? { ...db.auth.login } : {
          token: 'fake-jwt-token',
          accessToken: 'fake-jwt-token',
          refreshToken: 'fake-refresh-token',
          user: { id: 0, email: '', name: '', role: '', permissions: [] }
        };
        
        if (loginResponse.user) {
          loginResponse.user.id = user.id;
          loginResponse.user.email = user.email;
          loginResponse.user.name = user.name;
          loginResponse.user.role = user.role;
          loginResponse.user.permissions = user.permissions || [];
        }
        
        res.status(200).json(loginResponse);
        return;
      } else {
        console.log('[Middleware] User not found or invalid credentials');
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
    } catch (error) {
      console.error('[Middleware] Error processing login:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
  }
  
  // Handle me endpoint
  if (req.method === 'GET' && req.path === '/auth/me') {
    console.log('[Middleware] Processing get current user request');
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const userData = db.auth && db.auth.me ? db.auth.me : {
          id: 1,
          email: 'admin@hrms.com',
          name: 'Admin User',
          role: 'admin',
          permissions: ['all']
        };
        
        console.log('[Middleware] Returning user data:', userData);
        res.status(200).json(userData);
        return;
      } catch (error) {
        console.error('[Middleware] Error getting user data:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
    } else {
      console.log('[Middleware] No valid authorization header found');
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  }
  
  // Handle logout endpoint
  if (req.method === 'POST' && req.path === '/auth/logout') {
    console.log('[Middleware] Processing logout request');
    res.status(200).json({ message: 'Logged out successfully' });
    return;
  }
  
  // Continue to JSON Server router
  console.log('[Middleware] Passing request to next handler');
  next();
};