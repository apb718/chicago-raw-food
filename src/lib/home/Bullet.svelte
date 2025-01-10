<script>
  const { text = '' } = $props();
</script>

<div class="w-full max-w-xs text-center pt-3 px-5">
  <!-- Bullet Icon -->
  <div class="flex justify-center">
    <div class="w-6 h-6 bg-raw-green rounded-full"></div>
  </div>
  <!-- Bullet Text -->
  <p class="font-bold text-lg mt-3">{text}</p>
</div>
