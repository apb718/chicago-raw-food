<script lang="ts">
    import Banner from "$lib/Banner/Banner.svelte";
    import { onMount } from "svelte";
    import { capitalizeWords } from "$lib/CapitalizeWords.js";
    import type { Product, CartProduct } from "$lib/types.js";
    import { DEHYDRATED_ID } from "$lib/products/productTypes.js";
    import ShopProduct from "$lib/shop/ShopProduct.svelte";
    import {DEFAULT_PRODUCT} from "$lib/DefaultProduct.js";

    let categoryId: number = DEHYDRATED_ID;

    let products: Product[] = [];
    let cartProducts: CartProduct[] = [];

    let loading = true;

    let productQuantity: number = 1;

    let selectedProduct: Product = DEFAULT_PRODUCT; // Example product state
    let showModal = false; // State to control modal visibility
    let modalElement: HTMLElement; // Reference to the modal DOM element
    let modalInstance: any; // Bootstrap modal instance

    async function toggleModal(product: Product) {
        selectedProduct = product; // Set the selected product
        showModal = !!product; // Show or hide the modal

        if (modalInstance) {
            showModal ? modalInstance.show() : modalInstance.hide();
        }
    }

    async function decrement() {
        productQuantity = Math.max(1, productQuantity - 1);
    }

    async function increment() {
        productQuantity = Math.max(1, productQuantity + 1);
    }

    async function load() {
        const apiUrl = "/api/v1/menu/";
        const response = await fetch(`${apiUrl}${categoryId}`);
        const categoryProducts = await response.json();

        products = [...categoryProducts];
        loading = false;
    }

    onMount(async () => {
        load();

        // Initialize the Bootstrap modal instance on mount
        if (typeof window !== "undefined") {
            const { Modal } = await import("bootstrap");
            modalInstance = new Modal(modalElement, { backdrop: "static", keyboard: true });
        }
    });
    let glutenFree = true;
    let vegan = true;
</script>

<Banner imageUrl="/images/shop/Shop-Banner.jpg" text="Shop" />

<!-- Bootstrap Modal -->
<div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        bind:this={modalElement}
>
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <img class="modal-img" src="{selectedProduct.image_url}" alt="{selectedProduct.product_name}" />
                <button
                        type="button"
                        class="close"
                        aria-label="Close"
                        on:click={() => toggleModal(null)}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">

                <!-- Image and Titles-->
                <div class="row">
                    <h3>{capitalizeWords(selectedProduct.product_name)}</h3>
                    <h4>${selectedProduct.price}</h4>
                    <div class="item-tags-container">
                        {#if glutenFree}
                            <div class="item-tag">
                                <i class="fas fa-wheat-awn text-green" aria-label="Gluten-Free"></i>
                                <p>Gluten Free</p>
                            </div>
                        {/if}
                        {#if vegan}
                            <div class="item-tag">
                                <i class="fas fa-leaf text-green" aria-label="Vegan"></i>
                                <p>Vegan</p>
                            </div>
                        {/if}
                    </div>
                </div>

                <hr />

                <div class="row">
                    <p>{selectedProduct.description}</p>
                </div>
                <div class="row">
                    <h4>Select Quantity:</h4>
                    <div class="quantity-container">
                        <!-- Decrease Button -->
                        <button
                                class="quantity-btn"
                                on:click={decrement}
                                aria-label="Decrease quantity"
                        >
                            -
                        </button>

                        <!-- Quantity Display -->
                        <div class="quantity-display">
                            <span>{productQuantity}</span>
                        </div>

                        <!-- Increase Button -->
                        <button
                                class="quantity-btn"
                                on:click={increment}
                                aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>

                    <br/>
                </div>


            </div>
            <div class="modal-footer">
                <div class="footer-container">
                    <!-- Add to Cart Button -->
                    <div class="add-to-cart">
                        <p>Add to Cart</p>
                    </div>

                    <!-- Spacer for Alignment -->
                    <div class="spacer"></div>

                    <!-- Price Details -->
                    <div class="price-details">
                        <p>${(productQuantity * selectedProduct.price).toFixed(2)}</p>
                        <p>${selectedProduct.price.toFixed(2)} / person</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{#if !loading && products.length > 0}
    <div class="row">
        <div class="col-xl-2"></div>
        <div class="col-xl-10">
            <div class="row">
                <div class="col-xl-9">
                    <div class="row">
                        {#each products as product}
                            {#if product.active}
                                <div
                                        class="3 mb-3"
                                        on:click={() => toggleModal(product)}
                                >
                                    <ShopProduct
                                            itemName={capitalizeWords(product.product_name)}
                                            itemDescription={product.description}
                                            itemPrice={product.price}
                                            itemImgURL={product.image_url}
                                            glutenFree={true}
                                            vegan={true}
                                    />
                                </div>
                            {/if}
                        {/each}
                    </div>
                </div>
                <div class="col-xl-2">
                    <div class="card">
                        {#if cartProducts.length !== 0}
                            <h3>Cart</h3>
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

<style>
    .modal-header {
        position: relative;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 0;
        margin: 0;
        overflow: hidden; /* Ensure child elements respect the rounding */
    }

    .modal-content {
        border-radius: 5px; /* Ensure the entire modal has rounded corners */
        overflow: hidden; /* Prevent content overflow */
    }

    .modal-img {
        width: 100%;
        height: auto;
        display: block;
    }

    .modal-content {
        width: 80vw;
    }

    .item-tags-container {
        display: flex; /* Align items in a row */
        gap: 1rem; /* Space between elements */
        align-items: center; /* Vertically center icons and text */
    }

    .item-tag {
        display: flex; /* Align icon and text in a row */
        align-items: center; /* Vertically center icon and text */
        gap: 0.5rem; /* Space between icon and text */
    }

    .item-tag i {
        font-size: 1.2rem; /* Adjust icon size */
    }

    .item-tag p {
        margin: 0; /* Remove default paragraph margin */
        font-size: 1rem; /* Adjust text size */
    }

    .quantity-container {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .quantity-btn {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ccc;
        background-color: #f9f9f9;
        font-size: 1.5rem;
        font-weight: bold;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
    }

    .quantity-btn:hover {
        background-color: #e6e6e6;
    }

    .quantity-display {
        display: flex;
        align-items: center;
        font-size: 1rem;
        font-weight: normal;
        padding: 0 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        min-width: 100px;
        width: 80%;
        height: 100%;
        justify-content: center;
        background-color: #fff;
    }

    .modal-footer {

        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-top: none; /* Remove default border */
    }

    .footer-container {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
    }

    .add-to-cart {
        font-size: 1rem;
        font-weight: bold;
    }

    .spacer {
        flex-grow: 1; /* Push items apart */
    }

    .price-details {
        text-align: right;
    }

    .price-details p {
        margin: 0;
        font-size: 0.9rem;
    }

</style>



