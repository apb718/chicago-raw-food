<script>
  import Location from '$lib/home/Location.svelte';
</script>

<div class="relative">
  <!-- Parallax Row -->
  <div 
    class="bg-fixed bg-center bg-cover min-h-[400px] flex items-center justify-center text-center" 
    style="background-image: url('/images/storefront/storefront1.jpg');"
  >
    <div class="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0 w-full">
      <!-- Location 1 -->
      <div class="flex-grow max-w-xs">
        <Location
          locationName="Gold Coast Storefront"
          address="51 W Huron St, Chicago, IL 60654"
          days="Monday-Sunday"
          startTime="8:00am"
          endTime="8:00pm"
        />
      </div>

      <!-- Location 2 -->
      <div class="flex-grow max-w-xs">
        <Location
          locationName="Raw Kitchen"
          address="325 N Hoyne Ave, Unit #323, Chicago, IL 60612"
          days="Monday-Friday"
          startTime="6:30am"
          endTime="1:30pm"
        />
      </div>
    </div>
  </div>
</div>
