import { verifyAdminLevel } from "$lib/server/authUtils.js";
import { log } from "$lib/server/logUtils.js";
import { json } from "@sveltejs/kit";
import { pool } from "$lib/db/mysql.js";

export const PUT = async ({ cookies, request }) => {
    const user = await verifyAdminLevel(cookies, 2, { throwOnFail: false, returnUser: true });

    if (!user) {
        await log('WARN', 'Unauthorized PUT attempt');
        return json({ error: 'Please log in with admin credentials' }, { status: 401 });
    }

    try {
        const { product_type_ids, product_name, price, description, image_url, active } = await request.json();
        console.log(product_type_ids);
        console.log(product_name);
        console.log(price);
        console.log(description);
        console.log(image_url);
        console.log(active);


        if (!product_type_ids || !Array.isArray(product_type_ids) || product_type_ids.length === 0 || !product_name || price === undefined || active === undefined) {
            await log('WARN', 'PUT request missing information');
            return json({ error: 'Missing or invalid product field(s)' }, { status: 400 });
        }

        // Insert into Product table
        const [productResult] = await pool.query(
            'INSERT INTO Product (product_name, price, description, image_url, active) VALUES (?, ?, ?, ?, ?)',
            [product_name, price, description, image_url, active]
        );

        // @ts-ignore
        const productId = productResult.insertId;

        // Insert into Product_Type table
        const productTypePromises = product_type_ids.map((typeId) =>
            pool.query('INSERT INTO Product_Type (product_id, product_type_id) VALUES (?, ?)', [productId, typeId])
        );

        await Promise.all(productTypePromises);

        await log('INFO', `Added product successfully with ID ${productId}`, { product_name });
        return json({ success: true });
    } catch (error) {
        await log('ERROR', 'Error adding product', { error });
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};
