import {type Handle} from "@sveltejs/kit";

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

    const response = await resolve(event);
    return response;
};