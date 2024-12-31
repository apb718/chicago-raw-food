<script lang="ts">
    import { onMount } from "svelte";
    import { slide } from "svelte/transition"
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
        isLoaded = true;
    }

    onMount(() => {
        load();
    });

</script>

<!-- Render Products -->
{#if isLoaded && products.length > 0}

    <section
            class="animated-section"
            in:slide={{ duration: 400 }}
    >

        {#each products as product (product.product_id)}
            {#if !displayedTypes.has(product.type_description)}
                <h1 class="center-text text-strong-pink">{product.type_description}</h1>
                {@html (() => { displayedTypes.add(product.type_description); })()}
            {/if}

            <div class="mb-5">
                <p class="center-text text-strong-green">{capitalizeWords(product.product_name)} </p>
                <p class="center-text" style="margin-top: -15px">{removeTrailingZeroes(product.price)}</p>
                <p class="center-text" style="margin-top: -15px">{product.description}</p>
            </div>
        {/each}
    </section>
{:else}
    <p>Loading or no products available...</p>
{/if}


<style>
    /*section.animated-section {*/
    /*    margin: 2rem auto;*/
    /*    padding: 1rem;*/
    /*    max-width: 600px;*/
    /*    background-color: #f9f9f9;*/
    /*    border: 1px solid #ddd;*/
    /*    border-radius: 8px;*/
    /*    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);*/
    /*}*/
</style>
