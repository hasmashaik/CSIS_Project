import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Internship() {
  const [user, setUser] = useState(null);
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
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Internship Programs</h1>
      <p>Welcome to Internship Programs, <strong>{user.displayName}</strong></p>
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
        <h2>Available Internships:</h2>
        <ul>
          <li>Web Development Internship</li>
          <li>Data Science Internship</li>
          <li>Digital Marketing Internship</li>
          <li>Business Analytics Internship</li>
        </ul>
      </div>
      <button 
        onClick={() => window.location.href = '/quickformlnd/training-selection'}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          background: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        ← Back to Training Selection
      </button>
    </div>
  );
}