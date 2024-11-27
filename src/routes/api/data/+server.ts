import type {RequestHandler} from './$types';
import {query} from '$lib/db.js';

export const GET: RequestHandler = async ({url}: { url: URL }) => {
    // Extract 'table' query parameter
    const table = url.searchParams.get('table');

    if (!table) {
        return new Response(JSON.stringify({error: 'Table parameter is required'}), {status: 400});
    }

    try {
        // Validate the table name (optional: to prevent SQL injection)
        const validTables = ['user', 'sampleorders']; // Lowercase for comparison

        if (validTables.at(0) == table.toLowerCase().trim()) {
            console.log('derp');
        }
        if (!validTables.includes(table.trim().toLowerCase())) {
            return new Response(JSON.stringify({error: 'Invalid table name'}), {status: 400});
        }

        // Query the database
        const results = await query(`SELECT *
                                     FROM ${table.toUpperCase()}`, []); // Use parameterized queries

        return new Response(JSON.stringify(results), {status: 200});
    } catch (error) {
        console.error(`1 ${error}`);
        return new Response(JSON.stringify({error: 'Failed to fetch data'}), {status: 500});
    }
};