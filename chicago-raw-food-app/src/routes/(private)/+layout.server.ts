import { redirect, type RequestEvent } from '@sveltejs/kit';
import { pool } from '$lib/db/mysql.js';
// @ts-ignore
import type { LayoutLoad } from "./$types.js";
import { getCookie } from '$lib/AuthCookie.js';
import type { RowDataPacket } from 'mysql2';

interface UserAuth extends RowDataPacket {
    expiry_time: string;
    admin: number;
}

const log = (message: string, data?: unknown) => {
    console.log(`[Layout Load] ${message}`, data || '');
};

export const load: LayoutLoad = async ({ cookies }: RequestEvent) => {
    log('Loading admin layout');

    // Retrieve auth token from cookies
    const authToken = getCookie(cookies);

    if (!authToken) {
        log('No auth token found', { authToken });
        throw redirect(303, '/auth');
    }

    try {
        const [results] = await pool.query<UserAuth[]>(
            `
                SELECT expiry_time, admin
                FROM Auth
                WHERE UUID = ?
                  AND expiry_time > UTC_TIMESTAMP()
            `,
            [authToken]
        );

        log('Query Results:', results);

        if (Array.isArray(results) && results.length > 0) {
            const user = results[0];
            log('User Data:', user);

            if (user.admin !== 2) {
                log('User is not an admin');
                throw redirect(303, '/unauthorized');
            }

            return { user };
        } else {
            log('No matching user found or token expired');
            throw redirect(303, '/auth');
        }
    } catch (error) {
        log('Error fetching user data:', error);
        throw redirect(500, '/error');
    }
};