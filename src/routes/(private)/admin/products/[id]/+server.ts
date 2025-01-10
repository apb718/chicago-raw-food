import { json } from '@sveltejs/kit';
import { pool } from '$lib/db/mysql.js';

export const GET = async ({ params }) => {
    const { id } = params;
    try {
    const [product]: any = await pool.query('SELECT * FROM Product WHERE product_id = ?', [id]);
    if (product.length === 0) {
    return json({ error: 'Product not found' }, { status: 404 });
}
    return json(product[0]);
} catch (error) {
    console.error('Error fetching product:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
}
};

export const PUT = async ({ params, request }) => {
    const { id } = params;
    const { product_type_id, product_name, price, description, image_url, active } = await request.json();

    if (!product_type_id || !product_name || price === undefined || !description) {
    return json({ error: 'Invalid input' }, { status: 400 });
}

    try {
    await pool.query(
    'UPDATE Product SET product_type_id = ?, product_name = ?, price = ?, description = ?, image_url = ?, active = ? WHERE product_id = ?',
    [product_type_id, product_name, price, description, image_url, active, id]
    );
    return json({ success: true });
} catch (error) {
    console.error('Error updating product:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
}
};