<script>
  import AboutBanner from '$lib/about/AboutBanner.svelte';
  import OurStory from '$lib/about/OurStory.svelte';
  import MargoBanner from "$lib/about/MargoBanner.svelte";
  import PollyBanner from "$lib/about/PollyBanner.svelte";
  import WhatIsRaw from "$lib/about/WhatIsRaw.svelte";
  import OurMission from "$lib/about/OurMission.svelte";
  import Banner from "$lib/components/chicago-raw/banner/Banner.svelte"
</script>
<head>
  <title>About Us</title>
</head>

<Banner 
  imageUrl="/images/aboutus/banner/AboutUsBanner.jpg"
/>
<OurStory />
<PollyBanner />
<WhatIsRaw />
<MargoBanner />
<OurMission />