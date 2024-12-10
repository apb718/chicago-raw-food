<script lang="ts">
    let product_type_id: string = '';
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
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_type_id,
                    product_name,
                    price,
                    description,
                    image_url,
                    active
                }),
            });

            if (response.ok) {
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
        product_type_id = '';
        product_name = '';
        price = null;
        description = '';
        image_url = '';
        active = true;
    }
</script>

<div class="container mt-5">
    <h1 class="text-center mb-4">Add New Product</h1>
    <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-3">
            <label for="product_type_id" class="form-label">Product Type</label>
            <select id="product_type_id" class="form-select" bind:value={product_type_id} required>
                <option value="" disabled selected>Select Product Type</option>
                {#each productTypes as type}
                    <option value={type.id}>{type.name}</option>
                {/each}
            </select>
        </div>

        <div class="mb-3">
            <label for="product_name" class="form-label">Product Name</label>
            <input type="text" id="product_name" class="form-control" bind:value={product_name} required />
        </div>

        <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" id="price" class="form-control" bind:value={price} step="0.01" required />
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea id="description" class="form-control" bind:value={description} rows="4"></textarea>
        </div>

        <div class="mb-3">
            <label for="image_url" class="form-label">Image URL</label>
            <input type="text" id="image_url" class="form-control" bind:value={image_url} />
        </div>

        <div class="mb-3 form-check">
            <input type="checkbox" id="active" class="form-check-input" bind:checked={active} />
            <label for="active" class="form-check-label">Active</label>
        </div>

        <button type="submit" class="btn btn-primary w-100">Add Product</button>
    </form>
</div>

<style>
    .container {
        max-width: 600px;
    }
</style>