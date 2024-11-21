import { createClient } from "../utils/server";
import { HighlightedProductsCarousel } from "@/components/home/HighlightedProductsCarousel";
import { CategoriesCarousel } from "@/components/home/CategoriesCarousel";
import { SearchInputForm } from "@/components/general/SearchInputForm";

export default function HomePage() {
	async function fetchHighlightedProducts() {
		"use server";

		const supabase = await createClient();

		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("highlighted", true);

		if (error) {
			throw error;
		}

		return data;
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
		<div className="min-h-screen flex flex-col gap-3 ">
			<div className="py-4 px-3">
				<SearchInputForm />
			</div>

			{/* Carrusel de categorías */}
			<div className="mt-4 px-3">
				<CategoriesCarousel fetchCategories={fetchCategories} />
			</div>

			{/* Carrusel de productos destacados */}
			<div className="px-3">
				<HighlightedProductsCarousel
					fetchHighlightedProducts={fetchHighlightedProducts}
					fetchCategories={fetchCategories}
				/>
			</div>
		</div>
	);
}
