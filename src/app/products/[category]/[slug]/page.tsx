import { createClient } from "@/app/utils/server";
import { ProductView } from "@/components/individualProduct/ProductView";
import { redirect } from "next/navigation";

export type Params = Promise<{ slug: string; category: string }>;

export default async function ProductPage({ params }: { params: Params }) {
	const { slug } = await params;

	async function getProduct(slug: string) {
		"use server";

		const supabase = await createClient();

		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("slug", slug)
			.eq("show", true);

		if (error) {
			redirect("/search");
		}

		return data[0];
	}

	async function getCategories() {
		"use server";

		const supabase = await createClient();

		const { data, error } = await supabase.from("categories").select("*");

		if (error) {
			redirect("/search");
		}

		return data;
	}

	async function getCategoryProducts() {
		"use server";

		const supabase = await createClient();

		// Realiza un join entre productos y categorías para buscar por nombre de categoría
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("show", true); // Incluye el campo `name` de `categories`

		if (error) {
			redirect("/search");
		}

		return data;
	}

	return (
		<ProductView
			productSlug={slug}
			getProduct={getProduct}
			getCategories={getCategories}
			getCategoryProducts={getCategoryProducts}
		/>
	);
}
