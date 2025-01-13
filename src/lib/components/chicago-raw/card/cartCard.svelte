<script lang="ts">
    import {DEFAULT_PRODUCT} from "$lib/DefaultProduct.js";
    import type {Product} from "$lib/types.js";

    let {product, quantity } = $props();

</script>

<div class="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm">
    <!-- Image -->
    <img
            src={product?.image_url ?? DEFAULT_PRODUCT.image_url}
            alt="Roasted Sweet Potatoes"
            class="w-16 h-16 rounded-md object-cover"
    />

    <!-- Product Details -->
    <div class="flex flex-1 flex-col gap-1">
        <h3 class="text-lg font-semibold text-gray-800">
            Roasted Sweet Potatoes + Green Goddess Ranch
        </h3>
        <p class="text-sm text-gray-500">$4.15</p>
    </div>

    <!-- Quantity Controls -->
    <div class="flex items-center gap-2">
        <!-- Decrement Button -->
        <button
                class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm"
                on:click={() => quantity = Math.max(1, quantity-1)}
        >
            <span class="text-lg font-semibold">−</span>
        </button>

        <!-- Quantity Display -->
        <span class="text-lg font-semibold text-gray-800">1</span>

        <!-- Increment Button -->
        <button
                class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm"
                on:click={() => quantity = Math.max(1, quantity+1)}
        >
            <span class="text-lg font-semibold">+</span>
        </button>
    </div>
</div>
