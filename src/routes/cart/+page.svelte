<script lang="ts">
    import { onMount } from 'svelte';

    interface User {
        FirstName: string;
        LastName: string;
        [key: string]: any;
    }

    interface ErrorResponse {
        error: string;
    }

    let data: User[] | null = null;
    let error: ErrorResponse | null = null;
    let loading = true;

    async function fetchData(): Promise<void> {
        loading = true;
        try {
            const response = await fetch('/api/data?table=User');
            if (response.ok) {
                data = await response.json();
                error = null;
            } else {
                error = await response.json();
                data = null;
            }
        } catch (err) {
            error = { error: `Network error: ${err.message}` };
            data = null;
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        fetchData();
    });
</script>

{#if loading}
    <p>Loading...</p>
{:else if error}
    <p>Error: {error.error}</p>
{:else if data}
    <ul>
        {#each data as row}
            <li>{row.FirstName} {row.LastName}</li>
        {/each}
    </ul>
{:else}
    <p>No data available.</p>
{/if}