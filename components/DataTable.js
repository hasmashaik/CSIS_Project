// import { useState } from 'react';

// export default function DataTable({ data, type, onDelete }) {
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);

//   const handleDeleteClick = (id) => {
//     setSelectedId(id);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = () => {
//     onDelete(selectedId);
//     setShowDeleteModal(false);
//     setSelectedId(null);
//   };

//   // Format column names for display
//   const formatColumnName = (column) => {
//     const formatted = column
//       .replace(/_/g, ' ')
//       .replace(/([A-Z])/g, ' $1')
//       .replace(/^\w/, c => c.toUpperCase());
    
//     // Custom mappings for specific column names
//     const customNames = {
//       'email address': 'Email',
//       'country code': 'Country Code',
//       'phone number': 'Phone Number',
//       'current city': 'City',
//       'selected course': 'Course',
//       'special requirements': 'Requirements',
//       'created date': 'Created Date',
//       'applicant name': 'Applicant Name',
//       'email id': 'Email',
//       'country prefix': 'Country Code',
//       'contact number': 'Contact Number',
//       'residence city': 'City',
//       'preferred domain': 'Preferred Domain',
//       'skills description': 'Skills',
//       'application date': 'Application Date'
//     };
    
//     return customNames[formatted.toLowerCase()] || formatted;
//   };

//   if (!data || data.length === 0) {
//     return (
//       <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
//         <div className="text-gray-400 text-6xl mb-4">📊</div>
//         <h3 className="text-lg font-semibold text-gray-500 mb-2">No Data Available</h3>
//         <p className="text-gray-400">No {type} records found in the database.</p>
//       </div>
//     );
//   }

//   const columns = Object.keys(data[0]);

//   return (
//     <div className="bg-white shadow-xl rounded-xl overflow-hidden">
//       <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
//         <h3 className="text-xl font-bold text-white">
//           {type === 'it' ? 'IT Training' : type === 'non-it' ? 'Non-IT Training' : 'Internship Programs'} Data
//         </h3>
//         <p className="text-blue-100 text-sm mt-1">
//           Total Records: {data.length}
//         </p>
//       </div>
      
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               {columns.map((column) => (
//                 <th
//                   key={column}
//                   className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
//                 >
//                   {formatColumnName(column)}
//                 </th>
//               ))}
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {data.map((row, index) => (
//               <tr key={index} className="hover:bg-blue-50 transition-colors">
//                 {columns.map((column) => (
//                   <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
//                     {row[column] || '-'}
//                   </td>
//                 ))}
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button
//                     onClick={() => handleDeleteClick(row.id)}
//                     className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-xs font-semibold transition-colors"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl p-6 max-w-sm w-full transform transition-all">
//             <div className="flex items-center mb-4">
//               <div className="bg-red-100 p-2 rounded-full mr-3">
//                 <span className="text-red-600 text-xl">⚠️</span>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
//             </div>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete this record? This action cannot be undone.
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from 'react';

export default function DataTable({ data, type, onDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete(selectedId);
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  // Format column names for display
  const formatColumnName = (column) => {
    const formatted = column
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^\w/, c => c.toUpperCase());
    
    // Custom mappings for specific column names
    const customNames = {
      'email address': 'Email',
      'country code': 'Country Code',
      'phone number': 'Phone Number',
      'current city': 'City',
      'selected course': 'Course',
      'special requirements': 'Requirements',
      'created date': 'Created Date',
      'applicant name': 'Applicant Name',
      'email id': 'Email',
      'country prefix': 'Country Code',
      'contact number': 'Contact Number',
      'residence city': 'City',
      'preferred domain': 'Preferred Domain',
      'skills description': 'Skills',
      'application date': 'Application Date',
      'full name': 'Full Name',
      'custom course': 'Custom Course'
    };
    
    return customNames[formatted.toLowerCase()] || formatted;
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-gray-400 text-6xl mb-4">📊</div>
        <h3 className="text-lg font-semibold text-gray-500 mb-2">No Data Available</h3>
        <p className="text-gray-400">No {type} records found in the database.</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <h3 className="text-xl font-bold text-white">
          {type === 'quickform' ? 'QuickForm Data' : 
           type === 'it' ? 'IT Training' : 
           type === 'non-it' ? 'Non-IT Training' : 'Internship Programs'} Data
        </h3>
        <p className="text-blue-100 text-sm mt-1">
          Total Records: {data.length}
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {formatColumnName(column)}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-blue-50 transition-colors">
                {columns.map((column) => (
                  <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                    {row[column] || '-'}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDeleteClick(row.id)}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-xs font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full transform transition-all">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this record? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}