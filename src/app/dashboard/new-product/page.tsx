import { NewProductForm } from "@/components/products/NewProductForm";

import { createClient } from "@/app/utils/server";
import { ProductToInsert } from "@/app/types/types";
import { revalidateTag } from "next/cache";
import { baseUrl } from "@/lib/utils";

export default function NewProductPage() {
	async function insertProduct(product: ProductToInsert) {
		"use server";

		const supabase = await createClient();

		const productToInsert = {
			name: product.name,
			description: product.description,
			price: product.price,
			stock: product.stock,
			category_id: product.category_id,
			imageName: product.image?.name || "",
			show: product.show,
			available: product.available,
			new: product.new,
			highlighted: product.highlighted,
			slug:
				product.name
					.replace(/[^a-zA-Z0-9\s]/g, "") // Elimina todos los caracteres especiales excepto letras, números y espacios.
					.replace(/\s+/g, "_") // Reemplaza los espacios por guiones bajos.
					.toLowerCase() +
				"_" +
				Math.random().toString(36).substring(7),
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

		revalidateTag("products");
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

	return (
		<NewProductForm
			insertProduct={insertProduct}
			fetchCategories={fetchCategories}
		/>
	);
}
