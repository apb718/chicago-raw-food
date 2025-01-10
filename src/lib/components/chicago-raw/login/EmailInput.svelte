<script lang='ts'>
    export let value: string;
</script>

<div>
    <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
    <input
        type="email"
        id="email"
        placeholder="Enter your email"
        bind:value
        required
        class="px-3 h-12 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
</div>
