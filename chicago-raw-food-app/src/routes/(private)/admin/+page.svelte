<script>
    import { goto } from "$app/navigation";
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "$lib/components/ui/card";
    import Button from "$lib/components/ui/button/button.svelte"
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
    <!-- Add User Card -->
    <Card>
        <CardHeader>
            <CardTitle>Add User</CardTitle>
            <CardDescription>Create a new user in the system</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Use this feature to add new users to the platform.</p>
        </CardContent>
        <CardFooter class="flex justify-end">
            <Button onclick={() => goto('/admin/addUser')} variant="default">
                Go to Add User
            </Button>
        </CardFooter>
    </Card>

    <!-- Manage Products Card -->
    <Card>
        <CardHeader>
            <CardTitle>Manage Products</CardTitle>
            <CardDescription>Manage Products in the system</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Access tools to manage and update product details.</p>
        </CardContent>
        <CardFooter class="flex justify-end">
            <Button onclick={() => goto('/admin/products')} variant="default">
                Go to Products
            </Button>
        </CardFooter>
    </Card>
</div>
