import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Create a connection pool
export const pool=  mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : undefined, // Convert port to number
});

// /**
//  * Execute an SQL query with parameters.
//  *
//  * @param {string} sql - The SQL query string.
//  * @param {any[]} params - The parameters for the SQL query.
//  * @returns {Promise<any[]>} - The query result.
//  */
// export async function query(sql: string, params: any[]) {
//     const [results] = await mysqlconn.execute(sql, params);
//     return results;
// }