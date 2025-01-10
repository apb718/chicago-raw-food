import {pool} from '$lib/db/mysql.js';
import {log} from "$lib/server/logUtils.ts"
import type {RowDataPacket} from 'mysql2';

interface UserAuth extends RowDataPacket {
    expiry_time: string;
    admin: number;
}


async function verifyIfAdmin(authToken: string): Promise<Boolean> {
    try {
        // Gets user from Auth in database
        const [results] = await pool.query<UserAuth[]>(
            `
                SELECT expiry_time, admin
                FROM Auth
                WHERE UUID = ?
                  AND expiry_time > UTC_TIMESTAMP()
            `,
            [authToken]
        );

        await log('INFO', `Query Results: ${results}`);

        // Verifies it is an array, and there is data
        if (Array.isArray(results) && results.length > 0) {
            // gets first "User"
            const user = results[0];
            await log('INFO', `User Data: ${user}`);

            // if user is admin let through
            if (user.admin == 2) {

                return true;
            }

            // user is not level 2
            await log("INFO", `User is not an admin`);
            return false;
        } else {
            await log("INFO", `No matching user found or token expired`);
            return false;
        }
    } catch (error) {
        return false;
    }
}

export async function requireAdmin(authToken: string): Promise<Boolean> {

    if (!authToken) {
        await log("INFO", `No auth token found ${authToken}`);
        return false;
    }

    const isAdmin = await verifyIfAdmin(authToken);

    if (!isAdmin) {
        return false;
    } else {
        return true;
    }
}