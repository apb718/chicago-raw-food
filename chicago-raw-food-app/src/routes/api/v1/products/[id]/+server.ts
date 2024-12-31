import { json } from '@sveltejs/kit';
import { pool } from '$lib/db/mysql.js';
import { verifyAdminLevel } from '$lib/server/authUtils.js';
import { log } from '$lib/server/logUtils.js';

// @ts-ignore
export const GET = async ({ params }) => {
    const productId = params.id;
    const logId = crypto.randomUUID();

    await log("INFO", `Attempting log of ${productId} - ${logId}`)

    if (!productId) {
        await log('WARN', 'GET request without product ID');
        return json({ error: 'Product ID is required' }, { status: 400 });
    }

    try {
        const [rows]: any = await pool.query(
            'SELECT * FROM Product JOIN Product_Type USING (product_id) WHERE product_id = ?',
            [productId]
        );

        if (rows.length === 0) {
            await log('INFO', `Product not found for ID: ${productId}`);
            return json({ error: 'Product not found' }, { status: 404 });
        }

        await log('INFO', `Product fetched successfully`, { productId });
        return json(rows, { status: 200 });
    } catch (error) {
        await log('ERROR', 'Error fetching product by ID', { error });
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

// @ts-ignore
export const PUT = async ({ cookies, params, request }) => {
    const user = await verifyAdminLevel(cookies, 2, { throwOnFail: false, returnUser: true });

    await log('INFO', `PUT request by user ${user}`);

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
            !Array.isArray(product_type_id) ||
            !product_name ||
            price === undefined ||
            active === undefined
        ) {
            await log('WARN', 'Invalid input data for product update', { body });
            return json({ error: 'Invalid input data' }, { status: 400 });
        }

        // Start a transaction
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Update the `Product` table
            const [productUpdateResult] = await connection.query(
                `UPDATE Product 
                 SET product_name = ?, 
                     price = ?, 
                     description = ?, 
                     image_url = ?, 
                     active = ? 
                 WHERE product_id = ?`,
                [product_name, price, description, image_url, active, productId]
            );

            // @ts-ignore
            if (productUpdateResult.affectedRows === 0) {
                await connection.rollback();
                await log('INFO', `Product not found or no changes made for ID: ${productId}`);
                return json({ error: 'Product not found or no changes made' }, { status: 404 });
            }

            // Delete existing associations in `Product_Type`
            await connection.query(
                `DELETE FROM Product_Type WHERE product_id = ?`,
                [productId]
            );

            // Insert new associations into `Product_Type`
            const productTypeInsertValues = product_type_id.map(
                (typeId) => [productId, typeId]
            );
            await connection.query(
                `INSERT INTO Product_Type (product_id, product_type_id) VALUES ?`,
                [productTypeInsertValues]
            );

            // Commit the transaction
            await connection.commit();
            await log('INFO', `Product and associations updated successfully`, { productId });
            return json({ success: true, message: 'Product updated successfully' }, { status: 200 });
        } catch (error) {
            await connection.rollback();
            await log('ERROR', 'Error updating product during transaction', { error });
            return json({ error: 'Internal server error' }, { status: 500 });
        } finally {
            connection.release();
        }
    } catch (error) {
        await log('ERROR', 'Error updating product', { error });
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};
