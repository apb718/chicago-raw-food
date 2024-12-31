
<script lang="ts">
    import Banner from "$lib/Banner/Banner.svelte";
    import {onMount} from "svelte";
    import {capitalizeWords} from "$lib/CapitalizeWords.js";
    import type {Product, CartProduct} from "$lib/types.js";
    import {DEHYDRATED_ID} from "$lib/products/productTypes.js";
    import ShopProduct from "$lib/shop/ShopProduct.svelte";


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
        <div class="col-xl-2"></div>
        <div class="col-xl-10">
            <div class="row">
                <div class="col-xl-9">
                    <div class="row">
                        {#each products as product}
                            {#if product.active}
                                <ShopProduct
                                    itemName = {capitalizeWords(product.product_name)}
                                    itemDescription = {product.description}
                                    itemPrice = {product.price}
                                    itemImgURL= {product.image_url}
                                    glutenFree = {true}
                                    vegan = {true}

                                />
                            {/if}
                        {/each}
                    </div>
                </div>
                <div class="col-xl-2">
                    <div class="card">

                        {#if cartProducts.length !== 0}
                            <h3>Cart</h3>
                            {console.log(`Cart Products: ${cartProducts}`)}
                            {#each cartProducts as cartProduct}
                                <p>Item: {cartProduct.product.product_name}</p>
                                <p>Quantity: {cartProduct.quantity}</p>
                            {/each}
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}