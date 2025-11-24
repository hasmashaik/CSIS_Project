"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function QuickFormDetails() {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      router.push('/quickformInd');
      return;
    }
    fetchEnquiries();
  }, [router]);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/enquiries');
      if (response.ok) {
        const data = await response.json();
        setEnquiries(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry =>
    enquiry.id?.toString().includes(searchTerm) ||
    enquiry.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.phone?.includes(searchTerm) ||
    enquiry.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.course?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    
    try {
      const response = await fetch(`/api/enquiries?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setEnquiries(enquiries.filter(enquiry => enquiry.id !== id));
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/quickformInd');
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>QuickForm Enquiries</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <input
            type="text"
            placeholder="Search by ID, name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px', width: '300px' }}
          />
          <span style={{ marginLeft: '10px' }}>🔍</span>
        </div>
        <button onClick={handleLogout} style={{ padding: '10px 20px', background: 'red', color: 'white', border: 'none' }}>
          Logout
        </button>
      </div>

      <p>Total Records: {filteredEnquiries.length}</p>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Phone</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Location</th>
            <th style={{ padding: '10px' }}>Course</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEnquiries.map((enquiry) => (
            <tr key={enquiry.id}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{enquiry.id}</td>
              <td style={{ padding: '10px' }}>{enquiry.full_name}</td>
              <td style={{ padding: '10px' }}>{enquiry.phone}</td>
              <td style={{ padding: '10px' }}>{enquiry.email}</td>
              <td style={{ padding: '10px' }}>{enquiry.location}</td>
              <td style={{ padding: '10px' }}>{enquiry.course}</td>
              <td style={{ padding: '10px' }}>
                <button 
                  onClick={() => handleDelete(enquiry.id)}
                  style={{ padding: '5px 10px', background: 'red', color: 'white', border: 'none' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredEnquiries.length === 0 && !loading && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          {searchTerm ? 'No records found matching your search.' : 'No records found.'}
        </p>
      )}
    </div>
  );
}