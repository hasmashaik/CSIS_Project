"use client";
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function QuickFormLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Hardcoded credentials
    const validUsername = 'careerschoolit';
    const validPassword = 'careerschoolit@1';

    if (username === validUsername && password === validPassword) {
      // Store user data in localStorage
      const userData = {
        username: username,
        displayName: 'Career School IT',
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      // Redirect to quickform details page
      router.push('/quickformLnd/quickformdetails');
    } else {
      setError('Invalid username or password');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>QuickForm Dashboard v2.0</h1>
          <p>Manage Job & Training Enquiries</p>
        </div>

        <div className="login-form">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username *</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Username: <strong>careerschoolit</strong></p>
            <p>Password: <strong>careerschoolit@1</strong></p>
          </div>
        </div>

        <div className="login-footer">
          <p>© 2024 Career School IT - Admin Access Only</p>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .login-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          width: 100%;
          max-width: 420px;
        }
        .login-header {
          background: linear-gradient(135deg, #007bff, #0056b3);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .login-header h1 {
          margin: 0 0 10px 0;
          font-size: 28px;
          font-weight: 700;
        }
        .login-header p {
          margin: 0;
          opacity: 0.9;
          font-size: 16px;
        }
        .login-form {
          padding: 40px 30px;
        }
        .login-form h2 {
          text-align: center;
          margin: 0 0 30px 0;
          color: #333;
          font-size: 24px;
          font-weight: 600;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #555;
          font-weight: 500;
          fontSize: 14px;
        }
        .form-group input {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s, box-shadow 0.3s;
          box-sizing: border-box;
        }
        .form-group input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }
        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 20px;
          text-align: center;
          border: 1px solid #f5c6cb;
        }
        .login-btn {
          width: 100%;
          background: linear-gradient(135deg, #007bff, #0056b3);
          color: white;
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          margin-bottom: 20px;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
        }
        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        .demo-credentials {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #e9ecef;
          text-align: center;
        }
        .demo-credentials p {
          margin: 5px 0;
          font-size: 14px;
          color: #6c757d;
        }
        .demo-credentials strong {
          color: #495057;
        }
        .login-footer {
          background: #f8f9fa;
          padding: 15px;
          text-align: center;
          border-top: 1px solid #e9ecef;
        }
        .login-footer p {
          margin: 0;
          color: #6c757d;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}