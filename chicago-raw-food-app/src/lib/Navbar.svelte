<script lang="ts">
  import { onMount } from 'svelte';

  function closeDropdown(event: Event) {
    // Find the closest dropdown and use Bootstrap's JavaScript API to close it
    const dropdownElement = (event.target as HTMLElement).closest('.dropdown-menu');
    if (dropdownElement) {
      const dropdown = bootstrap.Dropdown.getInstance(dropdownElement.closest('.dropdown') as HTMLElement);
      if (dropdown) {
        dropdown.hide(); // Properly close the dropdown using Bootstrap's API
      }
    }
  }

  // Attach event listeners to all dropdown items
  onMount(() => {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', closeDropdown);
    });

    // Cleanup event listeners on component destruction
    return () => {
      dropdownItems.forEach(item => {
        item.removeEventListener('click', closeDropdown);
      });
    };
  });
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-white py-1">
  <div class="container">
    <!-- Logo -->
    <a class="navbar-brand" href="/">
      <img src="/images/branding/crf-logo.svg" alt="Logo" style="height: 125px" />
    </a>

    <!-- Toggler for mobile view -->
    <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Navbar Links -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link text-lowercase" href="/">home</a>
        </li>
        <li class="nav-item dropdown">
          <a
                  class="nav-link dropdown-toggle text-lowercase"
                  data-toggle="dropdown"
                  id="menuDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
          >
            menu
          </a>
          <ul class="dropdown-menu" aria-labelledby="menuDropdown">
            <li><a class="dropdown-item" href="/menu/minis">The Minis</a></li>
            <li><a class="dropdown-item" href="/menu/hot-beverages">Hot Beverages</a></li>
            <li><a class="dropdown-item" href="/menu/juices-elixirs">Juices & Elixirs</a></li>
            <li><a class="dropdown-item" href="/menu/smoothies">Smoothies</a></li>
            <li><a class="dropdown-item" href="/menu/bowls">Bowls</a></li>
            <li><a class="dropdown-item" href="/menu/entrees">Entrees</a></li>
            <li><a class="dropdown-item" href="/menu/sandwiches">Sandwiches</a></li>
            <li><a class="dropdown-item" href="/menu/salads">Salads</a></li>
            <li><a class="dropdown-item" href="/menu/breads-spreads">Breads & Spreads</a></li>
            <li><a class="dropdown-item" href="/menu/desserts">Desserts</a></li>
            <li><a class="dropdown-item" href="/menu/breakfast">Breakfast</a></li>
            <li><a class="dropdown-item" href="/menu/dehydrated-items">Dehydrated Items</a></li>
            <li><a class="dropdown-item" href="/menu/dietary-restrictions">Dietary Restrictions</a></li>
            <li><a class="dropdown-item" href="/menu/crc-kosher">cRc Kosher</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link text-lowercase" href="/shop">shop retail</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-lowercase" href="/takeaway">weekly takeaway</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-lowercase" href="/about">about</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-lowercase" target="_blank" href="https://squareup.com/gift/17A1XAYRBCGV7/order">gift</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-lowercase" href="/connect">connect</a>
        </li>
      </ul>

      <!-- Cart Icon -->
      <a href="/cart" class="nav-link ms-lg-3">
        <i class="bi bi-cart2"></i>
      </a>
      <a href="/admin" class="nav-link ms-lg-3">
        <i class="bi bi-person"></i>
      </a>
    </div>
  </div>
</nav>

<style>
  /*.dropdown:hover .dropdown-menu {*/
  /*  display: block;*/
  /*  margin-top: 0;*/
  /*  transition: all 0.3s ease;*/
  /*}*/

  .nav-link:hover,
  .dropdown-item:hover {
    color: #e64398;
  }
</style>
