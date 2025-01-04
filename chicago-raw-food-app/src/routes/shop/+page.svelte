<script lang="ts">
    import { DEFAULT_PRODUCT } from "$lib/DefaultProduct.ts";

    import { onMount } from "svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import ShopProduct from "$lib/shop/ShopProduct.svelte";
    import { capitalizeWords } from "$lib/CapitalizeWords.js";
    import type { Product, CartProduct } from "$lib/types.js";
    import { DEHYDRATED_ID } from "$lib/products/productTypes.js";

    let categoryId: number = DEHYDRATED_ID;

    let products: Product[] = $state<Product[]>([]);
    let cartProducts: CartProduct[] = $state<CartProduct[]>([]);
    let selectedProduct: Product | null = $state(null);
    let productQuantity: number = $state(1);
    let loading = $state(true);


    async function load() {
        const response = await fetch(`/api/v1/menu/${categoryId}`);
        const categoryProducts = await response.json();
        products = [...categoryProducts];
        loading = false;
    }

    function selectProduct(product: Product) {
        selectedProduct = product;
    }

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
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <button 
                                onclick={() => selectProduct(product ?? DEFAULT_PRODUCT)} 
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
                        <Dialog.Content class='p-0'>
                            <Dialog.Header>
                                <img 
                                    src={selectedProduct?.image_url} alt={selectedProduct?.product_name}
                                    class='m-0 p-0 '    
                                />
                                <Dialog.Title>{capitalizeWords(selectedProduct?.product_name ?? "")}</Dialog.Title>
                                <Dialog.Description>{selectedProduct?.description}</Dialog.Description>
                            </Dialog.Header>
                            
                            <div class="space-y-4 m-5">
                                <p class="font-bold text-lg">
                                    ${selectedProduct?.price}
                                </p>
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

                            <Dialog.Footer class=''>
                                <div class="grid grid-cols-6 items-center gap-2 w-full px-3">
                                    <!-- Increment Button -->
                                    <button class="col-span-1 text-center bg-gray-200 px-4 py-2 rounded">
                                        +
                                    </button>
                                
                                    <!-- Quantity Display -->
                                    <span class="col-span-4 text-center text-lg font-semibold">
                                        {productQuantity}
                                    </span>
                                
                                    <!-- Decrement Button -->
                                    <button class="col-span-1 text-center bg-gray-200 px-4 py-2 rounded">
                                        -
                                    </button>
                                </div>
                                
                                
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