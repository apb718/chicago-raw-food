<script lang="ts">
  // Define and initialize props using $props
  const { imageSrc, altText, captionText, isActive } = $props();
</script>

<!-- 
  Container uses a fade approach:
  - When isActive = false => opacity-0 + pointer-events-none
  - When isActive = true  => fully visible.
-->

<div
  class="relative w-full h-full transition-opacity duration-700 ease-in-out"
  class:opacity-0={!isActive}
  class:pointer-events-none={!isActive}
>
  <!-- The image, covering the container at 50vh -->
  <img
    src={imageSrc}
    alt={altText}
    class="w-full h-[50vh] object-cover object-center"
  />
  
  <!-- Caption, only if captionText is non-empty -->
  {#if captionText}
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[25%]
             z-10 text-center"
    >
      <!-- Using a regular <h5> instead of a special component -->
        <h5
        class="text-3xl font-bold text-white 
               text-
               drop-shadow-[10px_10px_10px_rgba(0,0,0,0.8)]"
      >
        {captionText}
      </h5>
    </div>
  {/if}
</div>

<style>
  h5 {
    text-shadow:
        0.01em 0 black,
        0 0.01em black,
        -0.01em 0 black,
        0 -0.01em black;
  }
</style>
