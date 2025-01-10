<script>
    import OrderAppItem from '$lib/home/OrderAppItem.svelte';
  </script>
  
  <div class="flex flex-col min-h-[10vh] bg-raw-green">
    <!-- Spacer for margins -->
    <div class="flex justify-center">
      <div class="grid grid-cols-5 gap-4 py-5 w-10/12">
        <OrderAppItem
          imageSource="images/main-menu/orderingApps/caviar.jpg"
          hrefLink="https://www.trycaviar.com/store/chicago-raw-chicago-398254/?cav_medium=widget&cav_source=mer-hM4weg-1CYrig-mDVnlN9A&groups=f_online__d_restaurant_partners__p_widget__c_18741&utm_campaign=398254&utm_content=18741&utm_medium=website&utm_source=partner-link&utm_term=chicago"
          altText="Caviar Logo"
        />
        <OrderAppItem
          imageSource="images/main-menu/orderingApps/ritual.jpg"
          hrefLink="https://order.ritual.co/menu/chicago-raw-dearborn-huron-chicago/037g"
          altText="Ritual Logo"
        />
        <OrderAppItem
          imageSource="images/main-menu/orderingApps/order-online.jpg"
          hrefLink="https://chicagorawfood.square.site/"
          altText="Order Online Logo"
        />
        <OrderAppItem
          imageSource="images/main-menu/orderingApps/postmates.jpg"
          hrefLink="https://postmates.com/store/chicago-raw-river-north/wom9hiOWTmWlX5n9qCV5WA"
          altText="Postmates Logo"
        />
        <OrderAppItem
          imageSource="images/main-menu/orderingApps/doordash.jpg"
          hrefLink="https://www.doordash.com/business/1662/?utm_source=partner-link&utm_medium=website&utm_campaign=1662"
          altText="Doordash Logo"
        />
        
      </div>
    </div>
  </div>
  