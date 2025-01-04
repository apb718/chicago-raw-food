<script lang="ts">
    export let itemName: string = "";
    export let itemType: string = "";
    export let itemDescription: string = "";
    export let itemImgURL: string = "";
    export let itemPrice: number | null = null;
    export let glutenFree: boolean = false;
    export let vegan: boolean = false;
</script>

<div class="p-4 border rounded-lg shadow-lg flex">
    <!-- Image Section -->
    <div class="flex-shrink-0">
        <img src={itemImgURL} alt={itemName} class="h-24 w-24 object-cover rounded-lg" />
    </div>

    <!-- Info Section -->
    <div class="ml-4 flex-grow">
        <h3 class="text-lg font-semibold">{itemName}</h3>
        <h4 class="text-sm text-gray-500">{itemType}</h4>
        <p class="text-sm text-gray-700 line-clamp-3">{itemDescription}</p>
        {#if itemPrice}
            <p class="mt-2 text-lg font-bold text-gray-900">${itemPrice}</p>
        {/if}
        <div class="mt-2 flex items-center gap-2">
            {#if glutenFree}
                <span class="inline-flex items-center gap-1 text-green-600">
                    <i class="fas fa-wheat-awn"></i>
                    <span class="text-xs">Gluten-Free</span>
                </span>
            {/if}
            {#if vegan}
                <span class="inline-flex items-center gap-1 text-green-600">
                    <i class="fas fa-leaf"></i>
                    <span class="text-xs">Vegan</span>
                </span>
            {/if}
        </div>
    </div>
</div>
