<script>
    export let itemName        = "";
    export let itemDescription = "";
    export let imageURL        = "";
    export let itemPrice       = "";
</script>


<div class="card">
    <p>Name: {itemName}</p>
    <p>Price: ${itemPrice}</p>
    <p>Description: {itemDescription}</p>
    <p>Image: {imageURL}</p>
</div>