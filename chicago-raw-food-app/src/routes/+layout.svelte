
<script>
  import {browser} from '$app/environment'; // Detect if running in the browser
  import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
  import 'bootstrap-icons/font/bootstrap-icons.css';
  import Navbar from '$lib/Navbar.svelte';
  import Footer from '$lib/Footer.svelte';
  import('@fortawesome/fontawesome-free/css/all.css');
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';


  // Dynamically import Bootstrap JavaScript only in the browser
  if (browser) {
    // @ts-ignore
    import('bootstrap/dist/js/bootstrap.bundle.js');
    import('bootstrap/dist/css/bootstrap.min.css'); // Bootstrap CSS



  }

  // Speed Insights for Vercel
  injectSpeedInsights();
</script>





<div class="container-fluid">
  <div class='row'>
    <div class='col-md-1'></div>
    <div class='col-md-10'>
      <Navbar />
    </div>
    <div class='col-md-1'></div>
  </div>
</div>

<div class='container-fluid m-0 p-0 flex-column' style='min-height:80vh'>
  <slot />
</div>



<Footer />
