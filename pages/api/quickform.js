import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  let connection;
  
  try {
    connection = await connectToDatabase();
    
    if (req.method === 'GET') {
      const { search } = req.query;
      
      console.log('📥 GET /api/quickform');
      
      if (search) {
        const [rows] = await connection.execute(
          `SELECT * FROM course_enquiries 
           WHERE full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR course LIKE ? 
           OR state LIKE ? OR city LIKE ? OR status LIKE ? OR assigned_to LIKE ?
           OR preferred_role LIKE ? OR current_employer LIKE ? OR enquiry_type LIKE ?
           ORDER BY created_at DESC`,
          [
            `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, 
            `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`,
            `%${search}%`, `%${search}%`, `%${search}%`
          ]
        );
        console.log(`🔍 Found ${rows.length} records`);
        res.status(200).json(rows);
      } else {
        const [rows] = await connection.execute(
          'SELECT * FROM course_enquiries ORDER BY created_at DESC'
        );
        console.log(`📊 Total records: ${rows.length}`);
        res.status(200).json(rows);
      }
    } 
    
    else if (req.method === 'POST') {
      const { 
        fullName, phone, email, enquiryFor, location, state, 
        experience, branch, course, customCourse, preferredRole, 
        currentEmployer, countryCode 
      } = req.body;
      
      console.log('📝 POST /api/quickform - New enquiry:', { fullName, enquiryFor });
      
      let finalCourse = course;
      if (course === 'Other') {
        finalCourse = customCourse;
      }
      
      if (enquiryFor === 'IT / Non-IT Jobs' && preferredRole) {
        finalCourse = preferredRole;
      }
      
      const city = location || '';
      const comment = `Enquiry Type: ${enquiryFor}`;
      
      const [result] = await connection.execute(
        `INSERT INTO course_enquiries 
         (full_name, phone, email, experience, branch, course, 
          enquiry_type, country_code, state, city, 
          preferred_role, current_employer, comment, status, assigned_to) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          fullName || '',
          phone || '',
          email || '',
          experience || '',
          branch || '',
          finalCourse || '',
          enquiryFor || '',
          countryCode || '+91',
          state || '',
          city,
          preferredRole || null,
          currentEmployer || null,
          comment || '',
          'Pending',
          null  // assigned_to starts as NULL
        ]
      );
      
      console.log('✅ Enquiry saved with ID:', result.insertId);
      
      res.status(201).json({ 
        success: true, 
        message: 'Enquiry submitted successfully',
        id: result.insertId 
      });
    }
    
    else if (req.method === 'PUT') {
      const { id } = req.query;
      const { status, comment, assigned_to, enquiry_type, preferred_role, current_employer } = req.body;
      
      console.log('🔄 PUT /api/quickform - Update:', { 
        id, status, comment, assigned_to 
      });
      
      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }
      
      // Handle assignment update - FIXED
      if (assigned_to !== undefined) {
        console.log('📌 Updating assigned_to:', assigned_to, 'for ID:', id);
        
        // Handle empty string as NULL
        const assignedValue = assigned_to === '' ? null : assigned_to;
        
        await connection.execute(
          'UPDATE course_enquiries SET assigned_to = ? WHERE id = ?',
          [assignedValue, id]
        );
        
        console.log(`✅ Assigned "${assigned_to}" to ID ${id}`);
        
        // Return the updated data
        const [updatedRow] = await connection.execute(
          'SELECT * FROM course_enquiries WHERE id = ?',
          [id]
        );
        
        res.status(200).json({ 
          success: true, 
          message: 'Assigned to employee successfully',
          data: updatedRow[0]
        });
      }
      else if (status !== undefined) {
        await connection.execute(
          'UPDATE course_enquiries SET status = ? WHERE id = ?',
          [status, id]
        );
        
        const [updatedRow] = await connection.execute(
          'SELECT * FROM course_enquiries WHERE id = ?',
          [id]
        );
        
        res.status(200).json({ 
          success: true, 
          message: 'Status updated',
          data: updatedRow[0]
        });
      } 
      else if (comment !== undefined) {
        await connection.execute(
          'UPDATE course_enquiries SET comment = ? WHERE id = ?',
          [comment, id]
        );
        
        const [updatedRow] = await connection.execute(
          'SELECT * FROM course_enquiries WHERE id = ?',
          [id]
        );
        
        res.status(200).json({ 
          success: true, 
          message: 'Comment updated',
          data: updatedRow[0]
        });
      }
      else {
        res.status(400).json({ error: 'No update data provided' });
      }
    }
    
    else if (req.method === 'DELETE') {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }
      
      await connection.execute(
        'DELETE FROM course_enquiries WHERE id = ?',
        [id]
      );
      
      res.status(200).json({ success: true, message: 'Enquiry deleted' });
    }
    
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
    
  } catch (error) {
    console.error('❌ Database error:', error);
    res.status(500).json({ 
      error: 'Database operation failed',
      message: error.message 
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}