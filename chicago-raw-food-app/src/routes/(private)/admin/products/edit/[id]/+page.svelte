<script lang="ts">
    import { onMount } from 'svelte';

    import { page } from '$app/stores';
    import type {Product} from "../../../../../../types.js";

    let product: Product = {
        product_type_id: [], // Initialize as an empty array
        description: "",
    };



    let loading = true;
    let errorMessage = "";

    const productTypeOptions = [
        { id: 1, name: "Minis" },
        { id: 2, name: "Hot Beverage" },
        { id: 3, name: "Juices" },
        { id: 4, name: "Elixir" },
        { id: 5, name: "Smoothie" },
        { id: 6, name: "Bowl" },
        { id: 7, name: "Entree" },
        { id: 8, name: "Sandwich" },
        { id: 9, name: "Salad" },
        { id: 10, name: "Bread" },
        { id: 11, name: "Spread" },
        { id: 12, name: "Dessert" },
        { id: 13, name: "Breakfast" },
        { id: 14, name: "Dehydrated" },
        { id: 15, name: "Dietary Restriction" },
        { id: 16, name: "cRc Kosher" },
    ];

    // Fetch product details on mount
    onMount(async () => {
        const productId = $page.params.id;

        try {
            const response = await fetch(`/api/v1/products/${productId}`);
            if (response.ok) {
                const fetchedProduct = await response.json();
                console.log("Fetched product:", fetchedProduct);

                console.log(`${fetchedProduct.product_type_id}`)


                // product.product_type_id.push(fetchedProduct.product_type_id);

                // for (const item in fetchedProduct.product_type_id) {
                //     console.log("e " + item);
                //     product.product_type_id.push(item.toString());
                // }

                product = {
                    product_id: fetchedProduct[0].product_id, // Use `:` for property assignment
                    product_type_id: [],
                    product_name: fetchedProduct[0].product_name,
                    price: fetchedProduct[0].price,
                    description: fetchedProduct[0].description,
                    image_url: fetchedProduct[0].image_url,
                    active: fetchedProduct[0].active,
                };

                for (const item of fetchedProduct) {
                    product.product_type_id.push(item.product_type_id);
                }


                console.log("Processed product type IDs:", product.product_type_id);


            } else {
                errorMessage = "Failed to load product details.";
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            errorMessage = "Unexpected error occurred while loading the product.";
        } finally {
            console.log("Initial product_type_id:", product.product_type_id);

            loading = false;
        }
    });

    // Update product details
    async function updateProduct() {
        try {
            console.log("Product before update:", product);

            // Convert product_type_id back to numbers for saving
            const productToSave = {
                ...product,
                product_type_id: product.product_type_id.map(Number),
            };

            const response = await fetch(`/api/v1/products/${product.product_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productToSave),
            });

            if (response.ok) {
                alert("Product updated successfully.");
                window.history.back(); // Redirect back to the products page
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || "Failed to update product."}`);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            alert("Unexpected error occurred.");
        }
    }

    function handleSubmit(event: Event) {
        event.preventDefault(); // Prevent default form submission behavior
        updateProduct();
    }
</script>

<div class="container mt-5">
    <h1 class="text-center mb-4">Edit Product</h1>

    {#if loading}
        <div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    {:else}
        {#if errorMessage}
            <div class="alert alert-danger text-center" role="alert">{errorMessage}</div>
        {:else}
            <form on:submit|preventDefault={handleSubmit} class="needs-validation">
                <div class="mb-3">
                    <label for="product_name" class="form-label">Product Name</label>
                    <input
                            type="text"
                            id="product_name"
                            class="form-control"
                            bind:value={product.product_name}
                            required
                    />
                </div>

                <div class="mb-3">
                    <label class="form-label">Product Types</label>
                    <div class="d-flex flex-wrap">
                        {#each productTypeOptions as { id, name }}

                            <div class="form-check me-3">
                                <label for="{id}">{name}</label>
                                <input
                                        bind:group={product.product_type_id}
                                        type="checkbox"
                                        id="{id}"
                                        value="{id}"
                                />
                            </div>
                        {/each}
                    </div>


                </div>

                <div class="mb-3">
                    <label for="price" class="form-label">Price ($)</label>
                    <input
                            type="number"
                            step="0.01"
                            id="price"
                            class="form-control"
                            bind:value={product.price}
                            required
                    />
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea
                            id="description"
                            class="form-control"
                            rows="3"
                            bind:value={product.description}
                    ></textarea>
                </div>

                <div class="mb-3">
                    <label for="image_url" class="form-label">Image URL</label>
                    <input
                            id="image_url"
                            class="form-control"
                            bind:value={product.image_url}
                    />
                </div>

                <div class="form-check mb-3">
                    <input
                            type="checkbox"
                            id="active"
                            class="form-check-input"
                            bind:checked={product.active}
                    />
                    <label class="form-check-label" for="active">Active</label>
                </div>

                <button type="submit" class="btn btn-primary">Save Changes</button>
            </form>
        {/if}
    {/if}
</div>

<style>
    .container {
        max-width: 800px;
    }
</style>
