import mysql from 'mysql2/promise';

// Aiven MySQL configuration for training_internshipdb
const trainingDbConfig = {
  host: 'mysql-3bb83ffe-hasma200114-16c6.k.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_6_7hJk4Y9t5q3b2n1w', // Your actual Aiven password
  database: 'training_internshipdb',
  port: 21760,
  ssl: {
    rejectUnauthorized: true
  },
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000
};

// Database connection utility (your existing function)
export async function connectToTrainingDatabase() {
  try {
    console.log('🔗 Connecting to training database...');
    const connection = await mysql.createConnection(trainingDbConfig);
    
    // Test connection
    await connection.execute('SELECT 1');
    console.log('✅ Training database connected successfully');
    
    return { 
      connection,
      status: 'connected'
    };
  } catch (error) {
    console.error('❌ Training database connection failed:', error);
    throw new Error('Training database connection failed');
  }
}

// New function for executing queries
export async function queryTrainingDb(query, values = []) {
  let connection;
  try {
    connection = await mysql.createConnection(trainingDbConfig);
    const [results] = await connection.execute(query, values);
    return results;
  } catch (error) {
    console.error('Training Database error:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}