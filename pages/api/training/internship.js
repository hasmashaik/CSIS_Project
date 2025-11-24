// import { connectToTrainingDatabase } from '../../../../lib/db-training';

// export default async function handler(req, res) {
//   let connection;
  
//   try {
//     connection = await connectToTrainingDatabase();
    
//     if (req.method === 'GET') {
//       const [rows] = await connection.execute('SELECT * FROM internship_programs ORDER BY application_date DESC');
//       res.status(200).json(rows);
//     } 
    
//     else if (req.method === 'DELETE') {
//       const { id } = req.query;
      
//       if (!id) {
//         return res.status(400).json({ error: 'Application ID is required' });
//       }
      
//       const [result] = await connection.execute(
//         'DELETE FROM internship_programs WHERE id = ?',
//         [id]
//       );
      
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ error: 'Application not found' });
//       }
      
//       res.status(200).json({ 
//         success: true, 
//         message: 'Internship application deleted successfully'
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
      const [rows] = await connection.execute('SELECT * FROM internship_programs ORDER BY application_date DESC');
      res.status(200).json(rows);
    } 
    
    else if (req.method === 'POST') {
      const { 
        applicant_name, 
        email_id, 
        country_prefix, 
        contact_number, 
        residence_city, 
        preferred_domain, 
        skills_description 
      } = req.body;
      
      const [result] = await connection.execute(
        `INSERT INTO internship_programs 
         (applicant_name, email_id, country_prefix, contact_number, residence_city, preferred_domain, skills_description) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [applicant_name, email_id, country_prefix, contact_number, residence_city, preferred_domain, skills_description]
      );
      
      res.status(201).json({ 
        success: true, 
        message: 'Internship application submitted successfully',
        id: result.insertId 
      });
    }
    
    else if (req.method === 'DELETE') {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Application ID is required' });
      }
      
      const [result] = await connection.execute(
        'DELETE FROM internship_programs WHERE id = ?',
        [id]
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Application not found' });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Internship application deleted successfully'
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