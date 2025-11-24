import { parse } from 'cookie';

export default function handler(req, res) {
  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.training_auth;
    
    console.log('Auth check - Cookies:', cookies);
    console.log('Auth check - Token:', token ? 'Present' : 'Missing');
    
    if (token) {
      try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
        console.log('Auth check - Decoded:', decoded);
        
        if (decoded.type === 'training') {
          return res.status(200).json({ authenticated: true, user: decoded });
        }
      } catch (error) {
        console.error('Auth token decode error:', error);
      }
    }
    
    return res.status(200).json({ authenticated: false });
  } catch (error) {
    console.error('Auth check error:', error);
    return res.status(200).json({ authenticated: false });
  }
}