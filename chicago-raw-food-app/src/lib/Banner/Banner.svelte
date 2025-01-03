<script lang="ts">

    export let imageUrl: string = '';
    export let text: string = '';
  </script>
  
  <!-- Banner Container -->
  <div class=" w-full h-[40vh] overflow-hidden">
    <!-- Banner Image -->
    <img
      src={imageUrl}
      alt="Takeaway food banner"
      class="w-screen min-h-[30vh] object-cover "
    />
  
    <!-- Centered Text (using a H2 for demonstration) -->
    <!-- <h2
      class="absolute top-1/2 left-1/2 
             -translate-x-1/2  
             text-white text-center text-2xl font-bold
             drop-shadow-[3px_3px_5px_rgba(0,0,0,0.5)]"
    >
      {text}
    </h2> -->
  </div>
  
  <style>
    /* 
      If you have a custom font like "railway-thin", 
      you can reference it via Tailwind config or add a .font-railway-thin class.
    */
  </style>
  