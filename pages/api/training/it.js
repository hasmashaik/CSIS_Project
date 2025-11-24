// import { connectToTrainingDatabase } from '../../../../lib/db-training';

// export default async function handler(req, res) {
//   let connection;
  
//   try {
//     connection = await connectToTrainingDatabase();
    
//     if (req.method === 'GET') {
//       const [rows] = await connection.execute('SELECT * FROM it_training ORDER BY created_date DESC');
//       res.status(200).json(rows);
//     } 
    
//     else if (req.method === 'DELETE') {
//       const { id } = req.query;
      
//       if (!id) {
//         return res.status(400).json({ error: 'Application ID is required' });
//       }
      
//       const [result] = await connection.execute(
//         'DELETE FROM it_training WHERE id = ?',
//         [id]
//       );
      
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ error: 'Application not found' });
//       }
      
//       res.status(200).json({ 
//         success: true, 
//         message: 'IT training application deleted successfully'
//       });
//     }
    
//     else {
//       res.status(405).json({ error: 'Method not allowed' });
//     }
    
//   } catch (error) {
//     console.error('Database error:', error);
//     res.status(500).json({ error: error.message });
//   } finally {
//     if (connection) {
//       await connection.end();
//     }
//   }
// }

import { connectToTrainingDatabase } from '../../../lib/db-training';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const connection = await connectToTrainingDatabase();
    
    // Mock data - replace with actual database query
    const mockData = [
      { id: 1, name: 'Full Stack Web Development', category: 'Programming' },
      { id: 2, name: 'Data Science & AI', category: 'Data Science' },
      { id: 3, name: 'Cyber Security', category: 'Security' },
      { id: 4, name: 'Cloud Computing', category: 'Infrastructure' },
      { id: 5, name: 'Mobile App Development', category: 'Programming' }
    ];

    res.status(200).json({ 
      success: true, 
      data: mockData 
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}