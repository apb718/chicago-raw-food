import { redirect } from '@sveltejs/kit';
// @ts-ignore
import type { LayoutLoad } from './$types';
import { pool } from '$lib/db/mysql.js';
import {getCookie} from "$lib/AuthCookie.js";
import type {RowDataPacket} from "mysql2";


interface UserAuth extends RowDataPacket {
    expiry_time: string,
    admin: Number,
}
// @ts-ignore
export const load: LayoutLoad = async ({ cookies }) => {
    // console.log("load admin")
    // Retrieve auth token from cookies
    const authToken = getCookie(cookies);
    // console.log(`Auth Token: ${authToken}`);

    if (!authToken) {
        // If no auth token, redirect to the authentication page
        console.log(`No auth token found: '${authToken}'`);
        throw redirect(303, '/auth');
    }

    try {
        // Query the database to validate the token and get user information
        const [results] = await pool.query<UserAuth[]>(
            'SELECT expiry_time, admin FROM Auth WHERE UUID = ? AND expiry_time > UTC_TIMESTAMP()',
            [authToken]
        );

        console.log('Query Results:', results);

        if (Array.isArray(results) && results.length > 0) {
            const user = results[0];
            console.log('User Data:', user);
            // Check if the user is an admin

            if (user.admin != 2) {
                console.log('User is not an admin');
                throw redirect(303, '/unauthorized');
            }

            // Return user data to the page
            return {
                user,
            };
        } else {
            console.log('No matching user found or token expired');
            throw redirect(303, '/auth');
        }
    } catch (error) {
        // console.error('Error fetching user data:', error.message);
        throw redirect(500, '/error');
    }
};