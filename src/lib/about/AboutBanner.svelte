<div class='row' >
    <div class="image-container">
        <img src="/images/aboutus/banner/AboutUsBanner.jpg" alt="About Us Banner" />
    </div>
</div>


<style>
    .image-container {
        height: 40vh;
        overflow: hidden; /* Ensures cropping of the image */
        position: relative;
    }

    .image-container img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); /* Centers the image */
        height: auto;
        width: 100vw; /* Makes the image scale with the viewport width */
/*        height: 50vw;*/
        min-height: 30vh; /* Ensures it always covers the container height */
        object-fit: cover; /* Ensures the image aspect ratio is maintained */
    }
</style>