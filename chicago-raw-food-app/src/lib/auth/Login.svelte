<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { get } from "svelte/store";
    import Button  from "$lib/components/ui/button/button.svelte";


    import EmailInput from "$lib/components/chicago-raw/login/EmailInput.svelte";
    import PasswordInput from "$lib/components/chicago-raw/login/PasswordInput.svelte";
    import RememberMeCheckbox from "$lib/components/chicago-raw/login/RememberMeCheckbox.svelte";
    import ErrorMessage from "$lib/components/chicago-raw/login/ErrorMessage.svelte";

    let email = $state('');
    let password = $state('');
    let error: string | null = $state(null);

    const params = $state(get(page).url.searchParams);
    const redirectTo = $derived(params.get('redirectTo') || '');
    

    async function login(): Promise<void> {
        error = null;

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
                await goto(`/${redirectTo}`);
            }
        } catch (err) {
            error = "Failed to login. Please check your credentials.";
            console.log("Failed to login", err);
        }
    }
</script>

<div class="flex justify-center py-10">
    <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div class="text-center mb-6">
            <h2 class="text-2xl font-bold">Login</h2>
        </div>
        <form onsubmit={login} class="space-y-4">
            <EmailInput bind:value={email} />
            <PasswordInput bind:value={password} />
            <!-- <RememberMeCheckbox /> -->
            <ErrorMessage {error} />
            <Button type="submit" class="w-full">
                Login
            </Button>
        </form>
    </div>
</div>
