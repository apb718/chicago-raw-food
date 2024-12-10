<script lang="ts">
    let email = '';
    let password = '';
    let error: string | null = null;

    async function login(): Promise<void> {
        error = null;
        console.log('Login');
        try {
            const response = await fetch('/api/v1/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });


            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error);
            } else {
                window.location.href = '/';
            }

        } catch (err) {

        }
    }
</script>

<div class='row py-5'>
    <div class='col-xl-4'></div>
    <div class='card p-4 shadow col-xl-4'>
        <div class="text-center mb-4">
            <h2>Login</h2>
        </div>
        <form on:submit|preventDefault={login}>
            <!-- Email Input -->
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Enter your email"
                        bind:value={email}
                        required>
            </div>
            <!-- Password Input -->
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password"
                       class="form-control"
                       id="password"
                       placeholder="Enter your password"
                       bind:value={password}
                       required>
            </div>
            <!-- Remember Me Checkbox -->
            <div class="form-check mb-3">
                <input type="checkbox" class="form-check-input" id="rememberMe">
                <label class="form-check-label" for="rememberMe">Remember Me</label>
            </div>
            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
    </div>
    <div class='col-xl-4'></div>
</div>
