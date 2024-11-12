import { NewProductForm } from "@/components/products/NewProductForm";

import { createClient } from "@/app/utils/server";
import { redirect } from "next/navigation";

export default function NewProductPage() {
	async function insertProduct(product: {
		name: string;
		description: string;
		price: number;
		category: string;
		image?: File;
		show: boolean;
		available: boolean;
	}) {
		"use server";

		const supabase = await createClient();

		const productToInsert = {
			name: product.name,
			description: product.description,
			price: product.price,
			category: product.category,
			imageName: product.image?.name || "",
			show: product.show,
		};

		const { data: productInserted, error: productError } = await supabase
			.from("products")
			.insert([productToInsert]);

		if (productError) {
			throw productError;
		}

		if (product.image) {
			const { data: imageInserted, error: imageError } = await supabase.storage
				.from("productImages")
				.upload(product.image.name, product.image);

			if (imageError) {
				throw imageError;
			}
		}
	}

	return <NewProductForm insertProduct={insertProduct} />;
}
