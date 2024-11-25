<script>
  import { browser } from '$app/environment'; // Detect if running in the browser

  import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
  import 'bootstrap-icons/font/bootstrap-icons.css'
  import Navbar from '$lib/Navbar.svelte';
  import Footer from '$lib/Footer.svelte';

  // Dynamically import Bootstrap JavaScript only in the browser
  if (browser) {
    import('bootstrap/dist/js/bootstrap.bundle.js');
  }
</script>

<div class="container">
  <div class='col-md-10'>
    <Navbar />
  </div>
  <slot />

  <!-- ADD HEIGHT TO PAGE -->
  <div style='height: 75vh;'></div>
</div>
<Footer />
