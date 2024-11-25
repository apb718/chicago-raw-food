<script>
  import CarouselItem from './CarouselItem.svelte';
</script>

<div class='row'>
  <div class='col-lg-12'>
        <div id="imageCarousel" class="carousel slide w-100" data-bs-ride="carousel">
            <!-- Carousel Indicators -->
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>

            <!-- Carousel Inner -->
            <div class="carousel-inner" style='height: 40vh'>
              <CarouselItem
                imageSrc="/images/carousel/main-menu/img1.jpg"
                altText="First slide"
                captionText="prepared fresh daily & packaged to go"
                isActive=true
              />
              <CarouselItem
                imageSrc="/images/carousel/main-menu/img2.jpg"
                altText="Second slide"
                captionText="eat living foods to energize your life"
              />
              <CarouselItem
                imageSrc="/images/carousel/main-menu/img3.jpg"
                altText="Third slide"
                captionText="celebrate the power of plants"
              />
            </div>

            <!-- Carousel Controls -->
            <button class="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
    </div>
</div>



