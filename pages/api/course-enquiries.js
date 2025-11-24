import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  console.log('📨 course-enquiries API called:', req.method);
  
  try {
    const connection = await connectToDatabase();
    console.log('✅ Database connected for fetching data');

    if (req.method === 'GET') {
      try {
        const [rows] = await connection.execute('SELECT * FROM course_enquiries ORDER BY created_at DESC');
        await connection.end();
        console.log(`✅ Fetched ${rows.length} enquiries from database`);
        res.status(200).json(rows);
      } catch (error) {
        await connection.end();
        console.error('❌ Error fetching enquiries:', error);
        res.status(500).json({ success: false, message: 'Error fetching data' });
      }
    } else if (req.method === 'DELETE') {
      try {
        const { id } = req.query;
        console.log('🗑️ Deleting enquiry with ID:', id);
        await connection.execute('DELETE FROM course_enquiries WHERE id = ?', [id]);
        await connection.end();
        console.log('✅ Enquiry deleted successfully');
        res.status(200).json({ success: true, message: 'Application deleted successfully' });
      } catch (error) {
        await connection.end();
        console.error('❌ Error deleting enquiry:', error);
        res.status(500).json({ success: false, message: 'Error deleting application' });
      }
    } else {
      await connection.end();
      console.log('❌ Method not allowed:', req.method);
      res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
}