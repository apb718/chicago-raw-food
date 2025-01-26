<script lang="ts">
  import { browser } from '$app/environment';
  import IconMdiAccount from "~icons/mdi/account.svelte";
  import IconCart from "~icons/mdi/cart.svelte";
  import CartModal from "$lib/components/chicago-raw/modal/cartmodal.svelte";



  let isNavOpen = false;       // Controls mobile nav toggle
  let isDropdownOpen = false;  // Controls "menu" dropdown

  let cartOpen = $state(false); // Controls cart modal visibility

  function toggleNav() {
    isNavOpen = !isNavOpen;
  }

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function toggleCart() {
    cartOpen = !cartOpen;
  }

  // Close the dropdown when clicking anywhere else on the page.
  function handleClickOutside(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('#menuDropdownContainer')) {
      isDropdownOpen = false;
    }
  }

  // Listen for clicks outside the dropdown in the browser
  if (browser) {
    document.addEventListener('click', handleClickOutside);
  }
</script>


<CartModal bind:open={cartOpen} />

<!-- NAV WRAPPER -->
<nav class="bg-white border-b py-1">
  <div class="container mx-auto px-4 flex items-center justify-between">
    <!-- Logo -->
    <a href="/" class="flex items-center">
      <img
        src="/images/branding/crf-logo.svg"
        alt="Logo"
        class="h-[125px]"
      />
    </a>

    <!-- Mobile Toggle Button -->
    <button
      class="lg:hidden p-2 text-gray-700"
      onclick={toggleNav}
      aria-label="Toggle Navigation"
    >
      <!-- Simple Hamburger Icon (replace as desired) -->
     <p>-</p>
      <p>-</p>
      <p>-</p>
    </button>

    <!-- Navbar Links (Desktop + Mobile) -->
    <div
      class={`lg:flex lg:items-center w-full lg:w-auto transition-all duration-300 ease-in-out
        ${isNavOpen ? 'flex' : 'hidden'}`
      }
    >
      <!--
        Use 'justify-end' to push items to the right,
        'ml-auto' to separate them from the logo.
        Decrease space-x-4 to space-x-2 for closer spacing on large screens.
      -->
      <ul class="flex flex-col lg:flex-row ml-auto lg:space-x-2 justify-end">
        <!-- Home -->
        <li>
          <a
            class="inline-flex items-center px-2 py-2 text-lowercase hover:text-raw-pink"
            href="/"
          >
            home
          </a>
        </li>

        <!-- Menu Dropdown -->
        <li
          id="menuDropdownContainer"
          class="relative"
        >
          <!-- Dropdown Trigger -->
          <button
            class="inline-flex items-center justify-between w-full px-2 py-2 text-lowercase hover:text-raw-pink lg:inline-block"
            onclick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            menu
            <!-- Dropdown caret (optional) -->
            <svg
              class="w-4 h-4 ml-1 fill-current "
              viewBox="0 0 20 20"
            >
              <path d="M5.516 7.548a.625.625 0 0 1 .884 0L10 11.15l3.6-3.602a.625.625 0 0 1 .884.884l-4.04 4.04a.625.625 0 0 1-.884 0l-4.04-4.04a.625.625 0 0 1 0-.884z" />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          {#if isDropdownOpen}
            <ul
              class="absolute left-0 mt-1 w-48 bg-white shadow-md z-50 rounded text-sm"
              aria-labelledby="menuDropdown"
            >
              <li>
                <a
                  class="block px-4 py-2 text-lowercase hover:bg-gray-100 hover:text-raw-pink"
                  href="/menu/minis"
                >
                  The Minis
                </a>
              </li>
              <li>
                <a
                  class="block px-4 py-2 text-lowercase hover:bg-gray-100 hover:text-raw-pink"
                  href="/menu/hot-beverages"
                >
                  Hot Beverages
                </a>
              </li>
              <li>
                <a
                  class="block px-4 py-2 text-lowercase hover:bg-gray-100 hover:text-raw-pink"
                  href="/menu/juices-elixirs"
                >
                  Juices & Elixirs
                </a>
              </li>
              <li>
                <a
                  class="block px-4 py-2 text-lowercase hover:bg-gray-100 hover:text-raw-pink"
                  href="/menu/smoothies"
                >
                  Smoothies
                </a>
              </li>
              <li>
                <a
                  class="block px-4 py-2 text-lowercase hover:bg-gray-100 hover:text-raw-pink"
                  href="/menu/bowls"
                >
                  Bowls
                </a>
              </li>
              <li>
                <a
                  class="block px-4 py-2 text-lowercase hover:bg-gray-100 hover:text-raw-pink"
                  href="/menu/entrees"
                >
                  Entrees
                </a>
              </li>
              <li>
                <a
                  class="block px-4 py-2 text-lowercase hover:bg-gray-100 hover:text-raw-pink"
                  href="/menu/sandwiches"
                >
                  Sandwiches
                </a>
              </li>
              <li>
                <a
                  class="block px-4 py-2 text-lowercase hover:bg-gray-100 hover:text-raw-pink"
                  href="/menu/salads"
                >
                  Salads
                </a>
              </li>
              <li>
                <a
                  class="block px-4 py-2 text-lowercase hover:bg-gray-100 hover:text-raw-pink"
                  href="/menu/breads-spreads"
                >
                  Breads & Spreads
                </a>
              </li>
              <li>
                <a
                  class="block px-4 py-2 text-lowercase hover:bg-gray-100 hover:text-raw-pink"
                  href="/menu/desserts"
                >
                  Desserts
                </a>
              </li>
              <li>
                <a
                  class="block px-4 py-2 text-lowercase hover:bg-gray-100 hover:text-raw-pink"
                  href="/menu/breakfast"
                >
                  Breakfast
                </a>
              </li>
              <li>
                <a
                  class="block px-4 py-2 text-lowercase hover:bg-gray-100 hover:text-raw-pink"
                  href="/menu/dehydrated-items"
                >
                  Dehydrated Items
                </a>
              </li>
              <li>
                <a
                  class="hidden block px-4 py-2 text-lowercase hover:bg-gray-100 hover:text-raw-pink"
                  href="/menu/dietary-restrictions"
                >
                  Dietary Restrictions
                </a>
              </li>
              <li>
                <a
                  class="hidden block px-4 py-2 text-lowercase hover:bg-gray-100 hover:text-raw-pink"
                  href="/menu/crc-kosher"
                >
                  cRc Kosher
                </a>
              </li>
            </ul>
          {/if}
        </li>

        <!-- Shop Retail -->
        <li>
          <a
            class="inline-flex items-center px-2 py-2 text-lowercase hover:text-raw-pink"
            href="/shop"
          >
            shop retail
          </a>
        </li>

        <!-- Weekly Takeaway -->
        <li>
          <a
            class="inline-flex items-center px-2 py-2 text-lowercase hover:text-raw-pink"
            href="/takeaway"
          >
            weekly takeaway
          </a>
        </li>

        <!-- About -->
        <li>
          <a
            class="inline-flex items-center px-2 py-2 text-lowercase hover:text-raw-pink"
            href="/about"
          >
            about
          </a>
        </li>

        <!-- Gift -->
        <li>
          <a
            class="inline-flex items-center px-2 py-2 text-lowercase hover:text-raw-pink"
            href="https://squareup.com/gift/17A1XAYRBCGV7/order"
            target="_blank"
          >
            gift
          </a>
        </li>

        <!-- Connect -->
        <li>
          <a
            class="inline-flex items-center px-2 py-2 text-lowercase hover:text-raw-pink"
            href="/connect"
          >
            connect
          </a>
        </li>

        <!-- Cart -->
        <li>
          <button onclick={toggleCart}
                  class="inline-flex items-center px-2 py-2 text-lowercase hover:text-raw-pink">
            <IconCart class="w-5 h-5" />
          </button>

        </li>

        <!-- Admin -->
        <li>
          <a
            href="/admin"
            class="inline-flex items-center px-2 py-2 text-lowercase hover:text-raw-pink"
          >
            <IconMdiAccount class="w-5 h-5" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<style>
  /* Tailwind will handle most styling.
     .text-lowercase ensures link text remains lowercase. */
  .text-lowercase {
    text-transform: lowercase;
  }
</style>
