<script lang="ts">
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";
    import { capitalizeWords } from "$lib/CapitalizeWords.js";
    import { removeTrailingZeroes } from "$lib/removeTrailingZeroes.js";
    import { Card, CardHeader, CardTitle, CardContent } from "$lib/components/ui/card";
    import type Product from "$lib/types.js";

    let { categoryIds } = $props();

    let products: Product[] = $state<Product[]>([]);
    let displayedTypes: Set<string> = $state(new Set());
    let allTypes: Set<string> = $state(new Set());
    let isLoaded = $state(false);

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
        class="container mx-auto p-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        in:slide={{ duration: 400 }}
    >
        {#each products as product (product.product_id)}
            {#if !displayedTypes.has(product.type_description)}
                <h2 class="col-span-full text-center text-2xl font-bold text-pink-500">
                    {product.type_description}
                </h2>
                {@html (() => { displayedTypes.add(product.type_description); })()}
            {/if}

            <!-- Product Card -->
            <Card>
                <CardHeader>
                    <CardTitle class="text-lg text-green-600 font-semibold">
                        {capitalizeWords(product.product_name)}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-gray-700 text-sm">
                        Price: ${removeTrailingZeroes(product.price)}
                    </p>
                    <p class="text-gray-600 mt-2 text-sm">
                        {product.description}
                    </p>
                </CardContent>
            </Card>
        {/each}
    </section>
{:else}
    <p class="text-center text-gray-500 mt-6">Loading or no products available...</p>
{/if}