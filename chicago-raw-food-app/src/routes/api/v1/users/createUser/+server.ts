import { json } from '@sveltejs/kit';
import { pool } from '$lib/db/mysql.js';
import { hashPassword } from '$lib/server/hashing.js';

export const POST = async ({ request, cookies }) => {
    // Retrieve the auth token from cookies
    const authToken = cookies.get('auth_token') ?? '';
    console.log(`ADD USER AUTH: ${authToken}`);
    if (!authToken) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Verify the auth token and check for admin level
        const [results]: any = await pool.query(
            'SELECT admin FROM Auth WHERE UUID = ? AND expiry_time < NOW();',
            [authToken]
        );
        console.log(results)
        if (results.length === 0 || results[0].admin !== 2) {
            return json({ error: 'Forbidden: Insufficient permissions' }, { status: 403 });
        }

        // Parse the request body
        const { email, password, admin } = await request.json();

        if (!email || !password || admin === undefined) {
            return json({ error: 'Invalid Input' }, { status: 400 });
        }

        // Hash the user's password
        const password_hash: string = await hashPassword(password);

        // Insert the new user into the database
        const [insertResult]: any = await pool.query(
            'INSERT INTO Auth (email, password_hash, admin) VALUES (?, ?, ?)',
            [email, password_hash, admin]
        );

        return json({ success: true, userId: insertResult.insertId }, { status: 201 });
    } catch (error) {
        console.error('Error processing request:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};