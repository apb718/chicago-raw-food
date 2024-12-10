<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    let product: {
        product_id?: number;
        product_type_id?: number;
        product_name?: string;
        price?: number;
        description?: string;
        image_url?: string;
        active?: number;
    } = {};
    let loading = true;
    let errorMessage = '';

    // Fetch product details on mount
    onMount(async () => {
        const productId = $page.params.id;

        try {
            const response = await fetch(`/api/v1/products/${productId}`);
            if (response.ok) {
                product = await response.json();
            } else {
                errorMessage = 'Failed to load product details.';
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            errorMessage = 'Unexpected error occurred while loading the product.';
        } finally {
            loading = false;
        }
    });

    // Update product details
    async function updateProduct() {
        try {
            console.log(product);
            const response = await fetch(`/api/v1/products/${product.product_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            if (response.ok) {
                alert('Product updated successfully.');
                goto('/admin/products'); // Redirect back to the products page
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Failed to update product.'}`);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            alert('Unexpected error occurred.');
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
                    <label for="product_type_id" class="form-label">Product Type</label>
                    <select id="product_type_id" class="form-select" bind:value={product.product_type_id}>
                        <option value="1">Minis</option>
                        <option value="2">Hot Beverage</option>
                        <option value="3">Juices</option>
                        <option value="4">Elixir</option>
                        <option value="5">Smoothie</option>
                        <option value="6">Bowl</option>
                        <option value="7">Entree</option>
                        <option value="8">Sandwich</option>
                        <option value="9">Salad</option>
                        <option value="10">Bread</option>
                        <option value="11">Spread</option>
                        <option value="12">Dessert</option>
                        <option value="13">Breakfast</option>
                        <option value="14">Dehydrated</option>
                        <option value="15">Dietary Restriction</option>
                        <option value="16">cRc Kosher</option>
                    </select>
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
                            required
                    ></textarea>
                </div>

                <div class="mb-3">
                    <label for="image_url" class="form-label">Image URL</label>
                    <input
                            type="url"
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