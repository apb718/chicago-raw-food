// @ts-ignore
import type { RequestHandler } from './$types';
import { query } from '$lib/server/dbConnection.js';

export const GET: RequestHandler = async ({ url }: { url: URL }) => {
    // Extract 'table' query parameter
    const table = url.searchParams.get('table');

    if (!table) {
        return new Response(
            JSON.stringify({ error: 'Table parameter is required' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        // Map of valid table names to prevent SQL injection
        const tableMap: Record<string, string> = {
            user: 'USER',
            sampleorders: 'SAMPLEORDERS',
        };

        const tableName = tableMap[table.toLowerCase().trim()];
        if (!tableName) {
            return new Response(
                JSON.stringify({ error: 'Invalid table name' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Query the database
        const results = await query(`SELECT * FROM ${tableName}`, []);

        return new Response(JSON.stringify(results), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(`Error fetching data from table ${table}:`, error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};