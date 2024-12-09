<script>
    export let imageSource = '';

    export let hrefLink = '';

    export let altText = '';
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