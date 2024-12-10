import {verifyAdminLevel} from "$lib/server/authUtils.js";
import {log} from "$lib/server/logUtils.js";
import {json} from "@sveltejs/kit";
import {pool} from "$lib/db/mysql.js";

export const PUT = async ({ cookies, request }) => {
    const user = await verifyAdminLevel(cookies, 2, { throwOnFail: false, returnUser: true});

    if (!user) {
        await log('WARN', 'Unauthorized PUT attempt');
        return json({ error: 'Please log in with admin credentials' }, { status: 401 });
    }

    try {
        const { product_type_id, product_name, price, description, image_url, active } = await request.json();

        console.log(product_type_id);
        if (!product_type_id || !product_type_id || !price || !description || !active) {
            await log('WARN', 'PUT request missing information');
            return json({ error: 'Missing product field(s) ' }, { status: 400 });
        }

        await pool.query('INSERT INTO Product (product_type_id, product_name, price, description, image_url, active) VALUES (?,?,?,?,?,?)', [product_type_id, product_name, price, description, image_url, active]);
        await log('INFO', `Added product successfully`, { product_name });
        return json({ success: true });
    } catch (error) {
        await log('ERROR', 'Error deleting product', { error });
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};