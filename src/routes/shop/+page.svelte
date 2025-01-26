<script lang="ts">
    import { DEFAULT_PRODUCT } from "$lib/DefaultProduct.ts";

    import { onMount } from "svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import ShopProduct from "$lib/shop/ShopProduct.svelte";
    import { capitalizeWords } from "$lib/util/text/CapitalizeWords.js";
    import type { Product, CartProduct } from "$lib/types.js";
    import { DEHYDRATED_ID } from "$lib/products/productTypes.js";
    import { removeItem, addItem } from "$lib/stores/cart.js";


    let categoryId: number = DEHYDRATED_ID;
    let products: Product[] = [];
    let selectedProduct: Product | null = null;
    let productQuantity: number = 1;
    let loading = true;
    let dialogOpen = false;

    // Load products from API
    async function load() {
        const response = await fetch(`/api/v1/menu/${categoryId}`);
        const categoryProducts = await response.json();
        products = [...categoryProducts];
        loading = false;
    }

    // Set selected product for dialog
    function selectProduct(product: Product) {
        selectedProduct = product;
    }

    // Fetch products on mount
    onMount(() => {
        load();
    });
</script>

<div class="p-6">
    <!-- Product List -->
    {#if !loading && products.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {#each products as product}
                {#if product.active}
                    <Dialog.Root bind:open={dialogOpen}>
                        <Dialog.Trigger>
                            <button
                                    on:click={() => selectProduct(product ?? DEFAULT_PRODUCT)}
                                    class="cursor-pointer bg-transparent border-none p-0"
                                    type="button"
                            >
                                <ShopProduct
                                        itemName={capitalizeWords(product?.product_name ?? "")}
                                        itemDescription={product.description}
                                        itemPrice={product.price}
                                        itemImgURL={product.image_url}
                                        glutenFree={true}
                                        vegan={true}
                                />
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Content class="p-0 max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                            <Dialog.Header>
                                <img
                                        src={selectedProduct?.image_url}
                                        alt={selectedProduct?.product_name}
                                        class="w-full h-48 object-cover"
                                />
                                <Dialog.Title class="m-5">{capitalizeWords(selectedProduct?.product_name ?? "")}</Dialog.Title>
                                <Dialog.Description class="m-5">{selectedProduct?.description}</Dialog.Description>
                            </Dialog.Header>

                            <div class="space-y-2 m-5">
                                <p class="font-bold text-lg">${selectedProduct?.price}</p>
                                <div class="flex gap-4">
                                <span class="inline-flex items-center gap-1 text-raw-green">
                                    <i class="fas fa-wheat-awn"></i>
                                    <span class="text-sm">Gluten-Free</span>
                                </span>
                                    <span class="inline-flex items-center gap-1 text-raw-green">
                                    <i class="fas fa-leaf"></i>
                                    <span class="text-sm">Vegan</span>
                                </span>
                                </div>
                            </div>
                            <hr />

                            <Dialog.Footer class="block px-5 pb-5">
                                <div class="grid grid-cols-6 items-center gap-2 w-full-md mx-auto p-3 rounded">
                                    <!-- Decrement Quantity -->
                                    <button
                                            on:click={() => productQuantity = Math.max(productQuantity - 1, 1)}
                                            class="col-span-1 text-center bg-gray-200 px-4 py-2 rounded">
                                        <b>-</b>
                                    </button>

                                    <!-- Quantity Input -->
                                    <input
                                            type="number"
                                            min="1"
                                            bind:value={productQuantity}
                                            class="col-span-4 text-center text-lg font-semibold border-gray-200 border-2 rounded px-4 py-2"
                                    />

                                    <!-- Increment Quantity -->
                                    <button
                                            on:click={() => productQuantity++}
                                            class="col-span-1 text-center bg-gray-200 px-4 py-2 rounded">
                                        <b>+</b>
                                    </button>
                                </div>

                                <!-- Add to Cart Button -->
                                <button
                                        class="w-full bg-raw-pink text-white px-6 py-4 rounded-lg shadow-md max-w-md mx-auto flex items-center justify-between mt-4 appearance-none border-none"
                                        on:click={() => {
                                    addItem(selectedProduct, productQuantity);
                                    dialogOpen = false; // Close dialog after adding
                                }}
                                >
                                    <p class="font-semibold text-lg self-center">Add to Cart</p>

                                    <div class="flex flex-col justify-between text-right">
                                        <p class="font-bold text-lg">${selectedProduct?.price * productQuantity}</p>
                                        <p class="text-sm">${selectedProduct?.price} / item</p>
                                    </div>
                                </button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Root>
                {/if}
            {/each}
        </div>
    {:else}
        <div class="text-center">
            <p class="text-gray-500">Loading products...</p>
        </div>
    {/if}
</div>
