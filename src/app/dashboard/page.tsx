import { ProductsDashboard } from "@/components/products/dashboard/ProductsDashboard";
import { createClient } from "../utils/server";
import { Product } from "../types/types";
import { revalidatePath, revalidateTag } from "next/cache";
import { baseUrl } from "@/lib/utils";

export default async function DashboardPage() {
	async function fetchProducts() {
		"use server";

		const response = await fetch(`${baseUrl}/api/products`, {
			cache: "force-cache",
			next: {
				tags: ["products"],
			},
		});

		const data: Product[] = await response.json();

		return data.reverse();
	}

	async function fetchCategories() {
		"use server";

		const response = await fetch(`${baseUrl}/api/categories`, {
			cache: "force-cache",
			next: {
				tags: ["categories"],
			},
		});

		return response.json();
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

		revalidateTag("products");
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

		revalidateTag("products");
		revalidatePath("/dashboard");
	}

	async function fetchDollarRate() {
		"use server";

		const response = await fetch(`${baseUrl}/api/dollar`, {
			cache: "force-cache",
			next: {
				tags: ["dollar"],
			},
		});

		return response.json();
	}

	async function updateDollarRate(rate: number) {
		"use server";

		const supabase = await createClient();

		const { error } = await supabase
			.from("settings")
			.update({ value: rate })
			.eq("name", "dollar_value");

		if (error) {
			throw error;
		}

		revalidateTag("dollar");

		return rate;
	}

	return (
		<ProductsDashboard
			fetchProducts={fetchProducts}
			fetchCategories={fetchCategories}
			fetchDollarRate={fetchDollarRate}
			updateProductShow={updateProductShow}
			updateDollarRate={updateDollarRate}
			deleteProduct={deleteProduct}
		/>
	);
}
