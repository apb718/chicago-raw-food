<script lang="ts">
    import { goto } from '$app/navigation';

    // Function to handle the back navigation
    function goBack() {
        if (window.history.length > 1) {
            window.history.back(); // Go to the previous page in history
        } else {
            goto('/admin'); // Fallback if there's no history
        }
    }
</script>

<div class="container mt-4">
    <!-- Back arrow button -->
    <button class="btn btn-outline-secondary" on:click={goBack}>
        ← Back
    </button>

    <!-- Rest of your content -->
    <h1 class="text-center my-4">Admin Dashboard</h1>
    <!-- Admin page content goes here -->
</div>
<div class='container-fluid m-0 p-0 flex-column' style='min-height:80vh'>
    <slot />
</div>

<style>
    .btn-outline-secondary {
        margin-bottom: 1rem;
    }
</style>