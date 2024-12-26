// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		type Product = {
			product_id: number;
			product_type_id: number;
			type_description: string;
			product_name: string;
			price: number;
			description: string;
			imageUrl?: string | null;
			active: boolean;
		};
	}
}

export {};
