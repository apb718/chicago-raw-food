import { redirect } from '@sveltejs/kit';
import { pool } from '$lib/db/mysql.js';
import { getCookie } from '$lib/AuthCookie.js';
import type { RowDataPacket } from 'mysql2';

interface UserAuth extends RowDataPacket {
    expiry_time: string;
    admin: number;
}

const log = (message: string, data?: unknown) => {
    console.log(`[Auth Utility] ${message}`, data || '');
};

export async function requireAdmin(cookies: any): Promise<UserAuth> {
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
                throw redirect(303, '/auth');
            }

            return user;
        } else {
            log('No matching user found or token expired');
            throw redirect(303, '/auth');
        }
    } catch (error) {
        log('Error validating user:', error);
        throw redirect(500, '/error');
    }
}