import type {Product} from "$lib/types.js";

export const DEFAULT_PRODUCT: Product = {
    product_id: -1,
    product_type_id: ["default"],
    product_name: "Default Product",
    price: 0,
    description: "This is a default product description.",
    image_url: "/images/dehydrated-foods/Bliss-Bar.jpg",
    active: 1,
};