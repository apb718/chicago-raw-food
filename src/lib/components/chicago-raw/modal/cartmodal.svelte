<script>
    let { open = $bindable() } = $props();

    function closeModal() {
        open = false;
    }
</script>


<!-- Sliding Modal -->
<div
        class={`fixed inset-y-0 right-0 z-50 transition-transform transform bg-white shadow-lg w-[20%] ${
        open ? 'translate-x-0' : 'translate-x-full'
    }`}
>
    <button
            class="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            on:click={closeModal}
    >
        ✖️
    </button>
    <div class="p-4">
        <h2 class="text-xl font-semibold">Your Cart</h2>
        <!-- Add your cart items here -->
    </div>
</div>