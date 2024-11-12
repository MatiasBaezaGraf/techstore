import { ProductsDashboard } from "@/components/products/ProductsDashboard";
import { createClient } from "../utils/server";
import { Product } from "../types/types";

export default async function DashboardPage() {
	const supabase = await createClient();

	const { data, error } = await supabase.from("products").select("*");

	async function updateProductAvailable(product: Product) {
		"use server";

		const supabase = await createClient();

		const productToUpdate = {
			available: !product.available,
		};

		const { data, error } = await supabase
			.from("products")
			.update(productToUpdate)
			.eq("id", product.id);

		if (error) {
			throw error;
		}
	}

	return (
		<ProductsDashboard
			fetchedProducts={data}
			updateProductAvailable={updateProductAvailable}
		/>
	);
}
