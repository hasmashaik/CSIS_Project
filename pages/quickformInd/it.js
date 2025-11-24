import { useState, useEffect } from 'react';
import { connectToTrainingDatabase } from '../../lib/db-training';

export default function ITTraining({ initialApplications }) {
  const [applications, setApplications] = useState(initialApplications || []);
  const [filteredApplications, setFilteredApplications] = useState(initialApplications || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      const filtered = applications.filter(app =>
        app.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone_number?.includes(searchTerm) ||
        app.selected_course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.current_city?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredApplications(filtered);
    } else {
      setFilteredApplications(applications);
    }
  }, [searchTerm, applications]);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/training/it');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleDeleteClick = (application) => {
    setSelectedApplication(application);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedApplication) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/training/it?id=${selectedApplication.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Application deleted successfully!');
        await fetchApplications();
      } else {
        setMessage('Error deleting application');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('Error deleting application');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setSelectedApplication(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedApplication(null);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>IT Training Applications</h1>
        <div className="header-buttons">
          <button onClick={() => window.location.href = '/quickformlnd/training-selection'} className="back-btn">
            ← Back to Selection
          </button>
          <button onClick={() => window.location.href = '/quickformlnd'} className="back-btn">
            ← Logout
          </button>
        </div>
      </header>

      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, phone, course, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="stats">
          Showing {filteredApplications.length} of {applications.length} applications
        </div>
      </div>

      {message && (
        <div className={`message ${message.includes('deleted') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="applications-section">
        <h2>IT Training Applications ({applications.length})</h2>
        {filteredApplications.length === 0 ? (
          <div className="no-data">
            {searchTerm ? 'No applications found matching your search.' : 'No IT training applications found.'}
          </div>
        ) : (
          <div className="applications-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Country Code</th>
                  <th>Course</th>
                  <th>City</th>
                  <th>Special Requirements</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id}>
                    <td className="id-cell">#{app.id}</td>
                    <td>{app.full_name}</td>
                    <td>{app.email_address}</td>
                    <td>{app.phone_number}</td>
                    <td>
                      <span className={`badge ${app.country_code ? '' : 'empty'}`}>
                        {app.country_code || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <span className={`course-badge ${app.selected_course ? '' : 'empty'}`}>
                        {app.selected_course || 'Not specified'}
                      </span>
                    </td>
                    <td>
                      <span className={`location-badge ${app.current_city ? '' : 'empty'}`}>
                        {app.current_city || 'Not specified'}
                      </span>
                    </td>
                    <td className="requirements-cell">
                      {app.special_requirements || 'None'}
                    </td>
                    <td>{new Date(app.created_date).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteClick(app)}
                        className="delete-btn"
                        title="Delete application"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Confirm Delete</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this IT training application?</p>
              <p className="warning-text">This action cannot be undone.</p>
              {selectedApplication && (
                <div className="application-details">
                  <p><strong>ID:</strong> #{selectedApplication.id}</p>
                  <p><strong>Name:</strong> {selectedApplication.full_name}</p>
                  <p><strong>Email:</strong> {selectedApplication.email_address}</p>
                  <p><strong>Course:</strong> {selectedApplication.selected_course || 'Not specified'}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button onClick={handleDeleteCancel} className="cancel-btn" disabled={loading}>
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="confirm-delete-btn" disabled={loading}>
                {loading ? 'Deleting...' : 'OK, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #e9ecef;
        }

        .header h1 {
          color: #2c3e50;
          margin: 0;
          font-size: 28px;
        }

        .header-buttons {
          display: flex;
          gap: 10px;
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
        }

        .back-btn:hover {
          background: #5a6268;
        }

        .search-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 20px;
        }

        .search-box {
          position: relative;
          flex: 1;
          max-width: 500px;
        }

        .search-input {
          width: 100%;
          padding: 12px 40px 12px 15px;
          border: 2px solid #e9ecef;
          border-radius: 25px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .search-input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }

        .search-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
        }

        .stats {
          color: #6c757d;
          font-size: 14px;
          white-space: nowrap;
        }

        .message {
          padding: 12px 20px;
          border-radius: 4px;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .applications-section {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        h2 {
          color: #495057;
          margin-bottom: 20px;
          font-size: 20px;
        }

        .no-data {
          text-align: center;
          color: #6c757d;
          font-style: italic;
          padding: 40px;
          background: white;
          border-radius: 4px;
          border: 1px dashed #dee2e6;
        }

        .applications-table {
          max-height: 600px;
          overflow-x: auto;
          overflow-y: auto;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          background: white;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
          min-width: 1200px;
        }

        th, td {
          padding: 10px;
          border: 1px solid #dee2e6;
          text-align: left;
        }

        th {
          background: #e9ecef;
          color: #495057;
          font-weight: 600;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        tr:nth-child(even) {
          background: #f8f9fa;
        }

        tr:hover {
          background: #e3f2fd;
        }

        .id-cell {
          font-weight: 600;
          color: #495057;
          background: #f8f9fa;
        }

        .requirements-cell {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .badge, .course-badge, .location-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }

        .course-badge:not(.empty) {
          background: #e7f3ff;
          color: #0066cc;
        }

        .location-badge:not(.empty) {
          background: #f0f9ff;
          color: #0c6;
        }

        .badge:not(.empty) {
          background: #f8f9fa;
          color: #6c757d;
        }

        .course-badge.empty, .location-badge.empty, .badge.empty {
          background: #f8f9fa;
          color: #6c757d;
          font-style: italic;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 11px;
          transition: background 0.3s;
        }

        .delete-btn:hover {
          background: #c82333;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal {
          background: white;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          width: 90%;
          max-width: 500px;
          overflow: hidden;
        }

        .modal-header {
          background: #dc3545;
          color: white;
          padding: 20px;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 18px;
        }

        .modal-body {
          padding: 20px;
        }

        .modal-body p {
          margin: 0 0 10px 0;
          color: #495057;
        }

        .warning-text {
          color: #dc3545;
          font-weight: 600;
        }

        .application-details {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 4px;
          margin-top: 15px;
          border-left: 4px solid #dc3545;
        }

        .application-details p {
          margin: 5px 0;
          font-size: 14px;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding: 20px;
          background: #f8f9fa;
          border-top: 1px solid #dee2e6;
        }

        .cancel-btn {
          background: #6c757d;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .cancel-btn:hover:not(:disabled) {
          background: #5a6268;
        }

        .confirm-delete-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }

        .confirm-delete-btn:hover:not(:disabled) {
          background: #c82333;
        }

        .cancel-btn:disabled,
        .confirm-delete-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const connection = await connectToTrainingDatabase();
    const [rows] = await connection.execute('SELECT * FROM it_training ORDER BY created_date DESC');
    await connection.end();
    
    return {
      props: {
        initialApplications: JSON.parse(JSON.stringify(rows))
      }
    };
  } catch (error) {
    console.error('Database error in getServerSideProps:', error);
    return {
      props: {
        initialApplications: []
      }
    };
  }
}


