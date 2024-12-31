<script lang="ts">
    export let itemName: string = "";
    export let itemType: string = ""; // extra descriptor
    export let itemDescription: string = "";
    export let itemImgURL: string = "";
    export let itemPrice: number | null = null;
    export let glutenFree: boolean = false;
    export let vegan: boolean = false;
</script>

<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>

<div class="menu-item-card col-xl-5  m-3">
    <div class="row menu-item-content">
        <!-- Main Item Section -->
        <div class="menu-item-info col-xl-10 m-3">
            <h3 class="item-name">{itemName}</h3>
            <h4 class="item-type">{itemType}</h4>
            <p class="item-description">{itemDescription}</p>
            {#if itemPrice}
                <p class="item-price">${itemPrice}</p>
            {/if}
            <div class="item-tags">
                {#if glutenFree}
                    <i class="fas fa-wheat-awn text-green" aria-label="Gluten-Free"></i>
                {/if}
                {#if vegan}
                    <i class="fas fa-leaf text-green" aria-label="Vegan"></i>
                {/if}
            </div>
        </div>
        <!-- Item Image -->
        <div class="menu-item-image-container col-xl-2">
            <img src="{itemImgURL}" alt="{itemName}">
        </div>
    </div>
</div>

<style>
    .menu-item-card {
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .menu-item-content {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .menu-item-info {
        flex: 3;
        padding-right: 16px;
    }

    .menu-item-image-container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end; /* Aligns image to the right edge */
    }

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-top-right-radius: 8px; /* Round the top-right corner */
        border-bottom-right-radius: 8px; /* Round the bottom-right corner */
        border-top-left-radius: 0; /* Keep the top-left corner straight */
        border-bottom-left-radius: 0; /* Keep the bottom-left corner straight */
        transform: translate(36px)
    }

    .item-name {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0;
    }

    .item-type {
        font-size: 1rem;
        color: #888;
        margin: 4px 0;
    }

    .item-description {
        font-size: 0.9rem;
        color: #555;
        margin-bottom: 8px;
    }

    .item-price {
        font-size: 1rem;
        font-weight: bold;
        color: #333;
    }

    .item-tags i {
        font-size: 0.9rem;
        margin-right: 8px;
        color: green; /* Customize icon color */
    }
</style>
