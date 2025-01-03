
<script>
  import {browser} from '$app/environment'; // Detect if running in the browser
  import Navbar from '$lib/Navbar.svelte';
  import Footer from '$lib/Footer.svelte';

  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import "../app.css";

  // Speed Insights for Vercel
  injectSpeedInsights();
</script>






<Navbar />

<slot />

<Footer />
