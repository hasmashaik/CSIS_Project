// "use client";
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// export default function QuickFormDetails() {
//   const [enquiries, setEnquiries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const userData = localStorage.getItem('currentUser');
//     if (!userData) {
//       router.push('/quickformLnd');
//       return;
//     }
//     fetchEnquiries();
//   }, [router]);

//   const fetchEnquiries = async () => {
//     try {
//       const response = await fetch('/api/enquiries');
//       if (response.ok) {
//         const data = await response.json();
//         setEnquiries(data);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredEnquiries = enquiries.filter(enquiry =>
//     enquiry.id?.toString().includes(searchTerm) ||
//     enquiry.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     enquiry.phone?.includes(searchTerm) ||
//     enquiry.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     enquiry.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     enquiry.status?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const response = await fetch(`/api/enquiries?id=${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });
      
//       if (response.ok) {
//         setEnquiries(enquiries.map(enquiry => 
//           enquiry.id === id ? { ...enquiry, status: newStatus } : enquiry
//         ));
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone!')) return;
    
//     try {
//       const response = await fetch(`/api/enquiries?id=${id}`, { method: 'DELETE' });
//       if (response.ok) {
//         setEnquiries(enquiries.filter(enquiry => enquiry.id !== id));
//       }
//     } catch (error) {
//       console.error('Error deleting enquiry:', error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     router.push('/quickformLnd');
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'pending': return '#ffc107';
//       case 'ongoing': return '#17a2b8';
//       case 'completed': return '#28a745';
//       default: return '#6c757d';
//     }
//   };

//   const getStatusTextColor = (status) => {
//     return status?.toLowerCase() === 'pending' ? '#000' : '#fff';
//   };

//   if (loading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         minHeight: '100vh',
//         backgroundColor: '#f8f9fa'
//       }}>
//         <div style={{ 
//           background: 'white', 
//           padding: '40px', 
//           borderRadius: '10px',
//           boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//           textAlign: 'center'
//         }}>
//           <h2 style={{ color: '#333', marginBottom: '20px' }}>Loading Enquiries...</h2>
//           <div style={{ 
//             width: '40px', 
//             height: '40px', 
//             border: '4px solid #f3f3f3',
//             borderTop: '4px solid #007bff',
//             borderRadius: '50%',
//             animation: 'spin 1s linear infinite',
//             margin: '0 auto'
//           }}></div>
//         </div>
//         <style jsx>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <div style={{ 
//       minHeight: '100vh',
//       backgroundColor: '#f8f9fa',
//       padding: '20px',
//       fontFamily: 'Arial, sans-serif'
//     }}>
//       <div style={{ 
//         maxWidth: '1200px', 
//         margin: '0 auto',
//         background: 'white',
//         borderRadius: '10px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//         overflow: 'hidden'
//       }}>
        
//         {/* Header */}
//         <div style={{ 
//           backgroundColor: '#2c3e50',
//           padding: '25px 30px',
//           color: 'white'
//         }}>
//           <div style={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center',
//             flexWrap: 'wrap',
//             gap: '20px'
//           }}>
//             <div>
//               <h1 style={{ 
//                 margin: '0 0 5px 0', 
//                 fontSize: '1.8rem',
//                 fontWeight: '600'
//               }}>
//                 QuickForm Enquiries
//               </h1>
//               <p style={{ 
//                 margin: '0',
//                 fontSize: '1rem',
//                 opacity: '0.8'
//               }}>
//                 Manage and monitor all course enquiries
//               </p>
//             </div>
            
