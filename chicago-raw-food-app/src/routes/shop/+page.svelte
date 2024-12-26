
<script lang="ts">
    import Banner from "$lib/Banner/Banner.svelte";
    import {onMount} from "svelte";
    import {capitalizeWords} from "$lib/CapitalizeWords.js";
    // import {slide} from "svelte/transition"
    // import {capitalizeWords} from "$lib/CapitalizeWords.js";
    // import {removeTrailingZeroes} from "$lib/removeTrailingZeroes.js";


    const DEHYDRATED_ID = [14];

    let categoryIds: number[] = DEHYDRATED_ID;
    let products: Product[] = [];
    let displayedTypes: Set<string> = new Set();
    let allTypes: Set<string> = new Set();
    let isLoaded = false;

    async function load() {
        const apiUrl = "/api/v1/menu/";
        for (const categoryId of categoryIds) {
        const response = await fetch(`${apiUrl}${categoryId}`);
        const categoryProducts = await response.json();
        console.log(categoryProducts);
        products = [...products, ...categoryProducts];
        allTypes.add(categoryProducts[0].type_description)

    }
        // console.log(`fx ${allTypes.size}`);
        isLoaded = true;
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


<div class="row">
    <div class="col-xl-3"></div>
    <div class="col-xl-6">
        <div class="row">
            {#each products as product}
                {#if product.active}
                    <div class="col-lg-4 col-md-6 mb-4">
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
                            </div>
                        </div>
                    </div>                {/if}


            {/each}
        </div>
    </div>
</div>