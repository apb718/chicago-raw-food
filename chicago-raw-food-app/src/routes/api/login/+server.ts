import { json } from '@sveltejs/kit';
import { query } from '$lib/server/dbConnection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type {QueryResult} from "mysql2";
import { createClient} from "redis";
import {hashPassword} from "$lib/server/hashing.js";
import redisClient from '$lib/redisClient';
import { v4 as uuidv4 } from 'uuid';


const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}


// @ts-ignore
export const POST = async ({ request }) => {
    console.log('POST request received');
    // const { username, pasword } = await request.json();
    try {
        const body = await request.json();
        console.log('Request body:', body);

        if (!body.email || !body.password) {
            console.error('Missing email or password');
            return json({ error: 'Missing email or password' }, { status: 400 });
        }

        // Fetch user from the database
        console.log('Querying database for user');
        const results: QueryResult = await query(`SELECT UID, password_hash FROM auth WHERE email = ?`, [body.email]);
        console.log('Database results:', results);



        // @ts-ignore
        const user = results[0];
        console.log('User found:', user);

        // Compare the provided password with the hashed password
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

        // Store the token in Redis with a 2-hour expiration
        await redisClient.set(token, JSON.stringify({ id: user.id, email: body.email }), {
            EX: 7200, // Expire after 2 hours
        });
        return json({ message: 'Authentication successful', token }, { status: 200 });
    } catch (error) {
        console.error('Error during authentication:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};