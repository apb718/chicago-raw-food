import {redirect} from "@sveltejs/kit";

export function load() {
    // Redirect to the new route (status code 302 by default)
    throw redirect(302, '/');
}