
<script lang="ts">
    import Banner from "$lib/Banner/Banner.svelte";
    import {onMount} from "svelte";
    import {capitalizeWords} from "$lib/CapitalizeWords.js";
    import type {Product, CartProduct} from "$lib/types.js";
    import {DEHYDRATED_ID} from "$lib/products/productTypes.js";


    let categoryId: number = DEHYDRATED_ID;

    let products: Product[] = $state<Product[]>();
    let cartProducts: CartProduct[] = $state<CartProduct[]>([]);

    let loading = $state(true);


    async function load() {

        const apiUrl = "/api/v1/menu/";
        const response = await fetch(`${apiUrl}${categoryId}`);
        const categoryProducts = await response.json();

        products = [...categoryProducts];
        loading = false
    }

    onMount(() => {
        load();
    });



</script>

<head>
    <title>Retail</title>
</head>

<Banner
        imageUrl="/images/shop/Shop-Banner.jpg"
        text="Shop"
/>

{#if !loading && products.length > 0}
<div class="row">
    <div class="col-xl-3"></div>
    <div class="col-xl-6">
        <div class="row">

                {#each products as product}
                    {#if product.active}
                        <div class="col-lg-4 mb-4">
                            <div class="card h-100">
                                <!--{console.log(product)}-->
                                <img
                                        src="{product.image_url}"
                                        class="card-img-top"
                                        alt={capitalizeWords(product.product_name)}
                                />
                                <div class="card-body">
                                    <h5 class="card-title">{capitalizeWords(product.product_name)}</h5>
                                    <p class="card-text">{product.description}</p>
                                    <p class="card-text"><strong>${product.price}</strong></p>
                                    <button
                                            class="rounded hover:blue"
                                            onclick={() => {
                                                console.log(`cart: ${JSON.stringify(cartProducts)}`);
                                                return cartProducts.push({
                                                    id: crypto.randomUUID(),
                                                    quantity: 1,
                                                    product: product
                                                });

                                            }}
                                    >
                                        Button
                                    </button>
                                </div>
                            </div>
                        </div>                {/if}


                {/each}

            </div>
        </div>
    </div>
{/if}