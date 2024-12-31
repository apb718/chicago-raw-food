<script lang="ts">
    import { onMount } from "svelte";
    import type {Product} from "$lib/types.js";

    export let showModal = false;
    export let title = "Modal Title";
    export let onClose: () => void = () => {};
    export let product: Product;
    let modalElement: HTMLElement;
    let modalInstance: any;

    onMount(async () => {
        if (typeof window !== "undefined") {
            const { Modal } = await import("bootstrap");
            modalInstance = new Modal(modalElement, { backdrop: "static", keyboard: true });
        }
    });

    $: if (modalInstance) {
        if (showModal) {
            modalInstance.show();
        } else {
            modalInstance.hide();
        }
    }

    function closeModal() {
        onClose();
        showModal = false;
    }
</script>

<div
        class="modal fade"
        tabindex="-1"
        aria-hidden="true"
        bind:this={modalElement}
>
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <slot name="header"></slot>
            </div>


            <div class="modal-body">
                <slot name="body">Default modal content</slot>
            </div>


            <div class="modal-footer">
                <slot name="footer">
                    <button type="button" class="btn btn-secondary" onclick={closeModal}>
                        Close
                    </button>
                </slot>
            </div>
        </div>
    </div>
</div>
