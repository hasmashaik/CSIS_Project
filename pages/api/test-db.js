import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  let connection;
  
  try {
    console.log('Testing Aiven database connection...');
    console.log('Host:', process.env.DB_HOST);
    console.log('Port:', process.env.DB_PORT);
    console.log('User:', process.env.DB_USER);
    console.log('Database:', process.env.DB_NAME);
    
    connection = await connectToDatabase();
    
    // Test query to check if table exists
    const [tables] = await connection.execute('SHOW TABLES LIKE "course_enquiries"');
    
    if (tables.length > 0) {
      const [rows] = await connection.execute('SELECT COUNT(*) as count FROM course_enquiries');
      res.status(200).json({ 
        success: true, 
        message: 'Aiven database connection successful',
        tableExists: true,
        recordCount: rows[0].count
      });
    } else {
      res.status(200).json({ 
        success: true, 
        message: 'Aiven database connection successful but table not found',
        tableExists: false
      });
    }
    
  } catch (error) {
    console.error('Aiven Database test failed:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: 'Check your Aiven credentials and SSL configuration'
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}