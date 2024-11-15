import { ProductsDashboard } from "@/components/products/dashboard/ProductsDashboard";
import { createClient } from "../utils/server";
import { Product } from "../types/types";
import { revalidatePath } from "next/cache";

export default async function DashboardPage() {
	async function fetchProducts() {
		"use server";

		const supabase = await createClient();

		const { data, error } = await supabase.from("products").select("*");

		if (error) {
			throw error;
		}

		return data.reverse();
	}

	async function fetchCategories() {
		"use server";

		const supabase = await createClient();

		const { data, error } = await supabase.from("categories").select("*");

		if (error) {
			throw error;
		}

		return data;
	}

	async function updateProductShow(product: Product) {
		"use server";

		const supabase = await createClient();

		const productToUpdate = {
			show: !product.show,
		};

		const { error } = await supabase
			.from("products")
			.update(productToUpdate)
			.eq("id", product.id);

		if (error) {
			throw error;
		}
	}

	async function deleteProduct(product: Product) {
		"use server";

		const supabase = await createClient();

		const { data: productError, error } = await supabase
			.from("products")
			.delete()
			.eq("id", product.id);

		if (productError) {
			throw error;
		}

		if (product.imageName) {
			console.log("Deleting image from storage", product.imageName);
			// Remove the image from the storage

			await supabase.storage.from("productImages").remove([product.imageName]);
		}

		revalidatePath("/dashboard");
	}

	return (
		<ProductsDashboard
			fetchProducts={fetchProducts}
			fetchCategories={fetchCategories}
			updateProductShow={updateProductShow}
			deleteProduct={deleteProduct}
		/>
	);
}
