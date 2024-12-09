import { pool } from "$lib/db/mysql.ts";
import { redirect, type Handle } from ‘@sveltejs/kit’;

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.id = '';
    event.locals.email = '';
    event.locals.pb = new PocketBase('http://localhost:8080');

    const isAuth: boolean = event.url.pathname === '/auth';
    if (isAuth) {
        event.cookies.set('pb_auth', '');
        return await resolve(event);
    }

    const auth_cookie = event.request.headers.get('cookie') ?? '';
    const token = await pool.query("SELECT UUID, expiry_time FROM Auth WHERE UUID=? AND expiry_time>CURRENT_TIME", [auth_cookie]);
    console.log(token);

    if (!token) {
        console.log('Session expired');
        throw redirect(303, '/auth');
    }

    try {
        const auth = await event.locals.pb
            .collection('users')
            .authRefresh<{ id: string; email: string }>();
        event.locals.id = auth.record.id;
        event.locals.email = auth.record.email;
    } catch (_) {
        throw redirect(303, '/auth');
    }

    if (!event.locals.id) {
        throw redirect(303, '/auth');
    }

    const response = await resolve(event);
    const cookie = event.locals.pb.authStore.exportToCookie({ sameSite: 'lax' });
    response.headers.append('set-cookie', cookie);
    return response;
};