//             <button 
//               onClick={handleLogout} 
//               style={{ 
//                 padding: '10px 20px', 
//                 backgroundColor: '#e74c3c', 
//                 color: 'white', 
//                 border: 'none',
//                 borderRadius: '5px',
//                 cursor: 'pointer',
//                 fontWeight: '500',
//                 fontSize: '14px',
//                 transition: 'background-color 0.2s ease'
//               }}
//               onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
//               onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Search and Controls */}
//         <div style={{ 
//           padding: '25px 30px',
//           borderBottom: '1px solid #e9ecef'
//         }}>
//           <div style={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center',
//             flexWrap: 'wrap',
//             gap: '20px'
//           }}>
//             <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
//               <input
//                 type="text"
//                 placeholder="Search by ID, name, email, phone, location, course, or status..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{ 
//                   padding: '12px 45px 12px 15px',
//                   width: '100%',
//                   border: '1px solid #ddd',
//                   borderRadius: '5px',
//                   fontSize: '14px',
//                   outline: 'none',
//                   transition: 'border-color 0.2s ease'
//                 }}
//                 onFocus={(e) => e.target.style.borderColor = '#007bff'}
//                 onBlur={(e) => e.target.style.borderColor = '#ddd'}
//               />
//               <div style={{
//                 position: 'absolute',
//                 right: '15px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 color: '#666',
//                 fontSize: '16px'
//               }}>
//                 🔍
//               </div>
//             </div>
            
//             <div style={{ 
//               backgroundColor: '#f8f9fa',
//               padding: '8px 16px',
//               borderRadius: '5px',
//               fontWeight: '500',
//               color: '#495057',
//               border: '1px solid #e9ecef'
//             }}>
//               Total Records: <span style={{ color: '#007bff', fontWeight: '600' }}>{filteredEnquiries.length}</span>
//             </div>
//           </div>
//         </div>

