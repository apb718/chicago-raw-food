<script>
    import AdminLinkCard from "\$lib/admin/adminLinkCard.svelte";
    import {goto} from "$app/navigation";
</script>
<!--<head>-->
<!--    <title>CRF - Admin</title>-->
<!--</head>-->

<div class="col-xl-8">
    <AdminLinkCard
            title="Add User"
            description="Create a new user in the system"
            actionText="Go to Add User"
            pageAction={() => goto('/admin/addUser')}
    />
</div>
<div class="col-xl-4"></div>