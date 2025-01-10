<script>
    import { createEventDispatcher } from "svelte";
    export let isOpen = false;
    export let title = "";
    export let content = "";

    const dispatch = createEventDispatcher();

    function close() {
        dispatch("close");
    }
</script>

<div
    class="fixed inset-0 z-50 flex items-center justify-center"
    class:hidden={!isOpen}
    aria-hidden={!isOpen}
>
    <div class="fixed inset-0 bg-black/50" on:click={close}></div>
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg z-50">
        <!-- Modal Header -->
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold">{title}</h2>
            <button class="text-gray-500 hover:text-gray-700" on:click={close}>
                ✕
            </button>
        </div>

        <!-- Modal Content -->
        <div class="mb-4">
            {#if content}
                <p>{content}</p>
            {/if}
            <slot></slot>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end space-x-2">
            <button
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                on:click={close}
            >
                Cancel
            </button>
            <button
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                on:click={close}
            >
                Confirm
            </button>
        </div>
    </div>
</div>

<style>
    .hidden {
        display: none;
    }
</style>
