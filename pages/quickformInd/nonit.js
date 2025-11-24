// import { useState } from 'react';

// export default function NonITTraining() {
//   const [formData, setFormData] = useState({
//     full_name: '',
//     email_address: '',
//     phone_number: '',
//     current_city: '',
//     selected_course: '',
//     special_requirements: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const response = await fetch('/api/training-nonit', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const result = await response.json();
      
//       if (result.success) {
//         setMessage('Non-IT Training application submitted successfully!');
//         setFormData({
//           full_name: '', email_address: '', phone_number: '',
//           current_city: '', selected_course: '', special_requirements: ''
//         });
//       } else {
//         setMessage('Error: ' + result.error);
//       }
//     } catch (error) {
//       setMessage('Failed to submit application. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
//       <h1>Non-IT Training Application</h1>
      
//       {message && (
//         <div style={{ 
//           padding: '10px', margin: '10px 0', 
//           backgroundColor: message.includes('Error') ? '#ffebee' : '#e8f5e8',
//           border: `1px solid ${message.includes('Error') ? '#f44336' : '#4caf50'}`
//         }}>
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '15px' }}>
//           <label>Full Name *</label>
//           <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label>Email Address *</label>
//           <input type="email" name="email_address" value={formData.email_address} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label>Phone Number</label>
//           <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label>Current City</label>
//           <input type="text" name="current_city" value={formData.current_city} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label>Selected Course *</label>
//           <select name="selected_course" value={formData.selected_course} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
//             <option value="">Select a course</option>
//             <option value="Digital Marketing">Digital Marketing</option>
//             <option value="Business Management">Business Management</option>
//             <option value="Financial Accounting">Financial Accounting</option>
//           </select>
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label>Special Requirements</label>
//           <textarea name="special_requirements" value={formData.special_requirements} onChange={handleChange} rows="4" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//         </div>

//         <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', backgroundColor: loading ? '#ccc' : '#0070f3', color: 'white', border: 'none' }}>
//           {loading ? 'Submitting...' : 'Submit Application'}
//         </button>
//       </form>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function NonITTraining() {
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
      <h1>Non-IT Training Programs</h1>
      <p>Welcome to Non-IT Training, <strong>{user.displayName}</strong></p>
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
        <h2>Available Non-IT Courses:</h2>
        <ul>
          <li>Digital Marketing</li>
          <li>Zoho Payroll Training</li>
          <li>Business Management</li>
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