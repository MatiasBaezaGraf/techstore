import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { createClient } from "../utils/server";
import { HighlightedProductsCarousel } from "@/components/home/HighlightedProductsCarousel";
import { CategoriesCarousel } from "@/components/home/CategoriesCarousel";

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
			<div className="py-4 px-4">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
					<Input
						type="search"
						placeholder="Buscar productos..."
						className="w-full pl-10 bg-secondary-light border-accent text-alternative placeholder-neutral-400 focus:border-accent"
					/>
				</div>
			</div>

			{/* Carrusel de categorías */}
			<div className="mt-4 px-4">
				<CategoriesCarousel fetchCategories={fetchCategories} />
			</div>

			{/* Carrusel de productos destacados */}
			<div className="px-4">
				<HighlightedProductsCarousel
					fetchHighlightedProducts={fetchHighlightedProducts}
				/>
			</div>
		</div>
	);
}
