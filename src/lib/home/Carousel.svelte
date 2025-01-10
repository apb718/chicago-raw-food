<script lang="ts">
  import CarouselItem from './CarouselItem.svelte';


  const { height ='50vh', items } = $props();
  // Example 
  
  const slides = $state(items);

  let activeIndex = $state(0);

  function nextSlide() {
    activeIndex = (activeIndex + 1) % slides.length;
  }

  function prevSlide() {
    activeIndex = (activeIndex - 1 + slides.length) % slides.length;
  }

  function goToSlide(index: number) {
    activeIndex = index;
  }
</script>

<!-- Outer container with adjustable height -->
<div class="relative w-full overflow-hidden" style="height: {height}">
  
  <!-- Slides -->
  {#each slides as slide, index}
    <div
      class="absolute inset-0 transition-opacity duration-700"
      style="opacity: {index === activeIndex ? 1 : 0}"
    >
      <CarouselItem
        imageSrc={slide.imageSrc}
        altText={slide.altText}
        captionText={slide.captionText}
        isActive=true
      />
    </div>
  {/each}

  <!-- Indicators (Dots) -->
  <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
    {#each slides as _, index}

      <button
        class="w-3 h-3 rounded-full border border-white bg-white/50 
               hover:bg-white transition-colors"
        aria-label="Slide {index}"
        onclick={() => goToSlide(index)}
      >
      </button>
    {/each}
  </div>

  <!-- Prev/Next Controls -->
  <button
    class="absolute top-1/2 left-2 -translate-y-1/2 
           text-white bg-black/50 rounded-full p-2 
           hover:bg-black/70 transition-colors"
    onclick={prevSlide}
    aria-label="Previous slide"
  >
    <!-- Left arrow icon -->
    <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  </button>

  <button
    class="absolute top-1/2 right-2 -translate-y-1/2 
           text-white bg-black/50 rounded-full p-2 
           hover:bg-black/70 transition-colors"
    onclick={nextSlide}
    aria-label="Next slide"
  >
    <!-- Right arrow icon -->
    <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
  </button>
</div>
