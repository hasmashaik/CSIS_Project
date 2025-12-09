"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function QuickFormDetails() {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [editComment, setEditComment] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  const employees = ['Arshad', 'Christy', 'Uma', 'Sai', 'Keerithika', 'anu'];

  useEffect(() => {
    const userData = localStorage.getItem('adminAuthenticated');
    if (!userData || userData !== 'true') {
      router.push('/quickformLnd');
      return;
    }
    fetchEnquiries();
  }, [router]);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/quickform');
      if (!response.ok) throw new Error(`API returned ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setEnquiries(data);
        if (data.length === 0) setError('⚠️ No enquiries found.');
      } else {
        setError('Invalid data format');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(`Failed to load: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnquiriesWithSearch = async () => {
    try {
      const url = searchTerm ? `/api/quickform?search=${encodeURIComponent(searchTerm)}` : '/api/quickform';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setEnquiries(data);
      }
    } catch (error) {
      console.error('Search error:', error);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          setEnquiries(enquiries.map(enquiry => 
            enquiry.id === id ? { ...enquiry, status: newStatus, ...result.data } : enquiry
          ));
          
          if (selectedEnquiry && selectedEnquiry.id === id) {
            setSelectedEnquiry({...selectedEnquiry, status: newStatus, ...result.data});
          }
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleEmployeeAssign = async (id, employeeName) => {
    try {
      const response = await fetch(`/api/quickform?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assigned_to: employeeName }),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Assignment response:', result);
        
        if (result.data) {
          setEnquiries(enquiries.map(enquiry => 
            enquiry.id === id ? { ...enquiry, assigned_to: employeeName, ...result.data } : enquiry
          ));
          
          if (selectedEnquiry && selectedEnquiry.id === id) {
            setSelectedEnquiry({...selectedEnquiry, assigned_to: employeeName, ...result.data});
          }
        }
      }
    } catch (error) {
      console.error('Error assigning employee:', error);
    }
  };

  const handleCommentUpdate = async (id) => {
    if (!editComment.trim()) return;
    try {
      const response = await fetch(`/api/quickform?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: editComment }),
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          setEnquiries(enquiries.map(enquiry => 
            enquiry.id === id ? { ...enquiry, comment: editComment, ...result.data } : enquiry
          ));
          
          if (selectedEnquiry && selectedEnquiry.id === id) {
            setSelectedEnquiry({...selectedEnquiry, comment: editComment, ...result.data});
          }
        }
        
        setEditComment('');
        alert('✅ Comment updated!');
      }
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('❌ Failed to update comment');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this enquiry?')) return;
    try {
      const response = await fetch(`/api/quickform?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setEnquiries(enquiries.filter(enquiry => enquiry.id !== id));
        if (selectedEnquiry && selectedEnquiry.id === id) closeDetails();
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
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
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getEnquiryTypeDisplay = (enquiry) => {
    if (enquiry.enquiry_type === 'IT / Non-IT Jobs') {
      return { text: 'Jobs', color: 'green' };
    } else if (enquiry.enquiry_type === 'Courses / Internship') {
      return { text: 'Training', color: 'blue' };
    }
    
    if (enquiry.comment) {
      if (enquiry.comment.includes('IT / Non-IT Jobs') || 
          enquiry.comment.includes('Enquiry Type: Jobs')) {
        return { text: 'Jobs', color: 'green' };
      } else if (enquiry.comment.includes('Courses / Internship')) {
        return { text: 'Training', color: 'blue' };
      }
    }
    
    return { text: 'N/A', color: 'gray' };
  };

  const exportEnquiryDetails = () => {
    if (!selectedEnquiry) return;
    
    const enquiryType = getEnquiryTypeDisplay(selectedEnquiry);
    
    const content = `
╔══════════════════════════════════════════╗
║       ENQUIRY DETAILS - ID #${selectedEnquiry.id}       ║
╚══════════════════════════════════════════╝

📅 SUBMITTED: ${formatDate(selectedEnquiry.created_at)}
📋 ENQUIRY FOR: ${selectedEnquiry.enquiry_type || enquiryType.text}

👤 PERSONAL INFORMATION
══════════════════════════════════════════
• Full Name: ${selectedEnquiry.full_name}
• Phone: ${selectedEnquiry.country_code || '+91'} ${selectedEnquiry.phone}
• Email: ${selectedEnquiry.email}
${selectedEnquiry.current_employer ? `• Current Employer: ${selectedEnquiry.current_employer}` : ''}

🎯 ENQUIRY DETAILS
══════════════════════════════════════════
• Course/Role: ${selectedEnquiry.course || 'N/A'}
${selectedEnquiry.preferred_role ? `• Preferred Role: ${selectedEnquiry.preferred_role}` : ''}
• Experience: ${selectedEnquiry.experience || 'N/A'}
• Branch: ${selectedEnquiry.branch || 'N/A'}

📍 LOCATION
══════════════════════════════════════════
• City: ${selectedEnquiry.city || 'N/A'}
• State: ${selectedEnquiry.state || 'N/A'}

📊 STATUS & ASSIGNMENT
══════════════════════════════════════════
• Status: ${selectedEnquiry.status || 'Pending'}
• Assigned To: ${selectedEnquiry.assigned_to || 'Not assigned yet'}

💬 COMMENTS / NOTES
══════════════════════════════════════════
${selectedEnquiry.comment || 'No comments provided.'}

${editComment && editComment !== selectedEnquiry.comment ? `\n📝 UPDATED COMMENT:\n${editComment}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated: ${new Date().toLocaleString()}
© Career School Admin System
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enquiry_${selectedEnquiry.id}_${selectedEnquiry.full_name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert(`✅ Exported: ${a.download}`);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Enquiries...</h2>
          <p className="text-gray-500">Fetching data from database</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="text-red-600 mr-3">⚠️</div>
            <div>
              <p className="font-medium text-red-800">{error}</p>
              <button 
                onClick={fetchEnquiries}
                className="mt-2 px-3 py-1 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header and Search */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Enquiries Dashboard</h1>
            <p className="text-gray-600">Manage all course and job enquiries</p>
          </div>
          <button 
            onClick={fetchEnquiries}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <span className="mr-2">↻</span> Refresh
          </button>
        </div>
        
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name, phone, email, course, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
          <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
            Search
          </button>
          <button 
            type="button"
            onClick={() => { setSearchTerm(''); fetchEnquiries(); }}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Clear
          </button>
        </form>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-500">
          <div className="text-sm text-gray-500">Total Records</div>
          <div className="text-2xl font-bold text-blue-600">{enquiries.length}</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-yellow-500">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-2xl font-bold text-yellow-500">
            {enquiries.filter(e => e.status === 'Pending').length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500">
          <div className="text-sm text-gray-500">Jobs Enquiries</div>
          <div className="text-2xl font-bold text-green-600">
            {enquiries.filter(e => e.enquiry_type === 'IT / Non-IT Jobs').length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-purple-500">
          <div className="text-sm text-gray-500">Training Enquiries</div>
          <div className="text-2xl font-bold text-purple-600">
            {enquiries.filter(e => e.enquiry_type === 'Courses / Internship').length}
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {enquiries.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4 opacity-20">📊</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No enquiries found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'Try a different search term' : 'Submit a form through the popup to see data here'}
            </p>
            <button 
              onClick={fetchEnquiries}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Check Again
            </button>
          </div>
        ) : (
          <>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">All Enquiries ({enquiries.length})</h2>
                <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">Name & Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Enquiry For</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">Course / Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-56">Assign To</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enquiries.map((enquiry) => {
                    const enquiryType = getEnquiryTypeDisplay(enquiry);
                    
                    return (
                      <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {enquiry.id}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-medium text-gray-900">{enquiry.full_name}</div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <span className="mr-2">📞</span>
                            {enquiry.country_code || '+91'} {enquiry.phone}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <span className="mr-2">✉️</span>
                            {enquiry.email}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            enquiryType.color === 'green' ? 'bg-green-100 text-green-800' :
                            enquiryType.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {enquiryType.text}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-medium text-gray-900">{enquiry.course || 'N/A'}</div>
                          {enquiry.preferred_role && (
                            <div className="text-xs text-green-600 mt-1 flex items-center">
                              <span className="mr-1">🎯</span>
                              {enquiry.preferred_role}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 mt-1">
                            Exp: {enquiry.experience || 'N/A'} • Branch: {enquiry.branch || 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-medium">{enquiry.city || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{enquiry.state || ''}</div>
                        </td>
                        <td className="px-4 py-4">
                          <select
                            value={enquiry.status || 'Pending'}
                            onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                            className="px-3 py-1.5 border rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                            style={{
                              backgroundColor: getStatusColor(enquiry.status),
                              color: getStatusTextColor(enquiry.status),
                              borderColor: getStatusColor(enquiry.status)
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Ongoing">On Going</option>
                            <option value="Completed">Completed</option>
                            <option value="Not Interested">Not Interested</option>
                          </select>
                        </td>
                        <td className="px-4 py-4">
                          <div className="min-w-[140px]">
                            <select
                              value={enquiry.assigned_to || ''}
                              onChange={(e) => handleEmployeeAssign(enquiry.id, e.target.value)}
                              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-full"
                            >
                              <option value="">-- Select Employee --</option>
                              {employees.map((emp) => (
                                <option key={emp} value={emp}>{emp}</option>
                              ))}
                            </select>
                            
                            {enquiry.assigned_to && (
                              <div className="mt-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm flex items-center justify-between">
                                <span className="font-medium truncate">
                                  👤 {enquiry.assigned_to}
                                </span>
                                <button
                                  onClick={() => handleEmployeeAssign(enquiry.id, '')}
                                  className="ml-2 text-xs text-red-500 hover:text-red-700"
                                  title="Remove assignment"
                                >
                                  ×
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {formatDate(enquiry.created_at)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => viewEnquiryDetails(enquiry)}
                              className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 flex items-center"
                            >
                              <span className="mr-1">👁️</span> View
                            </button>
                            <button 
                              onClick={() => handleDelete(enquiry.id)}
                              className="px-3 py-1.5 bg-red-100 text-red-700 text-sm rounded-lg hover:bg-red-200 flex items-center"
                            >
                              <span className="mr-1">🗑️</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Details Modal - Shows ALL information */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden my-8">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">Enquiry Details</h3>
                  <p className="text-blue-100">ID: #{selectedEnquiry.id} • Submitted: {formatDate(selectedEnquiry.created_at)}</p>
                </div>
                <button
                  onClick={closeDetails}
                  className="text-white hover:text-blue-200 text-3xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-8 overflow-y-auto max-h-[70vh]">
              {/* Enquiry Type Badge */}
              <div className="mb-8">
                {getEnquiryTypeDisplay(selectedEnquiry).color === 'green' ? (
                  <span className="px-4 py-2 bg-green-100 text-green-800 text-sm font-semibold rounded-lg border border-green-200">
                    🏢 JOBS ENQUIRY - {selectedEnquiry.enquiry_type}
                  </span>
                ) : (
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-lg border border-blue-200">
                    🎓 TRAINING ENQUIRY - {selectedEnquiry.enquiry_type}
                  </span>
                )}
              </div>
              
              {/* Information Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">👤 Personal Information</h4>
                  <div className="space-y-4">
                    <InfoRow label="Full Name" value={selectedEnquiry.full_name} />
                    <InfoRow label="Phone" value={`${selectedEnquiry.country_code || '+91'} ${selectedEnquiry.phone}`} icon="📞" />
                    <InfoRow label="Email" value={selectedEnquiry.email} icon="✉️" />
                    {selectedEnquiry.current_employer && (
                      <InfoRow label="Current Employer" value={selectedEnquiry.current_employer} icon="💼" />
                    )}
                  </div>
                </div>
                
                {/* Enquiry Details */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">🎯 Enquiry Details</h4>
                  <div className="space-y-4">
                    <InfoRow label="Course / Role" value={selectedEnquiry.course || 'N/A'} />
                    {selectedEnquiry.preferred_role && (
                      <InfoRow label="Preferred Role" value={selectedEnquiry.preferred_role} icon="🎯" highlight />
                    )}
                    <InfoRow label="Experience" value={selectedEnquiry.experience || 'N/A'} />
                    <InfoRow label="Branch" value={selectedEnquiry.branch || 'N/A'} />
                  </div>
                </div>
                
                {/* Location */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">📍 Location</h4>
                  <div className="space-y-4">
                    <InfoRow label="City" value={selectedEnquiry.city || selectedEnquiry.location || 'N/A'} icon="🏙️" />
                    <InfoRow label="State/Region" value={selectedEnquiry.state || 'N/A'} />
                  </div>
                </div>
                
                {/* Status & Assignment */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">📊 Status & Assignment</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={selectedEnquiry.status || 'Pending'}
                        onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                        className="px-4 py-2 border rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                        style={{
                          backgroundColor: getStatusColor(selectedEnquiry.status),
                          color: getStatusTextColor(selectedEnquiry.status),
                          borderColor: getStatusColor(selectedEnquiry.status)
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Ongoing">On Going</option>
                        <option value="Completed">Completed</option>
                        <option value="Not Interested">Not Interested</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
                      <select
                        value={selectedEnquiry.assigned_to || ''}
                        onChange={(e) => handleEmployeeAssign(selectedEnquiry.id, e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                      >
                        <option value="">-- Select Employee --</option>
                        {employees.map((emp) => (
                          <option key={emp} value={emp}>{emp}</option>
                        ))}
                      </select>
                      {selectedEnquiry.assigned_to && (
                        <div className="mt-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="mr-2">✅</span>
                            <div>
                              <span className="font-semibold">Currently assigned to:</span>
                              <div className="text-lg font-bold">{selectedEnquiry.assigned_to}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleEmployeeAssign(selectedEnquiry.id, '')}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <InfoRow label="Date Submitted" value={formatDate(selectedEnquiry.created_at)} icon="📅" />
                  </div>
                </div>
              </div>
              
              {/* Comments Section */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">💬 Comments / Notes</h4>
                <div className="flex gap-3">
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                    placeholder="Add or update comments about this enquiry..."
                  />
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleCommentUpdate(selectedEnquiry.id)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium"
                    >
                      Update Comment
                    </button>
                    <button
                      onClick={exportEnquiryDetails}
                      className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium flex items-center justify-center"
                    >
                      <span className="mr-2">📥</span>
                      Export Details
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Comments are saved and visible to all team members
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleString()}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={closeDetails}
                    className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => handleDelete(selectedEnquiry.id)}
                    className="px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium"
                  >
                    🗑️ Delete Enquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for info rows
function InfoRow({ label, value, icon, highlight = false }) {
  return (
    <div>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className={`flex items-center ${highlight ? 'text-green-700 font-semibold' : 'text-gray-900'}`}>
        {icon && <span className="mr-2">{icon}</span>}
        <span className="text-base">{value}</span>
      </div>
    </div>
  );
}