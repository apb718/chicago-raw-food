import { json } from '@sveltejs/kit';
import { pool } from '$lib/db/mysql.js';

export const GET = async () => {
    try {
        const [products] = await pool.query('SELECT * FROM Product');
        return json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};

export const DELETE = async ({ request }) => {
    try {
        const { product_id } = await request.json();
        if (!product_id) {
            return json({ error: 'Missing product ID' }, { status: 400 });
        }

        await pool.query('DELETE FROM Product WHERE product_id = ?', [product_id]);
        return json({ success: true });
    } catch (error) {
        console.error('Error deleting product:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};