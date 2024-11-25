<script>
    import '$lib/srf-styling.css'
    import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
    import 'bootstrap-icons/font/bootstrap-icons.css'
</script>

<div class='row bg-pink text-info'>
    
    <div class='col-lg-12'>
        <div id="imageCarousel" class="carousel slide" data-bs-ride="carousel">
            <!-- Carousel Indicators -->
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
          
            <!-- Carousel Inner -->
            <div class="carousel-inner" style='height: 40vh'>
              <!-- Slide 1 -->
              <div class="carousel-item active">
                <img src="/images/carousel/main-menu/img1.jpg" class="d-block w-100" alt="First slide">
                <div class="carousel-caption d-none d-md-block">
                  <h5>eat living foods to energize your life</h5>
                </div>
              </div>
          
              <!-- Slide 2 -->
              <div class="carousel-item">
                <img src="/images/carousel/main-menu/img2.jpg" class="d-block w-100" alt="Second slide">
                <div class="carousel-caption d-none d-md-block">
                  <h5>fresh ingredients for a healthier lifestyle</h5>
                </div>
              </div>
          
              <!-- Slide 3 -->
              <div class="carousel-item">
                <img src="/images/carousel/main-menu/img3.jpg" class="d-block w-100" alt="Third slide">
                <div class="carousel-caption d-none d-md-block">
                  <h5>fuel your body with natural goodness</h5>
                </div>
              </div>
            </div>
          
            <!-- Carousel Controls -->
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
    </div>

</div>

