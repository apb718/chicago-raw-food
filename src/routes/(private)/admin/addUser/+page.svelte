<script lang="ts">
    import { onMount } from 'svelte';
    import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "$lib/components/ui/card";
    import Button from "$lib/components/ui/button/button.svelte";

    let email: string = '';
    let password: string = '';
    let admin: string = '0';
    let auth_token: string = ''; // To be set from cookies
    let formError: string = '';

    // Get the auth_token from cookies when the script initializes
    onMount(() => {
        auth_token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1] || '';
    });

    async function addUser() {
        if (!email || !password || admin === undefined) {
            formError = 'All fields are required.';
            return;
        }
        formError = ''; // Clear any previous errors
        try {
            const response = await fetch('/api/v1/users/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    admin
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User added successfully:', data);
                alert('User added successfully!');
                email = '';
                password = '';
                admin = '0';
            } else {
                const error = await response.json();
                console.error('Error adding user:', error);
                formError = error.error || 'Failed to add user.';
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            formError = 'Unexpected error occurred.';
        }
    }

    function handleSubmit(event: Event) {
        event.preventDefault(); // Prevent default form submission behavior
        addUser();
    }
</script>

<div class="flex justify-center mt-10">
    <Card class="w-full max-w-lg shadow-lg">
        <CardHeader class="text-center">
            <CardTitle class="text-xl font-bold">Add User</CardTitle>
        </CardHeader>
        <CardContent>
            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        bind:value={email}
                        required
                        placeholder="Enter user email"
                    />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        bind:value={password}
                        required
                        placeholder="Enter user password"
                    />
                </div>
                <div>
                    <label for="admin" class="block text-sm font-medium text-gray-700">Admin</label>
                    <select
                        id="admin"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        bind:value={admin}
                    >
                        <option value="0">0 - Regular User</option>
                        <option value="1">1 - Moderator</option>
                        <option value="2">2 - Administrator</option>
                    </select>
                </div>
                {#if formError}
                    <div class="text-red-600 text-sm">
                        {formError}
                    </div>
                {/if}
            </form>
        </CardContent>
        <CardFooter class="flex justify-end">
            <Button onclick={handleSubmit} class="w-full">
                Add User
            </Button>
        </CardFooter>
    </Card>
</div>
