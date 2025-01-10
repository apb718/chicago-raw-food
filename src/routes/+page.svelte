<script lang="ts">
  import '$lib/crf-styling.css'
  import FoodCarousel from '$lib/home/Carousel.svelte'
  import OrderApps from "$lib/home/OrderApps.svelte";
  import BulletRow from "$lib/home/BulletRow.svelte";
  import StoreLocations from "$lib/home/StoreLocations.svelte";
  import OtherOptions from "$lib/home/OtherOptions.svelte";

  const carouselItems: CarouselItem = [
    {
      imageSrc: "/images/main-menu/carousel/img1.jpg",
      altText: "First slide",
      captionText: "prepared fresh daily & packaged to go"
    },
    {
      imageSrc: "/images/main-menu/carousel/img2.jpg",
      altText: "Second slide",
      captionText: "eat living foods to energize your life"
    },
    {
      imageSrc: "/images/main-menu/carousel/img3.jpg",
      altText: "Third slide",
      captionText: "celebrate the power of plants"
    }
  ];
</script>

<FoodCarousel 
  items={carouselItems}
/>
<OrderApps />
<BulletRow />
<StoreLocations />
<OtherOptions />  
