<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";

    let products = [];
    let loading = true;

    // Pagination
    let currentPage = 1;
    const itemsPerPage = 10;
    let totalPages = 0;

    // Filters
    let filterText = "";
    let filterType: string | null = null;
    let debouncedFilterText = "";

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

    let debounceTimer: NodeJS.Timeout;
    function debounceFilterTextUpdate() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            debouncedFilterText = filterText;
            currentPage = 1; // Reset pagination when filter changes
        }, 200);
    }

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

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        filterText = params.get('filterText') || "";
        debouncedFilterText = filterText;
        filterType = params.get('filterType');
        fetchProducts();
    });

    function getProductTypeDisplay(typeId: number): string {
        return `${typeId} - ${productTypeMapping[typeId] || 'Unknown'}`;
    }

    $: filteredProducts = products.filter(product => {
        const matchesText = product.product_name.toLowerCase().includes(debouncedFilterText.toLowerCase());
        const matchesType = filterType === null || String(product.product_type_id) === filterType;
        return matchesText && matchesType;
    });

    $: paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    $: totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
</script>

<div class="mx-auto max-w-7xl p-6 space-y-6">
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Manage Products</h1>
        <Button onclick={() => goto('/admin/products/add')} class="bg-blue-600 hover:bg-blue-700 text-white">
            Add New Product
        </Button>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-4">
        <Input
            type="text"
            placeholder="Search by product name..."
            bind:value={filterText}
            oninput={debounceFilterTextUpdate}
        />
        <select
            bind:value={filterType}
            class="border rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        >
            <option value={null}>All Types</option>
            {#each Object.entries(productTypeMapping) as [typeId, typeName]}
                <option value={typeId}>{typeName}</option>
            {/each}
        </select>
    </div>

    {#if loading}
        <div class="flex justify-center items-center">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    {:else if paginatedProducts.length > 0}
        <table class="table-auto w-full border-collapse border border-gray-300 text-left text-sm">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border border-gray-300 px-4 py-2">#</th>
                    <th class="border border-gray-300 px-4 py-2">Type</th>
                    <th class="border border-gray-300 px-4 py-2">Name</th>
                    <th class="border border-gray-300 px-4 py-2">Price</th>
                    <th class="border border-gray-300 px-4 py-2">Description</th>
                    <th class="border border-gray-300 px-4 py-2">Image</th>
                    <th class="border border-gray-300 px-4 py-2">Active</th>
                    <th class="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each paginatedProducts as product}
                    <tr>
                        <td class="border border-gray-300 px-4 py-2">{product.product_id}</td>
                        <td class="border border-gray-300 px-4 py-2">{getProductTypeDisplay(product.product_type_id)}</td>
                        <td class="border border-gray-300 px-4 py-2">{product.product_name}</td>
                        <td class="border border-gray-300 px-4 py-2">${parseFloat(product.price).toFixed(2)}</td>
                        <td class="border border-gray-300 px-4 py-2">{product.description}</td>
                        <td class="border border-gray-300 px-4 py-2">
                            {#if product.image_url}
                                <img src="{product.image_url}" alt="{product.product_name}" class="w-12 h-12 object-cover rounded" />
                            {:else}
                                <span class="text-gray-400">No Image</span>
                            {/if}
                        </td>
                        <td class="border border-gray-300 px-4 py-2">
                            {#if product.active}
                                <span class="text-green-600 font-bold">Active</span>
                            {:else}
                                <span class="text-gray-500">Inactive</span>
                            {/if}
                        </td>
                        <td class="border border-gray-300 px-4 py-2 space-x-2">
                            <Button onclick={() => goto(`/admin/products/edit/${product.product_id}`)} class="bg-yellow-500 hover:bg-yellow-600 text-white">
                                Edit
                            </Button>
                            <Button onclick={() => console.log('Remove product')} class="bg-red-500 hover:bg-red-600 text-white">
                                Remove
                            </Button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>

        <!-- Pagination -->
        <div class="flex justify-center items-center gap-4 mt-6">
            <Button
                onclick={() => (currentPage = Math.max(1, currentPage - 1))}
                class="px-4 py-2 bg-gray-300 hover:bg-gray-400"
                disabled={currentPage === 1}
            >
                Previous
            </Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button
                onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))}
                class="px-4 py-2 bg-gray-300 hover:bg-gray-400"
                disabled={currentPage === totalPages}
            >
                Next
            </Button>
        </div>
    {:else}
        <div class="text-center text-gray-600">
            No products match your search.
        </div>
    {/if}
</div>
