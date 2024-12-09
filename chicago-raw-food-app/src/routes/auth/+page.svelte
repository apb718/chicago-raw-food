<script lang=”ts”>
    import { pool } from '$lib/db/mysql.ts'

    const ms = pool;

    async function login(form) {
        try {
            await ms.query("SELECT * ")
        } catch (err) {
            console.error(err);
        }
    }
</script>

<form method="post" on:submit|preventDefault={(e) => login(e.currentTarget)}>
    <input name="token" type="hidden" />
    <button
            class="border rounded p-2 mt-10 bg-gray-800 text-white hover:bg-gray-700"
    >
        Login using Github
    </button>
</form>