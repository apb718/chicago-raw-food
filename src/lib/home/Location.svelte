<script>
    export let locationName = ""
    export let address = ""
    export let days=""
    export let startTime=""
    export let endTime=""
</script>

<div class="col-xl-3 bg-green rounded d-flex align-items-center justify-content-center ">
    <div>
        <h4>{locationName}</h4>
        <p class='para-text'>{address}</p>
        <br>
        <p >{days}</p>
        <p class='para-text' >{startTime} - {endTime}</p>
    </div>
</div>

