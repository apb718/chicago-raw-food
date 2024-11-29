<script>
  import Location from '$lib/home/Location.svelte';
</script>

<div class="container-fluid">
  <!-- Parallax Row -->
  <div class="parallax-row text-center inner" >

    <div class='row mt-3 p-5 inner' id='containeRow' >
      <div class='col-xl-2 outer'></div>
      <Location
        locationName="Gold Coast Storefront"
        address="51 W Huron St, Chicago, IL 60654"
        days="Monday-Sunday"
        startTime = "8:00am"
        endTime= "8:00pm"
      />

      <div class='col-lg-2 outer'></div>
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

/*  @media (max-width: 768px) {*/
/*    .parallax-row {*/
/*      background-image: url("/images/storefront/storefront1.jpg");*/
/*      min-height: 60vh; !* Flexible height *!*/
/*      background-attachment: fixed;*/
/*      background-position: center;*/
/*      background-repeat: no-repeat;*/
/*      background-size: cover;*/
/*      position: relative;*/
/*      z-index: 1;*/
/*      background-attachment: scroll; !* Fallback for mobile *!*/
/*      background-position: center top; !* Adjust position *!*/
/*    }*/
/*  }*/

</style>
