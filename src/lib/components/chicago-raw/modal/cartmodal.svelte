<script lang="ts">
    import { cart } from "$lib/stores/cart.ts";
    import CartCard from "$lib/components/chicago-raw/card/cartCard.svelte";
    import type { CartProduct } from "$lib/types.js";

    let { open = $bindable() } = $props();
    let cartLen = $state(0);
    let cartItems: CartProduct[] = $state([]);

    // Subscribe to the cart store
    const unsubscribe = cart.subscribe((currentCart) => {
        cartItems = currentCart; // Update the cartItems array with the current cart
        cartLen = currentCart.length; // Update the length reactively
    });

    function closeModal() {
        open = false;
    }

    // Unsubscribe when the component is destroyed
    import { onDestroy } from "svelte";
    onDestroy(() => {
        unsubscribe();
    });
</script>




<!-- Sliding Modal -->
<div
        class={`fixed inset-y-0 right-0 z-50 transition-transform transform bg-white shadow-lg w-[30%] ${
        open ? 'translate-x-0' : 'translate-x-full'
    }`}
>
    <button
            class="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            on:click={closeModal}
    >
        ✖️
    </button>
    <div class="p-4">
        <h2 class="text-xl font-semibold">Your Cart</h2>

        {#if cartLen > 0}
            <ul class="mt-4 space-y-2">
                {#each $cart as item (item.id)}
                    <CartCard
                        product={item.product}
                        quantity={item.quantity}
                    />
                {/each}
            </ul>
        {:else}
            <p class="mt-4 text-gray-500">No items available.</p>
        {/if}
    </div>
</div>