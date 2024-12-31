<script lang="ts">
    import Banner from "$lib/Banner/Banner.svelte";
    import { onMount } from "svelte";
    import { capitalizeWords } from "$lib/CapitalizeWords.js";
    import type { Product, CartProduct } from "$lib/types.js";
    import { DEHYDRATED_ID } from "$lib/products/productTypes.js";
    import ShopProduct from "$lib/shop/ShopProduct.svelte";

    let categoryId: number = DEHYDRATED_ID;

    let products: Product[] = [];
    let cartProducts: CartProduct[] = [];

    let loading = true;

    let selectedProduct: string | null = "Demo Product"; // Example product state
    let showModal = false; // State to control modal visibility
    let modalElement: HTMLElement; // Reference to the modal DOM element
    let modalInstance: any; // Bootstrap modal instance

    async function toggleModal(product: string | null = null) {
        selectedProduct = product; // Set the selected product
        showModal = !!product; // Show or hide the modal

        if (modalInstance) {
            showModal ? modalInstance.show() : modalInstance.hide();
        }
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
</script>

<Banner imageUrl="/images/shop/Shop-Banner.jpg" text="Shop" />

<!-- Button to Trigger Modal -->
<button class="btn btn-primary" onclick={() => toggleModal("Demo Product")}>
    Launch demo modal
</button>

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
                <h5 class="modal-title" id="exampleModalLongTitle">{selectedProduct}</h5>
                <button
                        type="button"
                        class="close"
                        aria-label="Close"
                        onclick={() => toggleModal(null)}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                This is the modal content for {selectedProduct}.
            </div>
            <div class="modal-footer">
                <button
                        type="button"
                        class="btn btn-secondary"
                        onclick={() => toggleModal(null)}
                >
                    Close
                </button>
                <button type="button" class="btn btn-primary">Save changes</button>
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
                                        class="col-md-4 mb-3"
                                        onclick={() => toggleModal(capitalizeWords(product.product_name))}
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
