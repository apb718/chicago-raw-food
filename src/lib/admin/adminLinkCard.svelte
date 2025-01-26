<script lang="ts">
    let { 
        title = '',
        description = '',
        actionText = 'Action',
        pageAction = () => {
            return async ({ update }) => {
                await update()
            }
        },
    } = $props();
</script>

<div class="card">
    <h3>{title}</h3>
    {#if description}
        <p>{description}</p>
    {/if}
    <button onclick={pageAction}>{actionText}</button>
</div>

<style>
    .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 1rem;
        margin: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    h3 {
        margin: 0 0 0.5rem;
    }
    p {
        margin: 0 0 1rem;
    }
    button {
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    button:hover {
        background-color: #0056b3;
    }
</style>