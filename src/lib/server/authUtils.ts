import { json } from '@sveltejs/kit';
import { pool } from '$lib/db/mysql.js';
import { getCookie } from '$lib/util/auth/AuthCookie.js';
import { log } from '$lib/server/logUtils.js'; // Import the logger
import type { RequestEvent } from '@sveltejs/kit';
import type { RowDataPacket } from 'mysql2';

interface UserAuth extends RowDataPacket {
    expiry_time: string;
    admin: number;
}

/**
 * Verifies the user's admin level.
 * @param cookies - Cookies from the request event.
 * @param requiredLevel - The minimum admin level required.
 * @param options - Additional options to customize behavior.
 * @returns The user's authentication data if valid.
 * @throws An error if the user is unauthorized or lacks permissions.
 */
export async function verifyAdminLevel(
    cookies: RequestEvent['cookies'],
    requiredLevel: number,
    options?: {
        throwOnFail?: boolean; // Throw error on failure (default: true)
        returnUser?: boolean; // Return user data instead of throwing (default: false)
    }
): Promise<UserAuth | undefined> {
    const authToken = getCookie(cookies);

    if (!authToken) {
        await log('WARN', 'No auth token found');
        if (options?.throwOnFail !== false) {
            throw json({ error: 'Unauthorized' }, { status: 401 });
        }
        return undefined;
    }

    try {
        const [results] = await pool.query<UserAuth[]>(
            `
                SELECT admin, expiry_time
                FROM Auth
                WHERE UUID = ? AND expiry_time > UTC_TIMESTAMP()
            `,
            [authToken]
        );

        if (!results || results.length === 0 || results[0].admin < requiredLevel) {
            await log('WARN', 'Insufficient permissions', { admin: results?.[0]?.admin });
            if (options?.throwOnFail !== false) {
                throw json({ error: 'Forbidden: Insufficient permissions' }, { status: 403 });
            }
            return undefined;
        }

        await log('INFO', 'User authorized', results[0]);

        return options?.returnUser ? results[0] : undefined;
    } catch (error) {
        await log('ERROR', 'Error during admin verification', error);
        throw json({ error: 'Internal server error' }, { status: 500 });
    }
}