import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  let connection;
  
  try {
    connection = await connectToDatabase();
    
    if (req.method === 'GET') {
      const { search } = req.query;
      
      if (search) {
        const [rows] = await connection.execute(
          `SELECT * FROM enquiries 
           WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? OR course LIKE ? OR location LIKE ?`,
          [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
        );
        res.status(200).json(rows);
      } else {
        const [rows] = await connection.execute('SELECT * FROM enquiries ORDER BY created_at DESC');
        res.status(200).json(rows);
      }
    } 
    
    else if (req.method === 'POST') {
      const { name, email, phone, course, location } = req.body;
      
      const [result] = await connection.execute(
        'INSERT INTO enquiries (name, email, phone, course, location) VALUES (?, ?, ?, ?, ?)',
        [name, email, phone, course, location]
      );
      
      res.status(201).json({ 
        success: true, 
        message: 'Enquiry submitted successfully',
        id: result.insertId 
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