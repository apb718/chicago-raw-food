<script>
    export let imageUrl='';
    export let text='';
</script>

<div class='row' >
    <div class="image-container">
        <img src="{imageUrl}" alt="Takeaway food banner" />
        <div class="centered-text">{text}</div>
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

    .centered-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white; /* Adjust text color as needed */
        font-size: 2rem; /* Adjust font size as needed */
        font-weight: bold; /* Make text bold */
        text-align: center;
        text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5); /* Optional shadow for readability */

        /*        background: rgba(0, 0, 0, 0.5); !* Optional background for better readability *!*/
        padding: 10px; /* Optional padding around the text */
        border-radius: 5px; /* Optional rounded corners */
    }
</style>