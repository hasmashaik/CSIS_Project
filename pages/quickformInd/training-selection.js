import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function TrainingSelection() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('it');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      router.push('/quickformlnd');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <header className="header">
        <div className="user-welcome">
          <h1>Training Selection</h1>
          <div className="user-info">
            Welcome, <strong>{user.displayName}</strong>
          </div>
        </div>
        <button onClick={() => window.location.href = '/quickformlnd'} className="back-btn">
          ← Back to Login
        </button>
      </header>

      {/* Tabs Navigation */}
      <div className="tabs-container">
        <button
          onClick={() => setActiveTab('it')}
          className={`tab-button ${activeTab === 'it' ? 'active' : ''}`}
        >
          IT Training
        </button>
        <button
          onClick={() => setActiveTab('nonit')}
          className={`tab-button ${activeTab === 'nonit' ? 'active' : ''}`}
        >
          Non-IT Training
        </button>
        <button
          onClick={() => setActiveTab('internship')}
          className={`tab-button ${activeTab === 'internship' ? 'active' : ''}`}
        >
          Internship
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'it' && (
          <div className="tab-panel">
            <h2>IT Training Programs</h2>
            <p>Select from our IT training programs:</p>
            <ul className="course-list">
              <li>Python Fullstack+AI</li>
              <li>Java Fullstack</li>
              <li>Data Analytics</li>
              <li>Business Analytics</li>
              <li>HR Analytics</li>
            </ul>
            <button 
              onClick={() => window.location.href = '/quickformlnd/it'}
              className="action-btn"
            >
              Go to IT Training →
            </button>
          </div>
        )}

        {activeTab === 'nonit' && (
          <div className="tab-panel">
            <h2>Non-IT Training Programs</h2>
            <p>Select from our Non-IT training programs:</p>
            <ul className="course-list">
              <li>Digital Marketing</li>
              <li>Zoho Payroll Training</li>
              <li>Business Management</li>
            </ul>
            <button 
              onClick={() => window.location.href = '/quickformlnd/nonit'}
              className="action-btn"
            >
              Go to Non-IT Training →
            </button>
          </div>
        )}

        {activeTab === 'internship' && (
          <div className="tab-panel">
            <h2>Internship Programs</h2>
            <p>Select from our internship programs:</p>
            <ul className="course-list">
              <li>Web Development Internship</li>
              <li>Data Science Internship</li>
              <li>Digital Marketing Internship</li>
              <li>Business Analytics Internship</li>
            </ul>
            <button 
              onClick={() => window.location.href = '/quickformlnd/internship'}
              className="action-btn"
            >
              Go to Internship →
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 2px solid #e9ecef;
        }

        .user-welcome h1 {
          color: #2c3e50;
          margin: 0 0 5px 0;
          font-size: 28px;
        }

        .user-info {
          color: #495057;
          font-size: 16px;
          background: #e7f3ff;
          padding: 8px 15px;
          border-radius: 4px;
          display: inline-block;
        }

        .back-btn {
          background: #6c757d;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.3s;
          margin-top: 5px;
        }

        .back-btn:hover {
          background: #5a6268;
        }

        .tabs-container {
          display: flex;
          margin-bottom: 0;
          border-bottom: 1px solid #dee2e6;
        }

        .tab-button {
          padding: 12px 24px;
          border: none;
          background: #f8f9fa;
          color: #495057;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s;
          border-bottom: 3px solid transparent;
        }

        .tab-button:hover {
          background: #e9ecef;
        }

        .tab-button.active {
          background: #007bff;
          color: white;
          border-bottom: 3px solid #0056b3;
        }

        .tab-content {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 0 5px 5px 5px;
          min-height: 300px;
        }

        .tab-panel h2 {
          color: #2c3e50;
          margin-bottom: 15px;
          font-size: 24px;
        }

        .tab-panel p {
          color: #495057;
          margin-bottom: 20px;
          font-size: 16px;
        }

        .course-list {
          list-style: none;
          padding: 0;
          margin-bottom: 25px;
        }

        .course-list li {
          padding: 8px 0;
          color: #495057;
          font-size: 16px;
          border-bottom: 1px solid #dee2e6;
        }

        .course-list li:before {
          content: "•";
          color: #007bff;
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }

        .action-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          transition: background 0.3s;
        }

        .action-btn:hover {
          background: #0056b3;
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 15px;
          }
          
          .tabs-container {
            flex-direction: column;
          }
          
          .tab-button {
            border-radius: 0;
            border-bottom: 1px solid #dee2e6;
          }
          
          .tab-content {
            border-radius: 0 0 5px 5px;
          }
        }
      `}</style>
    </div>
  );
}