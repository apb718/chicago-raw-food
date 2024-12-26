<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    let products = [];
    let loading = true;

    // Filters
    let filterText = "";
    let filterType: string | null = null; // Use string to directly match query parameter types

    const productTypeMapping: Record<number, string> = {
        1: "Minis",
        2: "Hot Beverage",
        3: "Juices",
        4: "Elixir",
        5: "Smoothie",
        6: "Bowl",
        7: "Entree",
        8: "Sandwich",
        9: "Salad",
        10: "Bread",
        11: "Spread",
        12: "Dessert",
        13: "Breakfast",
        14: "Dehydrated",
        15: "Dietary Restriction",
        16: "cRc Kosher"
    };

    // Fetch products
    async function fetchProducts() {
        try {
            const response = await fetch('/api/v1/products');
            if (response.ok) {
                products = await response.json();
            } else {
                alert('Error fetching products.');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        } finally {
            loading = false;
        }
    }

    // Update filters from query parameters on page load
    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        filterText = params.get('filterText') || "";
        filterType = params.get('filterType');
        fetchProducts();
    });

    // Synchronize filters with URL
    $: {
        const params = new URLSearchParams();
        if (filterText) params.set('filterText', filterText);
        if (filterType) params.set('filterType', filterType);
        goto(`?${params.toString()}`, { replaceState: true });
    }

    function getProductTypeDisplay(typeId: number): string {
        return `${typeId} - ${productTypeMapping[typeId] || 'Unknown'}`;
    }

    // Derived filtered products list
    $: filteredProducts = products.filter(product => {
        const matchesText = product.product_name.toLowerCase().includes(filterText.toLowerCase());
        const matchesType = filterType === null || String(product.product_type_id) === filterType;
        return matchesText && matchesType;
    });
</script>

<div class="container mt-5">
    <h1 class="text-center mb-4">Manage Products</h1>
    <div class="d-flex justify-content-between mb-3">
        <h2>Products</h2>
        <button class="btn btn-primary" on:click={() => goto('/admin/products/add')}>Add New Product</button>
    </div>

    <!-- Filters -->
    <div class="row mb-3">
        <div class="col-md-6">
            <input
                    type="text"
                    class="form-control"
                    placeholder="Search by product name..."
                    bind:value={filterText}
            />
        </div>
        <div class="col-md-6">
            <select class="form-select" bind:value={filterType}>
                <option value={null}>All Types</option>
                {#each Object.entries(productTypeMapping) as [typeId, typeName]}
                    <option value={typeId}>{typeName}</option>
                {/each}
            </select>
        </div>
    </div>

    {#if loading}
        <div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    {:else}
        {#if filteredProducts.length > 0}
            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Active</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {#each filteredProducts as product}
                    <tr>
                        <td>{product.product_id}</td>
                        <td>{getProductTypeDisplay(product.product_type_id)}</td>
                        <td>{product.product_name}</td>
                        <td>${parseFloat(product.price).toFixed(2)}</td>
                        <td>{product.description}</td>
                        <td>
                            {#if product.image_url}
                                <img src="{product.image_url}" alt="{product.product_name}" class="img-thumbnail" style="width: 50px; height: 50px;" />
                            {:else}
                                <span class="text-muted">No Image</span>
                            {/if}
                        </td>
                        <td>
                            {#if product.active}
                                <span class="badge bg-success">Active</span>
                            {:else}
                                <span class="badge bg-secondary">Inactive</span>
                            {/if}
                        </td>
                        <td>
                            <button class="btn btn-warning btn-sm me-2" on:click={() => goto(`/admin/products/edit/${product.product_id}`)}>Edit</button>
                            <button class="btn btn-danger btn-sm" on:click={() => console.log('Remove product')}>Remove</button>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        {:else}
            <div class="alert alert-info text-center">
                No products match your search.
            </div>
        {/if}
    {/if}
</div>

<style>
    .container {
        max-width: 1200px;
    }
    table img {
        border-radius: 5px;
        object-fit: cover;
    }
</style>
