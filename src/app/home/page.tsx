import { Product } from "../types/types";
import { baseUrl } from "@/lib/utils";
import { HomeView } from "@/components/home/HomeView";

export default async function HomePage() {
	// Fetch destacado productos
	const fetchHighlightedProducts = async ({
		categoryId,
		highlighted,
	}: {
		categoryId?: string;
		highlighted?: boolean;
	}) => {
		"use server";

		const response = await fetch(`${baseUrl}/api/products`, {
			cache: "force-cache",
			next: {
				tags: ["products"],
			},
		});

		const data: Product[] = await response.json();

		// Aplicar los filtros
		let filteredData = data || [];

		// Usar solo los productos que tienen show = true
		filteredData = filteredData.filter((product) => product.show === true);

		if (categoryId) {
			filteredData = filteredData.filter(
				(product) => product.category_id.toString() === categoryId
			);
		}

		if (highlighted) {
			filteredData = filteredData.filter(
				(product) => product.highlighted === highlighted
			);
		}

		return filteredData;
	};

	const fetchDollarRate = async () => {
		"use server";

		const response = await fetch(`${baseUrl}/api/dollar`, {
			cache: "force-cache",
			next: {
				tags: ["dollar"],
			},
		});

		return response.json();
	};

	const fetchCategories = async () => {
		"use server";

		const response = await fetch(`${baseUrl}/api/categories`, {
			cache: "force-cache",
			next: {
				tags: ["categories"],
			},
		});

		return response.json();
	};

	return (
		<HomeView
			fetchProducts={fetchHighlightedProducts}
			fetchCategories={fetchCategories}
			fetchDollarRate={fetchDollarRate}
		/>
	);
}
