<script lang="ts">
    export let title: string;
    export let description: string = '';
    export let actionText: string = 'Action';
    export let pageAction: () => void; // Function to be called when the button is clicked
</script>

<div class="card">
    <h3>{title}</h3>
    {#if description}
        <p>{description}</p>
    {/if}
    <button on:click={pageAction}>{actionText}</button>
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