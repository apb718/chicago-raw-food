<script lang="ts">
    import { onMount } from 'svelte';

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

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow">
                <div class="card-header text-center bg-primary text-white">
                    <h3>Add User</h3>
                </div>
                <div class="card-body">
                    <form on:submit|preventDefault={handleSubmit}>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input
                                    type="email"
                                    id="email"
                                    class="form-control"
                                    bind:value={email}
                                    required
                                    placeholder="Enter user email"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input
                                    type="password"
                                    id="password"
                                    class="form-control"
                                    bind:value={password}
                                    required
                                    placeholder="Enter user password"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="admin" class="form-label">Admin</label>
                            <select id="admin" class="form-select" bind:value={admin}>
                                <option value="0">0 - Regular User</option>
                                <option value="1">1 - Moderator</option>
                                <option value="2">2 - Administrator</option>
                            </select>
                        </div>
                        {#if formError}
                            <div class="alert alert-danger" role="alert">
                                {formError}
                            </div>
                        {/if}
                        <button type="submit" class="btn btn-primary w-100">Add User</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .card {
        border-radius: 10px;
    }

    .card-header {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .btn-primary {
        background-color: #007bff;
        border: none;
    }

    .btn-primary:hover {
        background-color: #0056b3;
    }
</style>