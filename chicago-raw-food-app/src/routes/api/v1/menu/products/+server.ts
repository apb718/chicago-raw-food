import { json } from '@sveltejs/kit'; // Ensure this import is included
// @ts-ignore
import type { RequestHandler } from './$types';
import { pool } from '$lib/db/mysql.ts';
import { log } from '$lib/server/logUtils.ts'; // Import the custom logger

export const GET: RequestHandler = async () => {
    try {
        const products = await pool.query("SELECT * FROM Product WHERE active=?", [true]);
        await log('INFO', 'Fetched products successfully', { productsCount: products.length });
        return json(products); // Return the products as JSON
    } catch (err) {
        await log('ERROR', 'Database query error', err);
        return json({ error: 'Failed to fetch products' }, { status: 500 });
    }
};