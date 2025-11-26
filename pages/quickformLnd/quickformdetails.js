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
//     enquiry.course?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

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
//                 placeholder="Search by ID, name, email, phone, location, or course..."
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
//                 minWidth: '800px'
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
//                       <td style={{ padding: '15px' }}>
//                         <span style={{
//                           backgroundColor: '#007bff',
//                           color: 'white',
//                           padding: '4px 8px',
//                           borderRadius: '3px',
//                           fontSize: '12px',
//                           fontWeight: '500'
//                         }}>
//                           {enquiry.course}
//                         </span>
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
//                           onMouseOver={(e) => e.target.backgroundColor = '#c82333'}
//                           onMouseOut={(e) => e.target.backgroundColor = '#dc3545'}
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
    enquiry.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/enquiries?id=${id}`, {
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
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone!')) return;
    
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
    router.push('/quickformLnd');
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '#ffc107';
      case 'ongoing': return '#17a2b8';
      case 'completed': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusTextColor = (status) => {
    return status?.toLowerCase() === 'pending' ? '#000' : '#fff';
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
      <div style={{ 
        maxWidth: '1200px', 
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
                QuickForm Enquiries
              </h1>
              <p style={{ 
                margin: '0',
                fontSize: '1rem',
                opacity: '0.8'
              }}>
                Manage and monitor all course enquiries
              </p>
            </div>
            
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
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Search and Controls */}
        <div style={{ 
          padding: '25px 30px',
          borderBottom: '1px solid #e9ecef'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
              <input
                type="text"
                placeholder="Search by ID, name, email, phone, location, course, or status..."
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
            
            <div style={{ 
              backgroundColor: '#f8f9fa',
              padding: '8px 16px',
              borderRadius: '5px',
              fontWeight: '500',
              color: '#495057',
              border: '1px solid #e9ecef'
            }}>
              Total Records: <span style={{ color: '#007bff', fontWeight: '600' }}>{filteredEnquiries.length}</span>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div style={{ padding: '0' }}>
          {filteredEnquiries.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '50px 20px',
              color: '#6c757d'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px', opacity: '0.5' }}>📊</div>
              <h3 style={{ margin: '0 0 10px 0', color: '#495057', fontWeight: '500' }}>
                {searchTerm ? 'No matching records found' : 'No enquiries yet'}
              </h3>
              <p style={{ margin: '0', fontSize: '14px' }}>
                {searchTerm ? 'Try adjusting your search terms' : 'Enquiries will appear here once submitted'}
              </p>
            </div>
          ) : (
            <div style={{ 
              overflowX: 'auto'
            }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                minWidth: '900px'
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
                    }}>Name</th>
                    <th style={{ 
                      padding: '15px', 
                      textAlign: 'left', 
                      fontWeight: '600',
                      color: '#495057',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Phone</th>
                    <th style={{ 
                      padding: '15px', 
                      textAlign: 'left', 
                      fontWeight: '600',
                      color: '#495057',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Email</th>
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
                      textAlign: 'left', 
                      fontWeight: '600',
                      color: '#495057',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Course</th>
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
                    }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.map((enquiry, index) => (
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
                      }}>{enquiry.id}</td>
                      <td style={{ 
                        padding: '15px',
                        fontWeight: '500',
                        color: '#333'
                      }}>{enquiry.full_name}</td>
                      <td style={{ padding: '15px', color: '#555', fontSize: '14px' }}>{enquiry.phone}</td>
                      <td style={{ padding: '15px', color: '#555', fontSize: '14px' }}>{enquiry.email}</td>
                      <td style={{ padding: '15px', color: '#555', fontSize: '14px' }}>{enquiry.location}</td>
                      <td style={{ padding: '15px', color: '#555', fontSize: '14px' }}>
                        {enquiry.course}
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
                          <option value="Ongoing">On Going</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <button 
                          onClick={() => handleDelete(enquiry.id)}
                          style={{ 
                            padding: '6px 10px', 
                            backgroundColor: '#dc3545', 
                            color: 'white', 
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                          title="Delete this record"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}