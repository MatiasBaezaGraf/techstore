import { createClient } from "@/app/utils/server";
import { ProductView } from "@/components/search/ProductView";
import { redirect } from "next/navigation";

export type Params = Promise<{ slug: string; category: string }>;

export default async function ProductPage({ params }: { params: Params }) {
	const { slug, category } = await params;

	async function getProduct(slug: string) {
		"use server";

		const supabase = await createClient();

		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("slug", slug);

		if (error) {
			redirect("/search");
		}

		return data[0];
	}

	async function getCategory() {
		"use server";

		const supabase = await createClient();

		const { data, error } = await supabase
			.from("categories")
			.select("*")
			.eq("name", category);

		if (error) {
			redirect("/search");
		}

		return data[0];
	}

	return (
		<ProductView
			productSlug={slug}
			getProduct={getProduct}
			getCategory={getCategory}
		/>
	);
}
