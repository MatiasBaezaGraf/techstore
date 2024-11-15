import { NewProductForm } from "@/components/products/NewProductForm";

import { createClient } from "@/app/utils/server";

export default function NewProductPage() {
	async function insertProduct(product: {
		name: string;
		description: string;
		price: number;
		category_id: string;
		image?: File;
		show: boolean;
		available: boolean;
		new: boolean;
		highlighted: boolean;
	}) {
		"use server";

		const supabase = await createClient();

		const productToInsert = {
			name: product.name,
			description: product.description,
			price: product.price,
			category_id: product.category_id,
			imageName: product.image?.name || "",
			show: product.show,
			available: product.available,
			new: product.new,
			highlighted: product.highlighted,
		};

		const { error: productError } = await supabase
			.from("products")
			.insert([productToInsert]);

		if (productError) {
			throw productError;
		}

		if (product.image) {
			const { error: imageError } = await supabase.storage
				.from("productImages")
				.upload(product.image.name, product.image);

			if (imageError) {
				throw imageError;
			}
		}
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

	return (
		<NewProductForm
			insertProduct={insertProduct}
			fetchCategories={fetchCategories}
		/>
	);
}
