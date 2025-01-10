<script>
    import Bullet from '$lib/home/Bullet.svelte';
</script>

<div class="bg-white h-64">
  <!-- Intro Section -->
  <div class="text-center">
    <figure>
      <blockquote>
        <p class="text-pink-500 font-bold mt-5 text-xl">
          RAW is a health food café serving freshly prepared raw vegan food to-go.
        </p>
      </blockquote>
      <p class="text-sm text-gray-600 mt-2">
        Our menu includes breakfast, lunch, and dinner, as well as many specialty items.
      </p>
    </figure>
  </div>

  <!-- Bullet Section -->
  <div class="flex justify-center flex-wrap gap-4 pb-3 pt-3" id="bullets">
    <Bullet text="vegan meals, salads, desserts, snacks, and spreads" />
    <Bullet text="superfood smoothies and bowls, including our signature açaí bowl" />
    <Bullet text="cold-pressed juices, elixirs, and fresh-cracked coconut water" />

  </div>
</div>
