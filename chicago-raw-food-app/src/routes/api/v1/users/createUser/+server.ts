import { json } from '@sveltejs/kit';
import { pool } from '$lib/db/mysql.js';
import { hashPassword } from '$lib/server/hashing.js';
import { log } from '$lib/server/logUtils.js';

export const POST = async ({ request, cookies }) => {
    const authToken = cookies.get('auth_token') ?? '';
    await log('INFO', 'Attempting to add user', { authToken });

    if (!authToken) {
        await log('WARN', 'Unauthorized request: Missing auth token');
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Verify the auth token and check for admin level
        const [results]: any = await pool.query(
            'SELECT admin FROM Auth WHERE UUID = ? AND expiry_time > UTC_TIMESTAMP();',
            [authToken]
        );

        if (results.length === 0 || results[0].admin !== 2) {
            await log('WARN', 'Insufficient permissions or invalid auth token', { authToken });
            return json({ error: 'Forbidden: Insufficient permissions' }, { status: 403 });
        }

        // Parse the request body
        const { email, password, admin } = await request.json();

        if (!email || !password || admin === undefined) {
            await log('WARN', 'Invalid input data', { email, admin });
            return json({ error: 'Invalid Input' }, { status: 400 });
        }

        // Check if a user with this email already exists
        const [emailCheck]: any = await pool.query(
            'SELECT email FROM Auth WHERE email = ?',
            [email]
        );

        if (emailCheck.length > 0) {
            await log('WARN', 'User already exists', { email });
            return json({ error: 'User already exists with this email' }, { status: 409 });
        }

        // Hash the user's password
        const password_hash: string = await hashPassword(password);

        // Insert the new user into the database
        const [insertResult]: any = await pool.query(
            'INSERT INTO Auth (email, password_hash, admin) VALUES (?, ?, ?)',
            [email, password_hash, admin]
        );

        await log('INFO', 'User added successfully', { email, userId: insertResult.insertId });
        return json({ success: true, userId: insertResult.insertId }, { status: 201 });
    } catch (error) {
        await log('ERROR', 'Error processing user creation', { error });
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};