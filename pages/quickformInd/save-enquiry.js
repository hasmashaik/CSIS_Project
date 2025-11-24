import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let connection;
  
  try {
    const {
      full_name,
      email,
      phone,
      alternate_phone,
      location,
      college,
      degree,
      stream,
      passing_year,
      experience,
      course,
      source,
      questions,
      team,
      type,
      key_label,
      country_code,
      branch
    } = req.body;

    connection = await connectToDatabase();

    const [result] = await connection.execute(
      `INSERT INTO course_enquiries 
       (full_name, email, phone, alternate_phone, location, college, degree, stream, passing_year, 
        experience, course, source, questions, team, type, key_label, country_code, branch) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        full_name,
        email || null,
        phone,
        alternate_phone || null,
        location || null,
        college || null,
        degree || null,
        stream || null,
        passing_year || null,
        experience || null,
        course || null,
        source || null,
        questions || null,
        team || null,
        type || null,
        key_label || null,
        country_code || 'India +91',
        branch || null
      ]
    );

    res.status(200).json({ 
      success: true, 
      message: 'Enquiry saved successfully',
      id: result.insertId 
    });
    
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save enquiry to database' 
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}