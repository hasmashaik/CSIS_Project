// import { connectToDatabase } from '../../lib/db';

// export default async function handler(req, res) {
//   let connection;
  
//   try {
//     connection = await connectToDatabase();
    
//     if (req.method === 'GET') {
//       const { search } = req.query;
      
//       if (search) {
//         const [rows] = await connection.execute(
//           `SELECT * FROM enquiries 
//            WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? OR course LIKE ? OR location LIKE ?`,
//           [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
//         );
//         res.status(200).json(rows);
//       } else {
//         const [rows] = await connection.execute('SELECT * FROM enquiries ORDER BY created_at DESC');
//         res.status(200).json(rows);
//       }
//     } 
    
//     else if (req.method === 'POST') {
//       const { name, email, phone, course, location } = req.body;
      
//       const [result] = await connection.execute(
//         'INSERT INTO enquiries (name, email, phone, course, location) VALUES (?, ?, ?, ?, ?)',
//         [name, email, phone, course, location]
//       );
      
//       res.status(201).json({ 
//         success: true, 
//         message: 'Enquiry submitted successfully',
//         id: result.insertId 
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


import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  let connection;
  
  try {
    connection = await connectToDatabase();
    
    if (req.method === 'GET') {
      // Get all enquiries with search functionality
      const { search } = req.query;
      
      if (search) {
        const [rows] = await connection.execute(
          `SELECT * FROM course_enquiries 
           WHERE full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR course LIKE ? OR state LIKE ? OR city LIKE ? OR status LIKE ?
           ORDER BY created_at DESC`,
          [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
        );
        res.status(200).json(rows);
      } else {
        const [rows] = await connection.execute(
          'SELECT * FROM course_enquiries ORDER BY created_at DESC'
        );
        res.status(200).json(rows);
      }
    } 
    
    else if (req.method === 'POST') {
      // Create new enquiry with all fields from the updated form
      const { 
        fullName, 
        phone, 
        email, 
        enquiryFor, 
        location, 
        state, 
        experience, 
        branch, 
        course, 
        customCourse, 
        preferredRole, 
        currentEmployer, 
        countryCode 
      } = req.body;
      
      // Determine final course value based on enquiry type
      let finalCourse = course;
      if (course === 'Other') {
        finalCourse = customCourse;
      } else if (enquiryFor === 'Jobs') {
        // For job enquiries, store preferred role in course field
        finalCourse = preferredRole ? `Job: ${preferredRole}` : 'Job Enquiry';
      }
      
      // Use location as city if not provided separately
      const city = location;
      
      // Store enquiry type in comment field
      const comment = `Enquiry Type: ${enquiryFor}\n${currentEmployer ? `Current Employer: ${currentEmployer}` : ''}`;
      
      const [result] = await connection.execute(
        `INSERT INTO course_enquiries 
         (full_name, phone, email, experience, branch, course, country_code, state, city, comment) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          fullName, 
          phone, 
          email, 
          experience, 
          branch, 
          finalCourse, 
          countryCode, 
          state, 
          city, 
          comment
        ]
      );
      
      res.status(201).json({ 
        success: true, 
        message: 'Enquiry submitted successfully',
        id: result.insertId 
      });
    }
    
    else if (req.method === 'PUT') {
      // Update enquiry status or other fields
      const { id } = req.query;
      const { status, comment } = req.body;
      
      if (status) {
        await connection.execute(
          'UPDATE course_enquiries SET status = ? WHERE id = ?',
          [status, id]
        );
        res.status(200).json({ success: true, message: 'Status updated successfully' });
      } else if (comment) {
        await connection.execute(
          'UPDATE course_enquiries SET comment = ? WHERE id = ?',
          [comment, id]
        );
        res.status(200).json({ success: true, message: 'Comment updated successfully' });
      } else {
        res.status(400).json({ error: 'No update data provided' });
      }
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