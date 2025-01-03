<script lang="ts">
  import IconMdiInstagram from "~icons/mdi/instagram.svelte";
  import IconMdiFacebook from "~icons/mdi/facebook.svelte";
  import IconMdiTwitter from "~icons/mdi/twitter.svelte";
</script>

<footer class="w-full bg-[lightgrey] text-white font-railway-thin text-base">
  <!-- Top Section (light grey) -->
  <div class="pt-5">
    <div class="max-w-7xl mx-auto px-5 grid gap-8 md:grid-cols-3">
      <!-- Column 1: Locations -->
      <div>
        <h5 class="font-bold text-black mb-2">OUR LOCATIONS</h5>
        <p class="text-black">
          <strong>51 W Huron St, Chicago, IL 60654</strong><br />
          Open Daily 8AM–8PM
        </p>
        <p class="mt-3 text-black">
          <strong>325 N Hoyne Suite 323, Chicago, IL 60612</strong><br />
          Commercial Kitchen Open Daily 6:30AM–1:30PM
        </p>
      </div>

      <!-- Column 2: Quick Links -->
      <div>
        <h5 class="font-bold text-black mb-2">QUICK LINKS</h5>
        <ul class="space-y-1">
          <li><a href="/" class="hover:underline text-black">Home</a></li>
          <li><a href="/menu" class="hover:underline text-black">Menu</a></li>
          <li><a href="/about" class="hover:underline text-black">About</a></li>
          <li><a href="/weekly-takeaway" class="hover:underline text-black">Weekly Takeaway</a></li>
          <li><a href="/menu-gallery" class="hover:underline text-black">Menu Gallery</a></li>
          <li><a href="/online-shop" class="hover:underline text-black">Online Shop</a></li>
          <li><a href="/contact" class="hover:underline text-black">Contact</a></li>
        </ul>
      </div>

      <!-- Column 3: Social Links -->
      <div class="text-center">
        <h5 class="font-bold text-black mb-3">FOLLOW US</h5>
        <!-- Instagram -->
        <a
          href="https://instagram.com"
          target="_blank"
          class="inline-block text-black mr-4 hover:text-neutral-700"
          aria-label="Instagram"
        >
          <IconMdiInstagram class="w-6 h-6 hover:text-raw-pink" />
        </a>
        <!-- Facebook -->
        <a
          href="https://facebook.com"
          target="_blank"
          class="inline-block text-black mr-4 hover:text-neutral-700"
          aria-label="Facebook"
        >
          <IconMdiFacebook class="w-6 h-6 hover:text-raw-pink" />
        </a>
        <!-- Twitter -->
        <a
          href="https://twitter.com"
          target="_blank"
          class="inline-block text-black hover:text-neutral-700"
          aria-label="Twitter"
        >
          <IconMdiTwitter class="w-6 h-6 hover:text-raw-pink" />
        </a>
      </div>
    </div>
  </div>
  
  <!-- Footer Bottom Row (dark grey) -->
  <div class="bg-[darkgrey] mt-4 py-3">
    <div class="max-w-7xl mx-auto px-5 text-center">
      <p class="mb-0 text-black">
        &copy; 2024 Chicago Raw Food All Rights Reserved.
      </p>
    </div>
  </div>
</footer>

<style>
  .font-railway-thin {
    font-family: railway-thin, serif;
  }
</style>
