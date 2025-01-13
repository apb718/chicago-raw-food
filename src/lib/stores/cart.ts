import { writable } from 'svelte/store';
import type { Product, CartProduct } from '$lib/types.js';

// Create the writable store for the cart
export const cart = writable<CartProduct[]>([]);

// Function to add an item to the cart
export const addItem = (item: Product, quantity: number) => {
    cart.update((currentCart) => [
        ...currentCart,
        {
            product: item,
            quantity: quantity,
            id: crypto.randomUUID(), // Generates a unique ID
        },
    ]);
};

// Function to remove an item from the cart
export const removeItem = (itemId: string) => {
    cart.update((currentCart) =>
        currentCart.filter((item) => item.id !== itemId)
    );
};

