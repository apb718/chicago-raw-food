import { json } from '@sveltejs/kit';
import { pool } from '$lib/db/mysql.js';
import { log } from '$lib/server/logUtils.js';

// @ts-ignore
export const GET = async ({ params }) => {
    const product_type = params.id;
    const logId = crypto.randomUUID();

    await log("INFO", `Attempting log of ${product_type} - ${logId}`)

    if (!product_type) {
        await log('WARN', 'GET request without product ID');
        return json({ error: 'Product ID is required' }, { status: 400 });
    }

    try {
        const [rows]: any = await pool.query(
            'SELECT * FROM Product WHERE product_type_id = ?',
            [product_type]
        );

        if (rows.length === 0) {
            await log('INFO', `Product not found for ID: ${product_type}`);
            return json({ error: 'Product not found' }, { status: 404 });
        }

        await log('INFO', `Product fetched successfully`, { product_type });
        return json(rows, { status: 200 });
    } catch (error) {
        await log('ERROR', 'Error fetching product by ID', { error });
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
