import { pool } from "$lib/db/mysql.js";
import { log } from "$lib/server/logUtils.js"
/**
 * Updates the Auth to refresh to 1 day forward
 * @param UUID - The unique identifier of the auth token
 * @returns A boolean indicating the success of the operation
 */
export async function updateAuth(UUID: string): Promise<boolean> {
    const currentTime = new Date();
    currentTime.setDate(currentTime.getDate() + 1);

    const currentTimePlusDay = currentTime.toISOString().slice(0, 19).replace('T', ' ');

    await log('INFO', `Attempting to update expiry_time to ${currentTimePlusDay} for token: ${UUID}`);

    try {
        const [result] = await pool.execute(
            "UPDATE Auth SET expiry_time = ? WHERE UUID = ?",
            [currentTimePlusDay, UUID]
        );

        await log('INFO', `Successfully updated token expiry_time`, {
            UUID,
            newExpiryTime: currentTimePlusDay,
            result,
        });

        return true;
    } catch (error) {
        await log('ERROR', `Error updating Auth table`, { UUID, error });
        return false;
    }
}