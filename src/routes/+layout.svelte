<script>
  import { browser } from '$app/environment'; // Detect if running in the browser

  import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
  import Navbar from '$lib/Navbar.svelte';
  import Footer from '$lib/Footer.svelte';

  // Dynamically import Bootstrap JavaScript only in the browser
  if (browser) {
    import('bootstrap/dist/js/bootstrap.bundle.js');
  }
</script>

<div class="container col-md-10">
  <Navbar />
  <slot />
  <Footer />
</div>