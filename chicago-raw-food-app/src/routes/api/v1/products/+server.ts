import { json } from '@sveltejs/kit';
import { pool } from '$lib/db/mysql.js';
import { verifyAdminLevel } from '$lib/server/authUtils.js';
import { log } from '$lib/server/logUtils.js';

export const GET = async () => {
    try {
        const [products] = await pool.query('SELECT * FROM Product');
        await log('INFO', 'Fetched products successfully');
        return json(products);
    } catch (error) {
        await log('ERROR', 'Error fetching products', { error });
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};

export const DELETE = async ({ cookies, request }) => {
    const user = await verifyAdminLevel(cookies, 2, { throwOnFail: false, returnUser: true});

    if (!user) {
        await log('WARN', 'Unauthorized DELETE attempt');
        return json({ error: 'Please log in with admin credentials' }, { status: 401 });
    }

    try {
        const { product_id } = await request.json();
        if (!product_id) {
            await log('WARN', 'DELETE request missing product ID');
            return json({ error: 'Missing product ID' }, { status: 400 });
        }

        await pool.query('DELETE FROM Product WHERE product_id = ?', [product_id]);
        await log('INFO', `Deleted product successfully`, { product_id });
        return json({ success: true });
    } catch (error) {
        await log('ERROR', 'Error deleting product', { error });
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};