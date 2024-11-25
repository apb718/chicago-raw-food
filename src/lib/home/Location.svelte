<script>
    export let locationName = ""
    export let address = ""
    export let days=""
    export let startTime=""
    export let endTime=""
</script>

<div class="col-3 bg-green rounded d-flex align-items-center justify-content-center p-4">
    <div>
        <h4>{locationName}</h4>
        <p>{address}</p>
        <br>
        <p>{days}</p>
        <p>{startTime} - {endTime}</p>
    </div>
</div>
