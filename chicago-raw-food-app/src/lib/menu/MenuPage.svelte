<script lang="ts">
    import { onMount } from "svelte";
    import { capitalizeWords } from "$lib/CapitalizeWords.js";
    import {removeTrailingZeroes} from "$lib/removeTrailingZeroes.js";

    type Product = {
        product_id: number;
        product_type_id: number;
        type_description: string;
        product_name: string;
        price: number;
        description: string;
        imageUrl?: string | null;
        active: boolean;
    };

    export let categoryIds: number[];
    let products: Product[] = [];
    let displayedTypes: Set<string> = new Set();
    let allTypes: Set<string> = new Set();
    let isLoaded = false;

    async function load() {
        const apiUrl = "/api/v1/menu/";
        for (const categoryId of categoryIds) {
            const response = await fetch(`${apiUrl}${categoryId}`);
            const categoryProducts = await response.json();
            products = [...products, ...categoryProducts];
            allTypes.add(categoryProducts[0].type_description)

        }
        console.log(`fx ${allTypes.size}`);
        isLoaded = true;
    }

    onMount(() => {
        load();
    });

</script>

<!-- Render Products -->
{#if isLoaded}
    {#if products.length > 0}
        <div>

            {#each products as product (product.product_id)}
                {#if !displayedTypes.has(product.type_description)}
                    <h1 class="center-text text-strong-pink">{product.type_description}</h1>
                    {@html (() => { displayedTypes.add(product.type_description); })()}
                {/if}

                <div>
                    <p class="center-text text-strong-green">{capitalizeWords(product.product_name)}</p>
                    <p class="center-text" style="margin-top: -15px">{removeTrailingZeroes(product.price)}</p>
                    <p class="center-text" style="margin-top: -15px">{product.description}</p>
                </div>
            {/each}
        </div>
    {:else}
        <p>Loading or no products available...</p>
    {/if}
{/if}
