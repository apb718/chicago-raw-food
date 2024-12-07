<script>
    export let imageSource = '';

    export let hrefLink = '';

    export let altText = '';
</script>
<a href={hrefLink} target='_blank'>
    <img src={imageSource} alt={altText}>
</a>

<style>
    img {
        height:auto;
        width:100%;
    }
</style>