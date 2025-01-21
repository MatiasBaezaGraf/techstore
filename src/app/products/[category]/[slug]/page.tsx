import { Product } from "@/app/types/types";
import { createClient } from "@/app/utils/server";
import { ProductView } from "@/components/individualProduct/ProductView";
import { baseUrl } from "@/lib/utils";
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

		if (error || data.length === 0) {
			redirect("/search");
		}

		return data[0];
	}

	async function getCategories() {
		"use server";

		const response = await fetch(`${baseUrl}/api/categories`, {
			cache: "force-cache",
			next: {
				tags: ["categories"],
			},
		});

		return response.json();
	}

	async function getCategoryProducts() {
		"use server";

		const response = await fetch(`${baseUrl}/api/products`, {
			cache: "force-cache",
			next: {
				tags: ["products"],
			},
		});

		const data: Product[] = await response.json();

		return data.filter((product) => product.show === true);
	}

	async function getDollarRate() {
		"use server";

		const response = await fetch(`${baseUrl}/api/dollar`, {
			cache: "force-cache",
			next: {
				tags: ["dollar"],
			},
		});

		return response.json();
	}

	return (
		<ProductView
			productSlug={slug}
			getProduct={getProduct}
			getCategories={getCategories}
			getCategoryProducts={getCategoryProducts}
			getDollarRate={getDollarRate}
		/>
	);
}
