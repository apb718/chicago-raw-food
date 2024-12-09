<script lang="ts">
    import { page } from '$app/stores'; // For accessing cookies via SvelteKit store
    import { get } from 'svelte/store'; // To read from the store

    let email: string = '';
    let password: string = '';
    let admin: string = '0';
    let auth_token: string = ''; // To be set from cookies

    // Get the auth_token from cookies when the script initializes
    // auth_token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1] || '';

    async function addUser() {
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
            } else {
                const error = await response.json();
                console.error('Error adding user:', error);
                alert(`Error: ${error.error || 'Failed to add user'}`);
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            alert('Unexpected error occurred.');
        }
    }

    function handleSubmit(event: Event) {
        event.preventDefault(); // Prevent default form submission behavior
        addUser();
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required />
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required />
    </div>
    <div>
        <label for="admin">Admin:</label>
        <select id="admin" bind:value={admin}>
            <option value="0" selected>0 - Regular User</option>
            <option value="1">1 - Moderator</option>
            <option value="2">2 - Administrator</option>
        </select>
    </div>
    <button type="submit">Add User</button>
</form>