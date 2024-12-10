import { requireAdmin } from '$lib/server/auth.js';

export const load = async ({ cookies }) => {
    const user = await requireAdmin(cookies); // Reuse the utility function
    return { user };
};