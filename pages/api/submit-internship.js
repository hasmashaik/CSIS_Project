import { queryTrainingDb } from '../../../lib/db-training';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { applicant_name, email_id, country_prefix, contact_number, residence_city, preferred_domain, skills_description } = req.body;

    const result = await queryTrainingDb(
      'INSERT INTO internship_programs (applicant_name, email_id, country_prefix, contact_number, residence_city, preferred_domain, skills_description) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [applicant_name, email_id, country_prefix, contact_number, residence_city, preferred_domain, skills_description]
    );

    res.status(200).json({ 
      success: true, 
      message: 'Internship application submitted successfully',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, error: 'Failed to submit application' });
  }
}