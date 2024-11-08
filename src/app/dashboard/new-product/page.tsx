import { NewProductForm } from "@/components/products/NewProductForm";
import { revalidatePath } from "next/cache";

import { createClient } from "@/app/utils/server";

export default function NewProductPage() {
	async function insertProduct(product: {
		name: string;
		description: string;
		price: number;
		category: string;
		image: string;
		show: boolean;
	}) {
		"use server";

		const supabase = await createClient();

		const { data, error } = await supabase.from("products").insert([product]);

		console.log(data);

		if (error) {
			throw error;
		}

		// Revalida la página para que se muestren los datos actualizados
		revalidatePath("/products");
	}

	return <NewProductForm insertProduct={insertProduct} />;
}
