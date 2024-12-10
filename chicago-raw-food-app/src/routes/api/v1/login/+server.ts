import { json } from "@sveltejs/kit";
import { pool } from '$lib/db/mysql.js';
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

import type {QueryResult} from "mysql2";
import { createClient} from "redis";
import {hashPassword} from "$lib/server/hashing.js";






// @ts-ignore
export const POST = async ({ request, cookies}) => {
    console.log('POST request received');
    // const { username, pasword } = await request.json();
    try {
        const body = await request.json();
        console.log('Request body:', body);

        // handle missing field (should handle client side)
        if (!body.email || !body.password) {
            console.error('Missing email or password');
            return json({ error: 'Missing email or password' }, { status: 400 });
        }

        // Fetch user from the database
        console.log('Querying database for user');
        const results = await pool.query(`SELECT UID, password_hash FROM Auth WHERE email = ?`, [body.email]);
        // console.log('Database results:', results[0]);



        // @ts-ignore
        const user = results[0][0];
        console.log('User found:', user);

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(body.password, user.password_hash);
        console.log('Password match status:', isMatch);

        if (!isMatch) {
            console.error('Invalid email or password');
            return json({ error: 'Invalid email or password' }, { status: 400 });
        }

        const token: string = uuidv4();
        const currentTime = new Date();
        currentTime.setDate(currentTime.getDate() + 1)

        const currentTimePlusDay = currentTime.toISOString().slice(0,19).replace('T', ' ');

        const [result] = await pool.query("UPDATE Auth " +
            "SET UUID = ?, expiry_time = ? " +
            "WHERE email = ?",
            [token, currentTimePlusDay, body.email])

        cookies.set('auth_token', token, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60*60*24,
        });

        return json({ message: 'Authentication successful', token }, { status: 200 });
    } catch (error) {
        console.error('Error during authentication:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};