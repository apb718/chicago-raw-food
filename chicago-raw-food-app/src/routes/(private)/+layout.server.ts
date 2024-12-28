import { requireAdmin } from '$lib/server/auth.js';
import {redirect} from "@sveltejs/kit";

export const load = async ({ cookies, url }) => {
    const authToken: string = cookies.get("auth_token") ?? "";

    const authenticated: Boolean = await requireAdmin(authToken); // Reuse the utility function

    const redirectTo = url.pathname;


    if (authenticated) {
        return;
    }

    // go to auth with authentication if possible
    if (redirectTo) {
        throw redirect(302, `/auth?redirectTo=${redirectTo.slice(1)}`);
    } else {
        throw redirect(302, `/auth}`);
    }

};
