import { Request, Response, NextFunction } from 'express';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // In a real app, verify the JWT.
  // For this specific request with hardcoded credentials and "mock-jwt-token-for-admin",
  // we just check if it matches the mock token.
  if (token === 'mock-jwt-token-for-admin') {
    req.user = { username: 'admin', role: 'admin' };
    next();
  } else {
    return res.status(403).json({ error: 'Invalid token.' });
  }
};
