import { json } from '@sveltejs/kit';
import { pool } from '$lib/db/mysql.js';
import { verifyAdminLevel } from '$lib/server/authUtils.js';
import { log } from '$lib/server/logUtils.js';

// @ts-ignore
export const GET = async ({ params }) => {
    const productId = params.id;

    if (!productId) {
        await log('WARN', 'GET request without product ID');
        return json({ error: 'Product ID is required' }, { status: 400 });
    }

    try {
        const [rows]: any = await pool.query(
            'SELECT * FROM Product WHERE product_id = ?',
            [productId]
        );

        if (rows.length === 0) {
            await log('INFO', `Product not found for ID: ${productId}`);
            return json({ error: 'Product not found' }, { status: 404 });
        }

        await log('INFO', `Product fetched successfully`, { productId });
        return json(rows[0], { status: 200 });
    } catch (error) {
        await log('ERROR', 'Error fetching product by ID', { error });
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

// @ts-ignore
export const PUT = async ({ cookies, params, request }) => {
    const user = await verifyAdminLevel(cookies, 2, { throwOnFail: false, returnUser: true});

    await log('INFO', `PUT request withid ${user}`);

    if (!user) {
        await log('WARN', 'Unauthorized PUT attempt');
        return json({ error: 'Please log in with admin credentials' }, { status: 401 });
    }

    const productId = params.id;

    if (!productId) {
        await log('WARN', 'PUT request without product ID');
        return json({ error: 'Product ID is required' }, { status: 400 });
    }

    try {
        const body = await request.json();
        const { product_type_id, product_name, price, description, image_url, active } = body;

        // Validate input fields
        if (
            product_type_id === undefined ||
            !product_name ||
            price === undefined ||
            !description ||
            active === undefined
        ) {
            await log('WARN', 'Invalid input data for product update', { body });
            return json({ error: 'Invalid input data' }, { status: 400 });
        }

        // Update the product in the database
        const [result]: any = await pool.query(
            `UPDATE Product 
             SET product_type_id = ?, 
                 product_name = ?, 
                 price = ?, 
                 description = ?, 
                 image_url = ?, 
                 active = ? 
             WHERE product_id = ?`,
            [product_type_id, product_name, price, description, image_url, active, productId]
        );

        if (result.affectedRows === 0) {
            await log('INFO', `Product not updated or not found for ID: ${productId}`);
            return json({ error: 'Product not found or no changes made' }, { status: 404 });
        }

        await log('INFO', `Product updated successfully`, { productId });
        return json({ success: true, message: 'Product updated successfully' }, { status: 200 });
    } catch (error) {
        await log('ERROR', 'Error updating product', { error });
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};