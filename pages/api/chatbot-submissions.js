import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  let connection;
  
  try {
    connection = await connectToDatabase();
    
    if (req.method === 'GET') {
      // Get all chatbot submissions
      const { search } = req.query;
      
      try {
        // Check if chatbot_submissions table exists
        const [tableCheck] = await connection.execute(
          `SHOW TABLES LIKE 'chatbot_submissions'`
        );
        
        if (tableCheck.length === 0) {
          // Create the table if it doesn't exist
          await connection.execute(`
            CREATE TABLE chatbot_submissions (
              id INT PRIMARY KEY AUTO_INCREMENT,
              full_name VARCHAR(255) NOT NULL,
              whatsapp VARCHAR(20) NOT NULL,
              alternate_phone VARCHAR(20),
              email VARCHAR(255),
              location VARCHAR(100),
              college VARCHAR(255),
              degree VARCHAR(100),
              stream VARCHAR(100),
              passing_year VARCHAR(10),
              experience VARCHAR(100),
              training_course VARCHAR(255),
              source VARCHAR(255),
              questions TEXT,
              team VARCHAR(100) NOT NULL,
              type VARCHAR(255) NOT NULL,
              category VARCHAR(100) NOT NULL,
              status VARCHAR(20) DEFAULT 'Pending',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
          `);
          console.log('✅ Created chatbot_submissions table');
          
          res.status(200).json({ 
            success: true, 
            data: [],
            message: 'Table created successfully'
          });
          return;
        }
        
        // Get data from table
        if (search) {
          const [rows] = await connection.execute(
            `SELECT * FROM chatbot_submissions 
             WHERE full_name LIKE ? OR email LIKE ? OR whatsapp LIKE ? OR team LIKE ? OR type LIKE ?
             ORDER BY created_at DESC`,
            [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
          );
          res.status(200).json({ success: true, data: rows });
        } else {
          const [rows] = await connection.execute(
            'SELECT * FROM chatbot_submissions ORDER BY created_at DESC'
          );
          res.status(200).json({ success: true, data: rows });
        }
        
      } catch (tableError) {
        console.error('Table error:', tableError);
        res.status(200).json({ 
          success: true, 
          data: [],
          message: 'No chatbot submissions table found'
        });
      }
    } 
    
    else if (req.method === 'POST') {
      // Save chatbot submission
      const {
        fullName,
        whatsapp,
        alternatePhone,
        email,
        location,
        college,
        degree,
        stream,
        passingYear,
        experience,
        trainingCourse,
        source,
        questions,
        team,
        type,
        category
      } = req.body;
      
      if (!fullName || !whatsapp || !team || !type) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required fields' 
        });
      }
      
      try {
        // Check and create table if needed
        const [tableCheck] = await connection.execute(
          `SHOW TABLES LIKE 'chatbot_submissions'`
        );
        
        if (tableCheck.length === 0) {
          await connection.execute(`
            CREATE TABLE chatbot_submissions (
              id INT PRIMARY KEY AUTO_INCREMENT,
              full_name VARCHAR(255) NOT NULL,
              whatsapp VARCHAR(20) NOT NULL,
              alternate_phone VARCHAR(20),
              email VARCHAR(255),
              location VARCHAR(100),
              college VARCHAR(255),
              degree VARCHAR(100),
              stream VARCHAR(100),
              passing_year VARCHAR(10),
              experience VARCHAR(100),
              training_course VARCHAR(255),
              source VARCHAR(255),
              questions TEXT,
              team VARCHAR(100) NOT NULL,
              type VARCHAR(255) NOT NULL,
              category VARCHAR(100) NOT NULL,
              status VARCHAR(20) DEFAULT 'Pending',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
          `);
        }
        
        // Insert data
        const [result] = await connection.execute(
          `INSERT INTO chatbot_submissions 
           (full_name, whatsapp, alternate_phone, email, location, college, 
            degree, stream, passing_year, experience, training_course, 
            source, questions, team, type, category, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`,
          [
            fullName,
            whatsapp,
            alternatePhone || null,
            email || null,
            location || null,
            college || null,
            degree || null,
            stream || null,
            passingYear || null,
            experience || null,
            trainingCourse || null,
            source || null,
            questions || null,
            team,
            type,
            category || 'General'
          ]
        );
        
        res.status(201).json({ 
          success: true, 
          message: 'Submission saved successfully',
          data: {
            id: result.insertId,
            full_name: fullName,
            whatsapp,
            alternate_phone: alternatePhone,
            email,
            location,
            college,
            degree,
            stream,
            passing_year: passingYear,
            experience,
            training_course: trainingCourse,
            source,
            questions,
            team,
            type,
            category: category || 'General',
            status: 'Pending',
            created_at: new Date().toISOString()
          }
        });
        
      } catch (error) {
        console.error('Insert error:', error);
        // Fallback: Save to localStorage via frontend
        res.status(200).json({ 
          success: true, 
          message: 'Saved locally (database error)',
          data: {
            id: Date.now(),
            full_name: fullName,
            whatsapp,
            status: 'Pending',
            created_at: new Date().toISOString()
          }
        });
      }
    }
    
    else {
      res.status(405).json({ 
        success: false, 
        message: `Method ${req.method} not allowed` 
      });
    }
    
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Database error', 
      error: error.message 
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}