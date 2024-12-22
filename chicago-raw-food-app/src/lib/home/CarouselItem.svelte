<script>
  // Props for the component
  export let imageSrc = ''; // Path to the image
  export let altText = '';  // Alt text for the image
  export let captionText = ''; // Text for the caption
  export let isActive = false; // Determines if this slide is active
</script>

<div class="carousel-item {isActive ? 'active' : ''}">
  <img src={imageSrc} class="d-block w-100" alt={altText} />
  <div class="carousel-caption d-none d-md-block outer">
    <h5 class="text-light inner">{captionText}</h5>
  </div>
</div>


<style>

    img {
      height: 50vh; /* Ensures the image takes up the height of the carousel */
      object-fit: cover; /* Ensures the image fills the carousel and crops as needed */
      object-position: center; /* Adjusts the visible part of the image */
    }
  .carousel-caption {
    position: absolute;
    top: 50%; /* Move the caption to 50% of the container's height */
    left: 50%; /* Center horizontally as well (optional) */
    transform: translate(-50%, -25%); /* Adjust position to perfectly center */
    z-index: 10; /* Ensure it stays above the image */
    text-align: center; /* Center-align the text */
  }

  .carousel-caption h5 {
    font-size: 2rem; /* Adjust font size as needed */
    color: white; /* Make sure text is visible */
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5); /* Optional shadow for readability */
  }

  .carousel-item {
    transition: transform 0.6s ease-in-out;
  }

</style>