// import { connectToTrainingDatabase } from '../../../../lib/db-training';

// export default async function handler(req, res) {
//   let connection;
  
//   try {
//     connection = await connectToTrainingDatabase();
    
//     if (req.method === 'GET') {
//       const [rows] = await connection.execute('SELECT * FROM non_it_training ORDER BY created_date DESC');
//       res.status(200).json(rows);
//     } 
    
//     else if (req.method === 'DELETE') {
//       const { id } = req.query;
      
//       if (!id) {
//         return res.status(400).json({ error: 'Application ID is required' });
//       }
      
//       const [result] = await connection.execute(
//         'DELETE FROM non_it_training WHERE id = ?',
//         [id]
//       );
      
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ error: 'Application not found' });
//       }
      
//       res.status(200).json({ 
//         success: true, 
//         message: 'Non-IT training application deleted successfully'
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

import { connectToTrainingDatabase } from '../../../../lib/db-training';

export default async function handler(req, res) {
  let connection;
  
  try {
    connection = await connectToTrainingDatabase();
    
    if (req.method === 'GET') {
      const [rows] = await connection.execute('SELECT * FROM non_it_training ORDER BY created_date DESC');
      res.status(200).json(rows);
    } 
    
    else if (req.method === 'POST') {
      const { 
        full_name, 
        email_address, 
        country_code, 
        phone_number, 
        current_city, 
        selected_course, 
        special_requirements 
      } = req.body;
      
      const [result] = await connection.execute(
        `INSERT INTO non_it_training 
         (full_name, email_address, country_code, phone_number, current_city, selected_course, special_requirements) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [full_name, email_address, country_code, phone_number, current_city, selected_course, special_requirements]
      );
      
      res.status(201).json({ 
        success: true, 
        message: 'Non-IT Training application submitted successfully',
        id: result.insertId 
      });
    }
    
    else if (req.method === 'DELETE') {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Application ID is required' });
      }
      
      const [result] = await connection.execute(
        'DELETE FROM non_it_training WHERE id = ?',
        [id]
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Application not found' });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Non-IT training application deleted successfully'
      });
    }
    
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
    
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}