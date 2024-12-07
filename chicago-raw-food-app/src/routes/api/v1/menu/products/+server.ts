import { json } from '@sveltejs/kit'; // Ensure this import is included

// @ts-ignore
import type { RequestHandler } from './$types';
import { query } from '$lib/server/dbConnection.ts';
import type {QueryResult} from "mysql2"; // Adjust to match your DB connection setup

export const GET: RequestHandler = async () => {
    try {
        // console.log(query("SELECT * FROM product"));
        const products: QueryResult = await query("SELECT * FROM product WHERE active=?", [true]);
        return json(products); // Return the products as JSON
    } catch (err) {
        console.error('Database query error:', err);
        return json({ error: 'Failed to fetch products' }, { status: 500 });
    }
};