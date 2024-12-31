export type Product = {
    product_id?: number;
    product_type_id: string[]; // Ensure it is always an array of strings
    product_name?: string;
    price?: number;
    description?: string;
    image_url?: string;
    active?: number;
};

export type CartProduct = {
    id: string,
    product: Product;
    quantity: number;
}
