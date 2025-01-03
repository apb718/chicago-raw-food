<script>
    let { imageSource, hrefLink, altText } = $props();
</script>
<a href={hrefLink} target='_blank' >
    <img src={imageSource} alt={altText} class='image-fluid'>
</a>

<style>
    img {
        height:auto;
        width:100%;
        max-width:300px;
    }
</style>