//         {/* Table Container */}
//         <div style={{ padding: '0' }}>
//           {filteredEnquiries.length === 0 ? (
//             <div style={{ 
//               textAlign: 'center', 
//               padding: '50px 20px',
//               color: '#6c757d'
//             }}>
//               <div style={{ fontSize: '48px', marginBottom: '15px', opacity: '0.5' }}>📊</div>
//               <h3 style={{ margin: '0 0 10px 0', color: '#495057', fontWeight: '500' }}>
//                 {searchTerm ? 'No matching records found' : 'No enquiries yet'}
//               </h3>
//               <p style={{ margin: '0', fontSize: '14px' }}>
//                 {searchTerm ? 'Try adjusting your search terms' : 'Enquiries will appear here once submitted'}
//               </p>
//             </div>
//           ) : (
//             <div style={{ 
//               overflowX: 'auto'
//             }}>
//               <table style={{ 
//                 width: '100%', 
//                 borderCollapse: 'collapse',
//                 minWidth: '900px'
//               }}>
//                 <thead>
//                   <tr style={{ 
//                     backgroundColor: '#f8f9fa',
//                     borderBottom: '2px solid #dee2e6'
//                   }}>
//                     <th style={{ 
//                       padding: '15px', 
//                       textAlign: 'center', 
//                       fontWeight: '600',
//                       color: '#495057',
//                       fontSize: '13px',
//                       textTransform: 'uppercase',
//                       letterSpacing: '0.5px'
//                     }}>ID</th>
//                     <th style={{ 
//                       padding: '15px', 
//                       textAlign: 'left', 
//                       fontWeight: '600',
//                       color: '#495057',
//                       fontSize: '13px',
//                       textTransform: 'uppercase',
//                       letterSpacing: '0.5px'
//                     }}>Name</th>
//                     <th style={{ 
//                       padding: '15px', 
//                       textAlign: 'left', 
//                       fontWeight: '600',
//                       color: '#495057',
//                       fontSize: '13px',
//                       textTransform: 'uppercase',
//                       letterSpacing: '0.5px'
//                     }}>Phone</th>
//                     <th style={{ 
//                       padding: '15px', 
//                       textAlign: 'left', 
//                       fontWeight: '600',
//                       color: '#495057',
//                       fontSize: '13px',
//                       textTransform: 'uppercase',
//                       letterSpacing: '0.5px'
//                     }}>Email</th>
//                     <th style={{ 
//                       padding: '15px', 
//                       textAlign: 'left', 
//                       fontWeight: '600',
//                       color: '#495057',
//                       fontSize: '13px',
//                       textTransform: 'uppercase',
//                       letterSpacing: '0.5px'
//                     }}>Location</th>
//                     <th style={{ 
//                       padding: '15px', 
//                       textAlign: 'left', 
//                       fontWeight: '600',
//                       color: '#495057',
//                       fontSize: '13px',
//                       textTransform: 'uppercase',
//                       letterSpacing: '0.5px'
//                     }}>Course</th>
//                     <th style={{ 
//                       padding: '15px', 
//                       textAlign: 'center', 
//                       fontWeight: '600',
//                       color: '#495057',
//                       fontSize: '13px',
//                       textTransform: 'uppercase',
//                       letterSpacing: '0.5px'
//                     }}>Status</th>
//                     <th style={{ 
//                       padding: '15px', 
//                       textAlign: 'center', 
//                       fontWeight: '600',
//                       color: '#495057',
//                       fontSize: '13px',
//                       textTransform: 'uppercase',
//                       letterSpacing: '0.5px'
//                     }}>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredEnquiries.map((enquiry, index) => (
//                     <tr 
//                       key={enquiry.id} 
//                       style={{ 
//                         borderBottom: '1px solid #e9ecef',
//                         backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
//                         transition: 'background-color 0.2s ease'
//                       }}
//                       onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
//                       onMouseOut={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fff' : '#f8f9fa'}
//                     >
//                       <td style={{ 
//                         padding: '15px', 
//                         textAlign: 'center',
//                         fontWeight: '600',
//                         color: '#007bff',
//                         fontSize: '14px'
//                       }}>{enquiry.id}</td>
//                       <td style={{ 
//                         padding: '15px',
//                         fontWeight: '500',
//                         color: '#333'
//                       }}>{enquiry.full_name}</td>
//                       <td style={{ padding: '15px', color: '#555', fontSize: '14px' }}>{enquiry.phone}</td>
//                       <td style={{ padding: '15px', color: '#555', fontSize: '14px' }}>{enquiry.email}</td>
//                       <td style={{ padding: '15px', color: '#555', fontSize: '14px' }}>{enquiry.location}</td>
//                       <td style={{ padding: '15px', color: '#555', fontSize: '14px' }}>
//                         {enquiry.course}
//                       </td>
//                       <td style={{ padding: '15px', textAlign: 'center' }}>
//                         <select
//                           value={enquiry.status || 'Pending'}
//                           onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
//                           style={{
//                             padding: '6px 10px',
//                             border: '1px solid #ddd',
//                             borderRadius: '4px',
//                             fontSize: '13px',
//                             fontWeight: '500',
//                             backgroundColor: getStatusColor(enquiry.status),
//                             color: getStatusTextColor(enquiry.status),
//                             cursor: 'pointer',
//                             outline: 'none',
//                             minWidth: '120px'
//                           }}
//                         >
//                           <option value="Pending">Pending</option>
//                           <option value="Ongoing">On Going</option>
//                           <option value="Completed">Completed</option>
//                         </select>
//                       </td>
//                       <td style={{ padding: '15px', textAlign: 'center' }}>
//                         <button 
//                           onClick={() => handleDelete(enquiry.id)}
//                           style={{ 
//                             padding: '6px 10px', 
//                             backgroundColor: '#dc3545', 
//                             color: 'white', 
//                             border: 'none',
//                             borderRadius: '4px',
//                             cursor: 'pointer',
//                             fontSize: '14px',
//                             transition: 'background-color 0.2s ease'
//                           }}
//                           onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
//                           onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
//                           title="Delete this record"
//                         >
//                           🗑️
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function QuickFormDetails() {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [editComment, setEditComment] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      router.push('/quickformLnd');
      return;
    }
    fetchEnquiries();
  }, [router]);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/quickform');
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

  const fetchEnquiriesWithSearch = async () => {
    try {
      const url = searchTerm 
        ? `/api/quickform?search=${encodeURIComponent(searchTerm)}`
        : '/api/quickform';
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setEnquiries(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    fetchEnquiriesWithSearch();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/quickform?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        setEnquiries(enquiries.map(enquiry => 
          enquiry.id === id ? { ...enquiry, status: newStatus } : enquiry
        ));
        
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({...selectedEnquiry, status: newStatus});
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCommentUpdate = async (id) => {
    if (!editComment.trim()) return;
    
    try {
      const response = await fetch(`/api/quickform?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: editComment }),
      });
      
      if (response.ok) {
        setEnquiries(enquiries.map(enquiry => 
          enquiry.id === id ? { ...enquiry, comment: editComment } : enquiry
        ));
        
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({...selectedEnquiry, comment: editComment});
        }
        
        setEditComment('');
        alert('Comment updated successfully!');
      }
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone!')) return;
    
    try {
      const response = await fetch(`/api/quickform?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setEnquiries(enquiries.filter(enquiry => enquiry.id !== id));
        if (selectedEnquiry && selectedEnquiry.id === id) {
          closeDetails();
        }
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/quickformLnd');
  };

  const viewEnquiryDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setEditComment(enquiry.comment || '');
  };

  const closeDetails = () => {
    setSelectedEnquiry(null);
    setEditComment('');
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '#ffc107';
      case 'ongoing': return '#17a2b8';
      case 'completed': return '#28a745';
      case 'contacted': return '#6f42c1';
      case 'not interested': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusTextColor = (status) => {
    return status?.toLowerCase() === 'pending' ? '#000' : '#fff';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const extractEnquiryType = (comment) => {
    if (!comment) return 'Training';
    if (comment.includes('Enquiry Type: Jobs')) return 'Jobs';
    if (comment.includes('Enquiry Type: Courses / Internship')) return 'Training';
    if (comment.includes('Job:')) return 'Jobs';
    return 'Training';
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '40px', 
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#333', marginBottom: '20px' }}>Loading Enquiries...</h2>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Details Modal */}
      {selectedEnquiry && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '30px',
            maxWidth: '700px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 5px 30px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '2px solid #eee',
              paddingBottom: '15px'
            }}>
              <div>
                <h2 style={{ margin: 0, color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  Enquiry Details
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: extractEnquiryType(selectedEnquiry.comment) === 'Jobs' ? '#e8f5e9' : '#e3f2fd',
                    color: extractEnquiryType(selectedEnquiry.comment) === 'Jobs' ? '#2e7d32' : '#1565c0'
                  }}>
                    {extractEnquiryType(selectedEnquiry.comment)}
                  </span>
                </h2>
                <p style={{ margin: '5px 0 0 0', color: '#7f8c8d', fontSize: '14px' }}>
                  ID: {selectedEnquiry.id} • Submitted: {formatDate(selectedEnquiry.created_at)}
                </p>
              </div>
              <button 
                onClick={closeDetails}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#7f8c8d',
                  padding: '5px'
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
              marginBottom: '25px'
            }}>
              <div style={{ gridColumn: 'span 2', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                <strong style={{ display: 'block', marginBottom: '5px' }}>Full Name:</strong>
                <span>{selectedEnquiry.full_name}</span>
              </div>
              
              <div>
                <strong style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Contact:</strong>
                <div>📞 {selectedEnquiry.country_code || '+91'} {selectedEnquiry.phone}</div>
                <div>✉️ {selectedEnquiry.email}</div>
              </div>
              
              <div>
                <strong style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Location:</strong>
                <div>📍 {selectedEnquiry.city || selectedEnquiry.location || 'N/A'}</div>
                <div>🏛️ {selectedEnquiry.state || 'N/A'}</div>
              </div>
              
              <div>
                <strong style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Experience:</strong>
                <span>{selectedEnquiry.experience || 'N/A'}</span>
              </div>
              
              <div>
                <strong style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Training Mode:</strong>
                <span>{selectedEnquiry.branch || 'N/A'}</span>
              </div>
              
              <div style={{ gridColumn: 'span 2' }}>
                <strong style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Course / Job Role:</strong>
                <span style={{ 
                  padding: '8px 12px', 
                  backgroundColor: '#e9ecef', 
                  borderRadius: '5px',
                  display: 'inline-block',
                  fontWeight: '500'
                }}>
                  {selectedEnquiry.course || 'N/A'}
                </span>
              </div>
              
              <div style={{ gridColumn: 'span 2' }}>
                <strong style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Status:</strong>
                <select
                  value={selectedEnquiry.status || 'Pending'}
                  onChange={(e) => {
                    handleStatusChange(selectedEnquiry.id, e.target.value);
                    setSelectedEnquiry({...selectedEnquiry, status: e.target.value});
                  }}
                  style={{
                    padding: '8px 15px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: getStatusColor(selectedEnquiry.status),
                    color: getStatusTextColor(selectedEnquiry.status),
                    cursor: 'pointer',
                    outline: 'none',
                    width: '100%',
                    maxWidth: '200px'
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Ongoing">On Going</option>
                  <option value="Completed">Completed</option>
                  <option value="Not Interested">Not Interested</option>
                </select>
              </div>
              
              <div style={{ gridColumn: 'span 2' }}>
                <strong style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Comments:</strong>
                <div style={{ 
                  padding: '10px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '5px',
                  minHeight: '60px',
                  marginBottom: '10px',
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedEnquiry.comment || 'No comments'}
                </div>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <input
                    type="text"
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    placeholder="Add or update comment..."
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                  <button
                    onClick={() => handleCommentUpdate(selectedEnquiry.id)}
                    disabled={!editComment.trim()}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: editComment.trim() ? '#3498db' : '#95a5a6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: editComment.trim() ? 'pointer' : 'not-allowed',
                      fontSize: '14px'
                    }}
                  >
                    Update Comment
                  </button>
                </div>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid #eee'
            }}>
              <div>
                <button
                  onClick={() => {
                    const enquiryText = `
Enquiry ID: ${selectedEnquiry.id}
Name: ${selectedEnquiry.full_name}
Phone: ${selectedEnquiry.country_code || '+91'} ${selectedEnquiry.phone}
Email: ${selectedEnquiry.email}
Course/Role: ${selectedEnquiry.course}
Location: ${selectedEnquiry.city || 'N/A'}, ${selectedEnquiry.state || 'N/A'}
Experience: ${selectedEnquiry.experience || 'N/A'}
Mode: ${selectedEnquiry.branch || 'N/A'}
Status: ${selectedEnquiry.status || 'Pending'}
Date: ${formatDate(selectedEnquiry.created_at)}
Comments: ${selectedEnquiry.comment || 'N/A'}
                    `.trim();
                    
                    navigator.clipboard.writeText(enquiryText);
                    alert('Enquiry details copied to clipboard!');
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  📋 Copy Details
                </button>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this enquiry?')) {
                      handleDelete(selectedEnquiry.id);
                    }
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  🗑️ Delete
                </button>
                <button
                  onClick={closeDetails}
                  style={{
                    padding: '8px 20px',
                    backgroundColor: '#7f8c8d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{ 
          backgroundColor: '#2c3e50',
          padding: '25px 30px',
          color: 'white'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h1 style={{ 
                margin: '0 0 5px 0', 
                fontSize: '1.8rem',
                fontWeight: '600'
              }}>
                Course Enquiries Dashboard
              </h1>
              <p style={{ 
                margin: '0',
                fontSize: '1rem',
                opacity: '0.8'
              }}>
                Manage training and job enquiries from the popup form
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={fetchEnquiries}
                style={{ 
                  padding: '10px 20px', 
                  backgroundColor: '#3498db', 
                  color: 'white', 
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px',
                  transition: 'background-color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
              >
                ↻ Refresh
              </button>
              <button 
                onClick={handleLogout} 
                style={{ 
                  padding: '10px 20px', 
                  backgroundColor: '#e74c3c', 
                  color: 'white', 
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px',
                  transition: 'background-color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
              >
                ⎋ Logout
              </button>
            </div>
          </div>
        </div>

        {/* Search and Stats */}
        <div style={{ 
          padding: '25px 30px',
          borderBottom: '1px solid #e9ecef'
        }}>
          <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
            <div style={{ 
              display: 'flex', 
              gap: '15px',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
                <input
                  type="text"
                  placeholder="Search by name, phone, email, course, location, or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ 
                    padding: '12px 45px 12px 15px',
                    width: '100%',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#007bff'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
                <div style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#666',
                  fontSize: '16px'
                }}>
                  🔍
                </div>
              </div>
              
              <button 
                type="submit"
                style={{ 
                  padding: '12px 24px', 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
              >
                Search
              </button>
              
              <button 
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  fetchEnquiries();
                }}
                style={{ 
                  padding: '12px 24px', 
                  backgroundColor: '#6c757d', 
                  color: 'white', 
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
              >
                Clear
              </button>
            </div>
          </form>
          
          <div style={{ 
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{ 
              backgroundColor: '#f8f9fa',
              padding: '15px 20px',
              borderRadius: '5px',
              fontWeight: '500',
              color: '#495057',
              border: '1px solid #e9ecef',
              minWidth: '150px'
            }}>
              <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '5px' }}>Total Records</div>
              <div style={{ color: '#007bff', fontWeight: '600', fontSize: '24px' }}>{enquiries.length}</div>
            </div>
            
            <div style={{ 
              backgroundColor: '#f8f9fa',
              padding: '15px 20px',
              borderRadius: '5px',
              fontWeight: '500',
              color: '#495057',
              border: '1px solid #e9ecef',
              minWidth: '150px'
            }}>
              <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '5px' }}>Pending</div>
              <div style={{ color: '#ffc107', fontWeight: '600', fontSize: '24px' }}>
                {enquiries.filter(e => e.status === 'Pending').length}
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: '#f8f9fa',
              padding: '15px 20px',
              borderRadius: '5px',
              fontWeight: '500',
              color: '#495057',
              border: '1px solid #e9ecef',
              minWidth: '150px'
            }}>
              <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '5px' }}>Contacted</div>
              <div style={{ color: '#6f42c1', fontWeight: '600', fontSize: '24px' }}>
                {enquiries.filter(e => e.status === 'Contacted').length}
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: '#f8f9fa',
              padding: '15px 20px',
              borderRadius: '5px',
              fontWeight: '500',
              color: '#495057',
              border: '1px solid #e9ecef',
              minWidth: '150px'
            }}>
              <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '5px' }}>Completed</div>
              <div style={{ color: '#28a745', fontWeight: '600', fontSize: '24px' }}>
                {enquiries.filter(e => e.status === 'Completed').length}
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div style={{ padding: '0' }}>
          {enquiries.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '50px 20px',
              color: '#6c757d'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px', opacity: '0.5' }}>📊</div>
              <h3 style={{ margin: '0 0 10px 0', color: '#495057', fontWeight: '500' }}>
                No enquiries yet
              </h3>
              <p style={{ margin: '0', fontSize: '14px' }}>
                Enquiries will appear here once submitted through the popup form
              </p>
            </div>
          ) : (
            <div style={{ 
              overflowX: 'auto'
            }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                minWidth: '1200px'
              }}>
                <thead>
                  <tr style={{ 
                    backgroundColor: '#f8f9fa',
                    borderBottom: '2px solid #dee2e6'
                  }}>
                    <th style={{ 
                      padding: '15px', 
                      textAlign: 'center', 
                      fontWeight: '600',
                      color: '#495057',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>ID</th>
                    <th style={{ 
                      padding: '15px', 
                      textAlign: 'left', 
                      fontWeight: '600',
                      color: '#495057',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Name & Contact</th>
                    <th style={{ 
                      padding: '15px', 
                      textAlign: 'left', 
                      fontWeight: '600',
                      color: '#495057',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Course / Role</th>
                    <th style={{ 
                      padding: '15px', 
                      textAlign: 'left', 
                      fontWeight: '600',
                      color: '#495057',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Location</th>
                    <th style={{ 
                      padding: '15px', 
                      textAlign: 'center', 
                      fontWeight: '600',
                      color: '#495057',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Status</th>
                    <th style={{ 
                      padding: '15px', 
                      textAlign: 'center', 
                      fontWeight: '600',
                      color: '#495057',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Date</th>
                    <th style={{ 
                      padding: '15px', 
                      textAlign: 'center', 
                      fontWeight: '600',
                      color: '#495057',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry, index) => (
                    <tr 
                      key={enquiry.id} 
                      style={{ 
                        borderBottom: '1px solid #e9ecef',
                        backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fff' : '#f8f9fa'}
                    >
                      <td style={{ 
                        padding: '15px', 
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#007bff',
                        fontSize: '14px'
                      }}>
                        #{enquiry.id}
                      </td>
                      <td style={{ padding: '15px' }}>
                        <div style={{ fontWeight: '500', color: '#333', marginBottom: '5px' }}>
                          {enquiry.full_name}
                        </div>
                        <div style={{ fontSize: '13px', color: '#666', marginBottom: '3px' }}>
                          📞 {enquiry.country_code || '+91'} {enquiry.phone}
                        </div>
                        <div style={{ fontSize: '13px', color: '#666' }}>
                          ✉️ {enquiry.email}
                        </div>
                      </td>
                      <td style={{ padding: '15px', color: '#555', fontSize: '14px' }}>
                        <div style={{ 
                          padding: '5px 10px', 
                          backgroundColor: '#f8f9fa', 
                          borderRadius: '4px',
                          marginBottom: '5px',
                          fontWeight: '500'
                        }}>
                          {enquiry.course || 'N/A'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#888' }}>
                          {enquiry.experience || 'N/A'} • {enquiry.branch || 'N/A'}
                        </div>
                      </td>
                      <td style={{ padding: '15px', color: '#555', fontSize: '14px' }}>
                        <div>{enquiry.city || enquiry.location || 'N/A'}</div>
                        <div style={{ fontSize: '13px', color: '#888' }}>{enquiry.state || ''}</div>
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <select
                          value={enquiry.status || 'Pending'}
                          onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '13px',
                            fontWeight: '500',
                            backgroundColor: getStatusColor(enquiry.status),
                            color: getStatusTextColor(enquiry.status),
                            cursor: 'pointer',
                            outline: 'none',
                            minWidth: '120px'
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Ongoing">On Going</option>
                          <option value="Completed">Completed</option>
                          <option value="Not Interested">Not Interested</option>
                        </select>
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center', color: '#666', fontSize: '13px' }}>
                        {formatDate(enquiry.created_at)}
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button 
                            onClick={() => viewEnquiryDetails(enquiry)}
                            style={{ 
                              padding: '6px 12px', 
                              backgroundColor: '#3498db', 
                              color: 'white', 
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '13px',
                              transition: 'background-color 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
                            title="View full details"
                          >
                            👁️ View
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this enquiry?')) {
                                handleDelete(enquiry.id);
                              }
                            }}
                            style={{ 
                              padding: '6px 12px', 
                              backgroundColor: '#dc3545', 
                              color: 'white', 
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '13px',
                              transition: 'background-color 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                            title="Delete this record"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ 
          backgroundColor: '#f8f9fa',
          padding: '15px 30px',
          borderTop: '1px solid #e9ecef',
          textAlign: 'center',
          color: '#6c757d',
          fontSize: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div>
            Database: <strong>course_enquiries</strong> • Table matches your Aiven MySQL structure
          </div>
          <div>
            {enquiries.length} records • Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  ); 
}