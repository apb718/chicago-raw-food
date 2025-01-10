<script lang='ts'>
    export let error: string;
</script>

{#if error}
    <p class="text-sm text-red-500">{error}</p>
{/if}
