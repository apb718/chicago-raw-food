<script>
    import OrderAppItem from '$lib/home/OrderAppItem.svelte';
</script>
<div class='row vh-10 bg-green'>
    <div class='col-lg-1'></div>
    <div class='col-lg-10'>
        <div class='row py-5'>
            <div class='col-md-1'></div>

            <div class='col-md-2'>
                <OrderAppItem
                    imageSource="images/main-menu/orderingApps/caviar.jpg"
                    hrefLink="https://www.trycaviar.com/store/chicago-raw-chicago-398254/?cav_medium=widget&cav_source=mer-hM4weg-1CYrig-mDVnlN9A&groups=f_online__d_restaurant_partners__p_widget__c_18741&utm_campaign=398254&utm_content=18741&utm_medium=website&utm_source=partner-link&utm_term=chicago"
                    altText="Caviar Logo"
                />
            </div>
            <div class='col-md-2'>
                <OrderAppItem
                    imageSource="images/main-menu/orderingApps/ritual.jpg"
                    hrefLink="https://order.ritual.co/menu/chicago-raw-dearborn-huron-chicago/037g"
                    altText="Ritual Logo"
                />
            </div>
            <div class='col-md-2'>
                <OrderAppItem
                    imageSource="images/main-menu/orderingApps/order-online.jpg"
                    hrefLink="https://chicagorawfood.square.site/"
                    altText="Order Online Logo"
                />
            </div>

            <div class='col-md-2'>
                <OrderAppItem
                    imageSource="images/main-menu/orderingApps/postmates.jpg"
                    hrefLink="https://postmates.com/store/chicago-raw-river-north/wom9hiOWTmWlX5n9qCV5WA"
                    altText="Postmates Logo"
                />
            </div>

            <div class='col-md-2'>
                <OrderAppItem
                    imageSource="images/main-menu/orderingApps/doordash.jpg"
                    hrefLink="https://www.doordash.com/business/1662/?utm_source=partner-link&utm_medium=website&utm_campaign=1662"
                    altText="Doordash Logo"
                />
            </div>

            <div class='col-md-1'></div>
        </div>
    </div>
    <div class='col-lg-1'></div>
</div>