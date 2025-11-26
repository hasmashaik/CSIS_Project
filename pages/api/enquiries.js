// import { connectToDatabase } from '../../lib/db';

// export default async function handler(req, res) {
//   let connection;
  
//   try {
//     connection = await connectToDatabase();
    
//     if (req.method === 'GET') {
//       // Get all enquiries - using your actual table structure
//       const [rows] = await connection.execute(
//         'SELECT * FROM course_enquiries ORDER BY created_at DESC'
//       );
//       res.status(200).json(rows);
//     } 
    
//     else if (req.method === 'POST') {
//       // Create new enquiry - match your table column names
//       const { fullName, phone, email, location, experience, branch, course, customCourse, countryCode } = req.body;
      
//       const finalCourse = course === 'Other' ? customCourse : course;
      
//       const [result] = await connection.execute(
//         `INSERT INTO course_enquiries 
//          (full_name, phone, email, location, experience, branch, course, country_code) 
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//         [fullName, phone, email, location, experience, branch, finalCourse, countryCode]
//       );
      
//       res.status(201).json({ 
//         success: true, 
//         message: 'Enquiry submitted successfully',
//         id: result.insertId 
//       });
//     }
    
//     else if (req.method === 'DELETE') {
//       // Delete enquiry
//       const { id } = req.query;
      
//       await connection.execute(
//         'DELETE FROM course_enquiries WHERE id = ?',
//         [id]
//       );
      
//       res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
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

import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  let connection;
  
  try {
    connection = await connectToDatabase();
    
    if (req.method === 'GET') {
      // Get all enquiries
      const [rows] = await connection.execute(
        'SELECT * FROM course_enquiries ORDER BY created_at DESC'
      );
      res.status(200).json(rows);
    } 
    
    else if (req.method === 'POST') {
      // Create new enquiry
      const { fullName, phone, email, location, experience, branch, course, customCourse, countryCode } = req.body;
      
      const finalCourse = course === 'Other' ? customCourse : course;
      
      const [result] = await connection.execute(
        `INSERT INTO course_enquiries 
         (full_name, phone, email, location, experience, branch, course, country_code, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [fullName, phone, email, location, experience, branch, finalCourse, countryCode, 'Pending']
      );
      
      res.status(201).json({ 
        success: true, 
        message: 'Enquiry submitted successfully',
        id: result.insertId 
      });
    }
    
    else if (req.method === 'PUT') {
      // Update enquiry status
      const { id } = req.query;
      const { status } = req.body;
      
      await connection.execute(
        'UPDATE course_enquiries SET status = ? WHERE id = ?',
        [status, id]
      );
      
      res.status(200).json({ success: true, message: 'Status updated successfully' });
    }
    
    else if (req.method === 'DELETE') {
      // Delete enquiry
      const { id } = req.query;
      
      await connection.execute(
        'DELETE FROM course_enquiries WHERE id = ?',
        [id]
      );
      
      res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
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