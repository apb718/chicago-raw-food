<script lang="ts">
    interface User {
        FirstName: string;
        LastName: string;
        [key: string]: any; // Add this if there are additional unknown fields
    }

    interface ErrorResponse {
        error: string;
    }

    let data: User[] | null = null;
    let error: ErrorResponse | null = null;

    async function fetchData(): Promise<void> {
        try {
            const response = await fetch('/api/data?table=User');
            if (response.ok) {
                data = await response.json();
                error = null; // Clear any previous errors
            } else {
                error = await response.json();
                data = null; // Clear data if there's an error
            }
        } catch (err) {
            error = { error: 'Network error' };
            data = null; // Clear data if there's an error
        }
    }

    fetchData();
</script>

{#if error}
    <p>Error: {error.error}</p>
{:else if data}
    <ul>
        {#each data as row}
            <li>{row.FirstName} {row.LastName}</li>
        {/each}
    </ul>
{:else}
    <p>Loading...</p>
{/if}