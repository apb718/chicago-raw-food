import { pool } from "$lib/db/mysql.ts";
import { redirect, type Handle } from "@sveltejs/kit";
import { updateAuth } from "$lib/server/updateAuth.js";

export const handle: Handle = async ({ event, resolve }) => {
    const isAuth: boolean = event.url.pathname === '/auth';

    if (isAuth) {
        event.cookies.set('auth_token', '', {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 0
        });
        return resolve(event);
    }
    //
    // const auth_cookie = event.cookies.get('auth_token') ?? '';
    // console.log(auth_cookie)
    // const token = await pool
    //     .query("SELECT UUID, expiry_time FROM Auth WHERE UUID=?",
    //              [auth_cookie]);
    //
    // // @ts-ignore
    //
    // try {
    //     // @ts-ignore
    //     const user = token[0][0];
    //     const user_uuid = user.UUID;
    //     const user_expiry = user.expiry_time;
    //
    //     if(new Date().getTime() < user_expiry) {
    //         await updateAuth(user_uuid);
    //     } else {
    //         // Token has gone dead
    //     }
    // } catch (error) {
    //     console.log("Unable to reauthenticate UUID");
    // }

    const response = await resolve(event);
    return response;
};