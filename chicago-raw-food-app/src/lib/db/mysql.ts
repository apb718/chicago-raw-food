import mysql from 'mysql2/promise';
import { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_PORT} from "$env/static/private";


// Create a connection pool
export const pool=  mysql.createPool({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    port: DATABASE_PORT ? parseInt(DATABASE_PORT, 10) : undefined, // Convert port to number
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