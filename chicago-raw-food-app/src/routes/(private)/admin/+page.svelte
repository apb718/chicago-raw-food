<script>
    import AdminLinkCard from "\$lib/admin/adminLinkCard.svelte";
    import {goto} from "$app/navigation";
</script>


<div class="col-xl-8">
    <AdminLinkCard
            title="Add User"
            description="Create a new user in the system"
            actionText="Go to Add User"
            pageAction={() => goto('/admin/addUser')}
    />
    <AdminLinkCard
        title="Manage Products"
        description="Manage Products"
        actionText="Go to Products"
        pageAction={() => goto('/admin/products')}
    />
</div>
<div class="col-xl-4"></div>