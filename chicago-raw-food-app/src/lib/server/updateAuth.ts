import {pool} from "$lib/db/mysql.js";

/**
 * Updates the Auth to refresh to 1 day forward
 * @param UUID
 */
export async function updateAuth(UUID: string): Promise<boolean> {

    const currentTime = new Date();
    currentTime.setDate(currentTime.getDate() + 1)

    const currentTimePlusDay = currentTime.toISOString().slice(0,19).replace('T', ' ');
    console.log(currentTimePlusDay);
    try {
        const [result] = await pool.execute("UPDATE Auth " +
            "SET expiry_time = ? " +
            "WHERE UUID = ?",
            [ currentTimePlusDay, UUID ]);


        console.log(`Updated token ${UUID}`)
        return true;
    } catch (error) {
        console.error("Error updating Auth table:", error);
        return false;
    }

}
