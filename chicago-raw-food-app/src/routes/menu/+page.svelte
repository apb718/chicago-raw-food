<script lang="ts">
    import { onMount } from "svelte";
    import MenuBanner from "$lib/menu/MenuBanner.svelte";
    import MenuItem from "$lib/menu/MenuItem.svelte";

    let menu: any[] = [];
    let loading = true;

    onMount(async () => {
        const response = await fetch("/api/v1/menu/products");
        menu = await response.json();
        loading = false;
    });
</script>

<head>
    <title>Menu</title>
</head>


<MenuBanner />

<div class="row">

</div>
{#if loading}
    <p>Loading...</p>
{:else if menu.length > 0}
    {#each menu as { product_id, product_type_id, product_name, price, description, url }}
        <MenuItem
            itemName={product_name}
            itemDescription = {description}
            itemPrice={price}
            imageURL={url}
        />

    {/each}
{:else}
    <p>No menu items available.</p>
{/if}