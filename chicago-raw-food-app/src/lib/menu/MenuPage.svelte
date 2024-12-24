<script lang="ts">
    import { onMount } from "svelte";
    import {capitalizeWords} from "$lib/CapitolizeWords.js";

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

    export let categoryIds: number[]; // The IDs to loop through
    let products: Product[] = []; // Array to store all fetched products

    // Define the load function
    async function load() {
        console.log("load categories");
        try {
            // Base API URL (replace with your actual API URL)
            const apiUrl = "/api/v1/menu/";

            // Fetch data for each categoryId
            for (const categoryId of categoryIds) {
                const response = await fetch(`${apiUrl}${categoryId}`);

                console.log(`INFO fetching ${categoryId} for menu page`);


                if (!response.ok) {
                    throw new Error(`Failed to fetch data for categoryId ${categoryId}: ${response.status}`);
                }

                // Parse the response as JSON
                const categoryProducts = await response.json();

                // // Append the fetched products to the products array
                for (const item of categoryProducts) {
                    products.push({
                        product_id: item.productId,
                        product_type_id: item.product_type_id,
                        type_description: item.type_description,
                        product_name: item.product_name,
                        price: item.price,
                        description: item.description,
                        imageUrl: item.imageUrl ?? null,
                        active: item.active,
                    });
                }

                products = [...products, ...categoryProducts];
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Call the load function when the component is mounted
    onMount(() => {
        load();
    });

</script>

<!-- Display the fetched products -->
{#if products.length > 0}

    <div class="row">

        <div class="col-xl-3"></div>
        <div class="col-xl-6">
            <h1 class="center-text">{products[0].type_description}</h1>
            {#each products as product}
                <div class="row mb-3">
                    <strong class="center-text">{capitalizeWords(product.product_name)}</strong>
                    <p class="center-text">{parseFloat(product.price).toString()}</p>
                    <p class="center-text" style="margin-top: -15px">{product.description}</p>
                </div>

            {/each}
        </div>
        <div class="col-xl-3"></div>
    </div>

{:else}
    <p>Loading or no products available...</p>
{/if}
