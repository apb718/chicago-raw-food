import { json } from '@sveltejs/kit';
import { query } from '$lib/db.server.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { hashPassword } from '$lib/server/hashing.js';

const SECRET_KEY = process.env.JWT_SECRET;
console.log(SECRET_KEY);
if (!SECRET_KEY) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

export const POST = async ({ request }) => {
    console.log('POST request received');

    try {
        const body = await request.json();
        console.log('Request body:', body);

        if (!body.email || !body.password) {
            console.error('Missing email or password');
            return json({ error: 'Missing email or password' }, { status: 400 });
        }

        console.log('Hashing password for debugging purposes');
        const hashedPassword = await hashPassword(body.password);
        console.log(`Hashed password (for testing): ${hashedPassword}`);

        // Fetch user from the database
        console.log('Querying database for user');
        const results = await query(`SELECT id, password_hash FROM auth WHERE email = ?`, [body.email]);
        console.log('Database results:', results);

        if (results.length === 0) {
            console.error('Invalid email or password');
            return json({ error: 'Invalid email or password' }, { status: 400 });
        }

        const user = results[0];
        console.log('User found:', user);

        const isMatch = await bcrypt.compare(body.password, user.password_hash);
        console.log('Password match status:', isMatch);

        if (!isMatch) {
            console.error('Invalid email or password');
            return json({ error: 'Invalid email or password' }, { status: 400 });
        }

        // Generate a JWT
        console.log('Generating JWT');
        const token = jwt.sign(
            { id: user.id, email: body.email },
            SECRET_KEY,
            { expiresIn: '2h' }
        );
        console.log('JWT generated successfully');

        return json({ message: 'Authentication successful', token }, { status: 200 });
    } catch (error) {
        console.error('Error during authentication:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};