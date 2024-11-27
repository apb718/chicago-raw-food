<script>
  import Location from '$lib/home/Location.svelte';
</script>

<div class="container-fluid">
  <!-- Parallax Row -->
  <div class="parallax-row text-center" style='height:50vh'>

    <div class='row p-5' style='height:500px'>
      <div class='col-xl-2'></div>
      <Location
        locationName="Gold Coast Storefront"
        address="51 W Huron St, Chicago, IL 60654"
        days="Monday-Sunday"
        startTime = "8:00am"
        endTime= "8:00pm"
      />

      <div class='col-xl-2'></div>
      <Location
        locationName="Raw Kitchen"
        address="325 N Hoyne Ave, Unit #323, Chicago, IL 60612"
        days="Monday-Friday"
        startTime = "6:30am"
        endTime= "1:30pm"
      />
      <div class='col-xl-3'></div>
    </div>

  </div>

</div>

<style>
  .parallax-row {
    /* The image used */
    background-image: url("/images/storefront/storefront1.jpg");

    /* Set a specific height */
    min-height: 500px;

    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    /* Ensure smooth updates with JS */
    position: relative;
    z-index: 1;
    overflow: hidden;
  }
</style>
