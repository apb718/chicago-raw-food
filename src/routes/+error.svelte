<script>
    import '$lib/srf-styling.css';
</script>

<div class='row mb-5 outer'>
    <div class='col-xl-3'></div>
    <div class='col-xl-6 rounded-3 inner outer' style='height: 30vh'>
        <div class='inner'>
          <p class='text-strong-pink text-center fs-3'>Oops! You’ve ventured off the beaten path.</p>
          <p class='text-body-tertiary text-center fs-4'><a href='/'>Go back to safety</a></p>
        </div>
    </div>
    <div class='col-xl-3'></div>
</div>

<style>
  .outer {
    display: flex;
    justify-content: center; /* Horizontal centering */
    align-items: center; /* Vertical centering */
    height: 300px; /* Set a height for the outer div */
/*    border: 1px solid black; !* For visualization *!*/
  }

  .inner {
    padding: 20px;
/*    background-color: lightgray;*/
  }
</style>