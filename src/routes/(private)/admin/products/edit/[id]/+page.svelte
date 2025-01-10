<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import type { Product } from '../../../../../../types.js';

    let product: Product = {
        product_type_id: [],
        description: '',
    };

    let loading = true;
    let errorMessage = '';

    const productTypeOptions = [
        { id: 1, name: 'Minis' },
        { id: 2, name: 'Hot Beverage' },
        { id: 3, name: 'Juices' },
        { id: 4, name: 'Elixir' },
        { id: 5, name: 'Smoothie' },
        { id: 6, name: 'Bowl' },
        { id: 7, name: 'Entree' },
        { id: 8, name: 'Sandwich' },
        { id: 9, name: 'Salad' },
        { id: 10, name: 'Bread' },
        { id: 11, name: 'Spread' },
        { id: 12, name: 'Dessert' },
        { id: 13, name: 'Breakfast' },
        { id: 14, name: 'Dehydrated' },
        { id: 15, name: 'Dietary Restriction' },
        { id: 16, name: 'cRc Kosher' },
    ];

    onMount(async () => {
        const productId = $page.params.id;

        try {
            const response = await fetch(`/api/v1/products/${productId}`);
            if (response.ok) {
                const fetchedProduct = await response.json();

                product = {
                    product_id: fetchedProduct[0].product_id,
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

    async function updateProduct() {
        try {
            const productToSave = {
                ...product,
                product_type_id: product.product_type_id.map(Number),
            };

            const response = await fetch(`/api/v1/products/${product.product_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productToSave),
            });

            if (response.ok) {
                alert('Product updated successfully.');
                window.history.back();
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
        event.preventDefault();
        updateProduct();
    }
</script>

<div class="mx-auto max-w-4xl p-6 space-y-6">
    <h1 class="text-center text-2xl font-bold">Edit Product</h1>

    {#if loading}
        <div class="flex justify-center items-center">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    {:else if errorMessage}
        <div class="text-red-600 text-center">{errorMessage}</div>
    {:else}
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <div>
                <label for="product_name" class="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                    type="text"
                    id="product_name"
                    bind:value={product.product_name}
                    required
                    class="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700">Product Types</label>
                <div class="flex flex-wrap gap-3 mt-2">
                    {#each productTypeOptions as { id, name }}
                        <div class="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={"type_" + id}
                                value={id}
                                bind:group={product.product_type_id}
                                class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label for={"type_" + id} class="text-sm text-gray-700">{name}</label>
                        </div>
                    {/each}
                </div>
            </div>

            <div>
                <label for="price" class="block text-sm font-medium text-gray-700">Price ($)</label>
                <input
                    type="number"
                    id="price"
                    bind:value={product.price}
                    step="0.01"
                    required
                    class="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    id="description"
                    bind:value={product.description}
                    rows="3"
                    class="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></textarea>
            </div>

            <div>
                <label for="image_url" class="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                    type="text"
                    id="image_url"
                    bind:value={product.image_url}
                    class="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div class="flex items-center">
                <input
                    type="checkbox"
                    id="active"
                    bind:checked={product.active}
                    class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label for="active" class="ml-2 text-sm text-gray-700">Active</label>
            </div>

            <button
                type="submit"
                class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Save Changes
            </button>
        </form>
    {/if}
</div>
