<script lang="ts">
    import Banner from "$lib/components/chicago-raw/banner/Banner.svelte";
    import { onMount } from "svelte";
    import { capitalizeWords } from "$lib/CapitalizeWords.js";
    import type { Product, CartProduct } from "$lib/types.js";
    import { DEHYDRATED_ID } from "$lib/products/productTypes.js";
    import ShopProduct from "$lib/shop/ShopProduct.svelte";
    import {DEFAULT_PRODUCT} from "$lib/DefaultProduct.js";
    import {stopPropagation} from "svelte/legacy";

    let categoryId: number = DEHYDRATED_ID;

    let products: Product[] = $state<Product[]>([]);
    let cartProducts: CartProduct[] = $state<CartProduct[]>([]);

    let loading = $state(true);

    let productQuantity: number = $state(1);

    let selectedProduct: Product | null = $state<Product>(DEFAULT_PRODUCT); // Example product state
    let showModal = $state(false); // State to control modal visibility
    let modalElement: HTMLElement | undefined = $state(); // Reference to the modal DOM element
    let modalInstance: any = $state(); // Bootstrap modal instance

    function toggleModal(product: Product | null) {
        if (product) {
            selectedProduct = { ...product }; // Set the selected product
            productQuantity = 1;
            showModal = !!product; // Show or hide the modal
        } else {
            showModal = false;
        }

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
        on:click={() => toggleModal(null)}
>
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" on:click|stopPropagation>
            <div class="modal-header">
                <img
                        class="modal-img"
                        src={selectedProduct?.image_url}
                        alt={selectedProduct?.product_name}
                />
                <button
                        type="button"
                        class="close"
                        aria-label="Close"
                        on:click={() => toggleModal(null)}
                >
                    <span aria-hidden="false">&times;</span>
                </button>
            </div>

            <div class="modal-body">

                <!-- Image and Titles-->
                <div class="row">
                    <h3>{capitalizeWords(selectedProduct?.product_name ?? "")}</h3>
                    <h4>${selectedProduct?.price}</h4>
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
                    <p>{selectedProduct?.description}</p>
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
                <div class="footer-container text-white" on:click={() => {
                        cartProducts.push({
                            product: selectedProduct ?? DEFAULT_PRODUCT,
                            id: crypto.randomUUID(),
                            quantity: productQuantity,
                        });
                        toggleModal(null);
                    }

                }
                >
                    <!-- Add to Cart Button -->
                    <div class="add-to-cart">
                        <p>Add to Cart</p>
                    </div>

                    <!-- Spacer for Alignment -->
                    <div class="spacer"></div>

                    <!-- Price Details -->
                    <div class="price-details">
                        <p>${(productQuantity * (selectedProduct?.price ?? 0)).toFixed(2)}</p>
                        <p>${selectedProduct?.price} / item</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Products-->
{#if !loading && products.length > 0}
    <div class="row">
        <div class="col-xl-1"></div>
        <div class="col-xl-11">
            <div class="row">
                <div class="col-xl-9">
                    <div class="row">
                        {#each products as product}
                            {#if product.active}
                                <div
                                        class="col-xl-6 mb-3"
                                        on:click={() => toggleModal(product)}
                                >
                                    <ShopProduct
                                            itemName={capitalizeWords(product?.product_name)}
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
                <div class="col-xl-3 border-danger px-3 h-100">

                    {#if cartProducts.length > 0}
                        {#each cartProducts as cartProduct (cartProduct.id)}
                            <div class="row align-items-center mb-3">
                                <!-- Quantity -->
                                <div class="col-1 text-center">
                                    {cartProduct.quantity}
                                </div>

                                <!-- Product Name -->
                                <div class="col-7">
                                    <strong>{capitalizeWords(cartProduct.product.product_name ?? "")}</strong>
                                    <br />
                                </div>

                                <!-- Price -->
                                <div class="col-2 text-end">
                                    ${cartProduct.product.price}
                                </div>

                                <!-- Remove Link -->
                                <div class="col-2 text-end">
                                    <button
                                            class="text-primary"
                                            on:click={ () =>
                                            cartProducts = cartProducts.filter((item) => item.id !== cartProduct.id)
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                                <hr />
                            </div>

                        {/each}
                    {:else}
                        <div class="card text-center" style="width: 100%; padding: 0">
                            <div class="card-body">
                                <h5 class="card-title">Special title treatment</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>

                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}



<style>
    .modal {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }


    .modal-header {
        position: relative;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 0;
        margin: 0;
        overflow: hidden; /* Ensure child elements respect the rounding */
        transition: opacity 0.3s ease, transform 0.3s ease;
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
        border-radius: 5px;
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
        background-color: #e64398;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-top: none; /* Remove default border */
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .footer-container {

        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
    }

    .add-to-cart {
        font-size: 1rem;

        /*font-weight: bold;*/
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



