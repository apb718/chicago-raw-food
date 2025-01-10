<script lang='ts'>
    export let value: string;
</script>

<div>
    <label for="password" class="block text-sm font-medium text-gray-700 ">Password</label>
    <input
        type="password"
        id="password"
        placeholder="Enter your password"
        bind:value
        required
        class="h-12 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
</div>
