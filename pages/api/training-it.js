import { connectTrainingDB } from '../../lib/db';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'POST') {
    try {
      const { 
        full_name, 
        email_address, 
        country_code, 
        phone_number, 
        current_city, 
        selected_course, 
        special_requirements 
      } = req.body;

      const connection = await connectTrainingDB();
      
      const [result] = await connection.execute(
        `INSERT INTO it_training 
         (full_name, email_address, country_code, phone_number, current_city, selected_course, special_requirements) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [full_name, email_address, country_code, phone_number, current_city, selected_course, special_requirements]
      );

      await connection.end();

      res.status(200).json({ 
        success: true, 
        message: 'IT Training application submitted successfully',
        id: result.insertId 
      });

    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to submit application' 
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}