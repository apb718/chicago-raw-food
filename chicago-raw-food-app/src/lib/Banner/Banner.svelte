<script>
    const { imageUrl = '', text = '' } = $props();
</script>

<div class="relative h-[40vh] overflow-hidden">
    <img 
        src="{imageUrl}" 
        alt="Takeaway food banner" 
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen min-h-[30vh] object-cover"
    />
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold text-center shadow-md">
        {text}
    </div>
</div>
