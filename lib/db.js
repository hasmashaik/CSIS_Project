import mysql from 'mysql2/promise';

export async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL === 'true' ? {
        rejectUnauthorized: false
      } : false,
      connectTimeout: 60000,
      acquireTimeout: 60000,
      timeout: 60000,
    });
    
    console.log('✅ Aiven Database connected successfully');
    return connection;
  } catch (error) {
    console.error('❌ Aiven Database connection failed:', error.message);
    throw error;
  }
}