<script lang="ts">
    let product_type_ids: string[] = [];
    let product_name: string = '';
    let price: number | null = null;
    let description: string = '';
    let image_url: string = '';
    let active: boolean = true;

    const productTypes = [
        { id: '1', name: 'Minis' },
        { id: '2', name: 'Hot Beverage' },
        { id: '3', name: 'Juices' },
        { id: '4', name: 'Elixer' },
        { id: '5', name: 'Smoothie' },
        { id: '6', name: 'Bowl' },
        { id: '7', name: 'Entree' },
        { id: '8', name: 'Sandwich' },
        { id: '9', name: 'Salad' },
        { id: '10', name: 'Bread' },
        { id: '11', name: 'Spread' },
        { id: '12', name: 'Dessert' },
        { id: '13', name: 'Breakfast' },
        { id: '14', name: 'Dehydrated' },
        { id: '15', name: 'Dietary Restriction' },
        { id: '16', name: 'cRc Kosher' }
    ];

    async function handleSubmit(event: Event) {
        event.preventDefault();

        try {
            const response = await fetch('/api/v1/products/add', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_type_ids,
                    product_name,
                    price,
                    description,
                    image_url,
                    active,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Product added successfully!');
                resetForm();
            } else {
                const error = await response.json();
                alert(`Error: ${error.message || 'Failed to add product'}`);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            alert('Unexpected error occurred.');
        }
    }

    function resetForm() {
        product_type_ids = [];
        product_name = '';
        price = null;
        description = '';
        image_url = '';
        active = true;
    }
</script>

<div class="mx-auto max-w-3xl p-6 space-y-6">
    <h1 class="text-center text-2xl font-bold mb-6">Add New Product</h1>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <!-- Product Types -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Product Types</label>
            <div class="flex flex-wrap gap-3">
                {#each productTypes as { id, name }}
                    <div class="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id={"product_type_" + id}
                            value={id}
                            bind:group={product_type_ids}
                            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label for={"product_type_" + id} class="text-sm text-gray-700">{name}</label>
                    </div>
                {/each}
            </div>
        </div>

        <div>
            <label for="product_name" class="block text-sm font-medium text-gray-700">Product Name</label>
            <input
                type="text"
                id="product_name"
                bind:value={product_name}
                required
                class="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
        </div>
        
        <div>
            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
            <input
                type="number"
                id="price"
                bind:value={price}
                step="0.01"
                required
                class="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
        </div>
        
        <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
                id="description"
                bind:value={description}
                rows="4"
                class="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            ></textarea>
        </div>
        
        <div>
            <label for="image_url" class="block text-sm font-medium text-gray-700">Image URL</label>
            <input
                type="text"
                id="image_url"
                bind:value={image_url}
                class="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
        </div>

        <!-- Active -->
        <div class="flex items-center">
            <input
                type="checkbox"
                id="active"
                bind:checked={active}
                class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label for="active" class="ml-2 text-sm text-gray-700">Active</label>
        </div>

        <!-- Submit Button -->
        <div>
            <button
                type="submit"
                class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Add Product
            </button>
        </div>
    </form>
</div>
