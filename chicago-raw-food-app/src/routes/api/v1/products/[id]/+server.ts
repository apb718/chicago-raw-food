import { json } from '@sveltejs/kit';
import { pool } from '$lib/db/mysql.js';

export const GET = async ({ params }) => {
    const productId = params.id;

    if (!productId) {
        return json({ error: 'Product ID is required' }, { status: 400 });
    }

    try {
        const [rows]: any = await pool.query(
            'SELECT * FROM Product WHERE product_id = ?',
            [productId]
        );

        if (rows.length === 0) {
            return json({ error: 'Product not found' }, { status: 404 });
        }

        return json(rows[0], { status: 200 });
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

export const PUT = async ({ params, request }) => {
    const productId = params.id;

    if (!productId) {
        return json({ error: 'Product ID is required' }, { status: 400 });
    }

    try {
        const body = await request.json();
        const { product_type_id, product_name, price, description, image_url, active } = body;

        console.log(product_type_id, product_name, price, description, image_url, active);
        console.log(product_name);
        console.log(typeof price);
        console.log(description);
        console.log(active);

        // Validate input fields
        // if (
        //     !product_name ||
        //     !description ||
        //     (active !== true && active !== false)
        // ) {
        //     return json({ error: 'Invalid input data' }, { status: 400 });
        // }

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
            return json({ error: 'Product not found or no changes made' }, { status: 404 });
        }

        return json({ success: true, message: 'Product updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating product:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};