
<script>
  import {browser} from '$app/environment'; // Detect if running in the browser
  import Navbar from '$lib/components/chicago-raw/navbar/navbar.svelte';
  import Footer from '$lib/components/chicago-raw/footer/footer.svelte';

  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import "../app.css";

  // Speed Insights for Vercel
  injectSpeedInsights();
</script>






<Navbar />

<div class="min-h-screen flex flex-col">
  <!-- Main Content Area -->
  <main class="flex-grow">
    <!-- Your page content goes here -->
    <div class="content">
      <!-- Example content for testing -->
      <slot />
    </div>
  </main>
</div>


<Footer />
