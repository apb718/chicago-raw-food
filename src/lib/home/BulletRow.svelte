<script>
    import Bullet from '$lib/home/Bullet.svelte';
</script>
<div class='row bg-white h-25'>
    <div class='row'>
        <figure class="text-center">
          <blockquote class="blockquote">
            <p class='text-pink fw-bold mt-5 fs-4'>RAW is a health food café serving freshly prepared raw vegan food to-go.</p>
          </blockquote>
          <!--<figcaption class="blockquote-footer">-->
            <p class='caption-text'>Our menu includes breakfast, lunch, and dinner, as well as many specialty items.</p>
          <!--</figcaption>-->
        </figure>
    </div>
    <div class='row pb-3' id='bullets'>
        <div class='col-lg-2'></div>
        <Bullet
            text='vegan meals, salads, desserts, snacks, and spreads'
        />
        <Bullet
            text='superfood smoothies and bowls, including our signature açaí bowl

'
        />
        <Bullet
            text='cold-pressed juices, elixirs, and fresh-cracked coconut water'
        />
        <Bullet
            text='hot espresso, tea, and lattes'
        />
        <div class='col-2'></div>
    </div>
</div>

<style>
    p.caption-text {
        font-size: small;
        opacity: 0.6;
    }
</style>