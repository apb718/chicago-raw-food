import { json } from '@sveltejs/kit'; // Ensure this import is included
// @ts-ignore
import type { RequestHandler } from './$types';
import { pool } from '$lib/db/mysql.ts';

export const GET: RequestHandler = async () => {
    try {
        const products = await pool.query("SELECT * FROM Product WHERE active=?", [true]);
        return json(products); // Return the products as JSON
    } catch (err) {
        console.error('Database query error:', err);
        return json({ error: 'Failed to fetch products' }, { status: 500 });
    }
};