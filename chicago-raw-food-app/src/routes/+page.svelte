<script>
  import '$lib/srf-styling.css'
  import FoodCarousel from '$lib/home/Carousel.svelte'
  import OrderApps from "$lib/home/OrderApps.svelte";
  import BulletRow from "$lib/home/BulletRow.svelte";
  import StoreLocations from "$lib/home/StoreLocations.svelte";
  import OtherOptions from "$lib/home/OtherOptions.svelte";
  import redisClient from "$lib/redisClient";
</script>
<head>
  <title>Home</title>
</head>


<FoodCarousel />
<OrderApps />
<BulletRow />
<StoreLocations />
<OtherOptions />