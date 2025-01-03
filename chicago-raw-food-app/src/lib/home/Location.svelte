<script>
    const { locationName, address, days, startTime, endTime } = $props();
  </script>
  
  <div class="bg-raw-green  rounded-lg flex items-center justify-center py-6 px-4 max-w-2xl mx-auto">
    <div class="text-center">
      <h4 class="text-xl font-bold text-black">{locationName}</h4>
      <p class="text-sm text-black">{address}</p>
      <div class="mt-4">
        <p class="text-md font-semibold text-black">{days}</p>
        <p class="text-sm text-black">{startTime} - {endTime}</p>
      </div>
    </div>
  </div>
  