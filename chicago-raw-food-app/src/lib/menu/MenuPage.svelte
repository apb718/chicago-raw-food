<script lang="ts">
    import { onMount } from "svelte";

    type Product = {
        product_id: number;
        product_type_id: number;
        product_type_name: string;
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
                        product_type_name: item.product_type_name,
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
<h1>Products</h1>
{#if products.length > 0}
    <ul>
        {#each products as product}
            <li>
                <strong>{product.product_name}</strong> - ${product.price}
                <p>{product.product_type_id}</p>
                <p>{product.description}</p>
            </li>
        {/each}
    </ul>
{:else}
    <p>Loading or no products available...</p>
{/if}
