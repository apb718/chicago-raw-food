import { json } from '@sveltejs/kit';
import { pool } from '$lib/db/mysql.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const POST = async ({ request, cookies }) => {
    console.log('POST request received');

    try {
        // Parse request body
        const { email, password } = await request.json();
        if (!email || !password) {
            console.error('Missing email or password');
            return json({ error: 'Missing email or password' }, { status: 400 });
        }

        // Fetch user from the database
        const [results]: any = await pool.query(
            'SELECT UID, password_hash FROM Auth WHERE email = ?',
            [email]
        );

        if (!results.length) {
            console.error('User not found');
            return json({ error: 'Invalid email or password' }, { status: 400 });
        }

        const user = results[0];
        console.log('User found:', user);

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            console.error('Invalid email or password');
            return json({ error: 'Invalid email or password' }, { status: 400 });
        }

        // Generate authentication token and expiry time
        const token = uuidv4();
        const currentTime = new Date();
        currentTime.setDate(currentTime.getDate() + 1); // Add 1 day
        const expiryTime = currentTime.toISOString().slice(0, 19).replace('T', ' ');

        // Update the user's session in the database
        await pool.query(
            `UPDATE Auth SET UUID = ?, expiry_time = ? WHERE email = ?`,
            [token, expiryTime, email]
        );

        // Set the auth token as an HTTP-only cookie
        cookies.set('auth_token', token, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
        });

        console.log('Authentication successful');
        return json({ message: 'Authentication successful', token }, { status: 200 });
    } catch (error) {
        console.error('Error during authentication:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};