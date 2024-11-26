import { createClient } from "../utils/server";
import { ProductsCarousel } from "@/components/home/ProductsCarousel";
import { CategoriesCarousel } from "@/components/home/CategoriesCarousel";
import { SearchInputForm } from "@/components/general/SearchInputForm";
import { Logo } from "@/components/general/Logo";
import { Laptop, Smartphone } from "lucide-react";
import { InfoCards } from "@/components/home/InfoCards";

export default async function HomePage() {
	// Fetch destacado productos
	const fetchHighlightedProducts = async ({
		categoryId,
		highlighted,
	}: {
		categoryId?: string;
		highlighted?: boolean;
	}) => {
		const supabase = await createClient();
		const { data, error } = await supabase.from("products").select("*");

		if (error) {
			throw error;
		}

		// Aplicar los filtros
		let filteredData = data || [];

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

	// Fetch categorías
	const fetchCategories = async () => {
		const supabase = await createClient();
		const { data, error } = await supabase.from("categories").select("*");

		if (error) {
			throw error;
		}
		return data;
	};

	// Ejecutar fetch de datos en paralelo
	const [highlightedProducts, smartphones, computers, categories] =
		await Promise.all([
			fetchHighlightedProducts({ highlighted: true }),
			fetchHighlightedProducts({ categoryId: "1" }),
			fetchHighlightedProducts({ categoryId: "2" }),
			fetchCategories(),
		]);

	return (
		<div className=" flex flex-col gap-3 w-full max-w-[1160px] mx-auto">
			<div className="flex flex-row items-center pt-4 ">
				<div className="hidden md:block">
					<Logo size={40} />
				</div>
				<div className="py-4 px-3 max-w-2xl w-full mx-auto ">
					<SearchInputForm />
				</div>
				<div className="w-[160px] hidden md:block" />
			</div>

			{/* Carrusel de categorías */}
			<div className="mt-4 px-3">
				<CategoriesCarousel categories={categories} />
			</div>

			{/* Carrusel de productos destacados */}
			<div className="px-3">
				<ProductsCarousel
					title="Productos destacados"
					categories={categories}
					products={highlightedProducts}
				/>
			</div>

			<div className="px-3">
				<InfoCards />
			</div>

			<div className="px-3">
				<ProductsCarousel
					title="Smartphones"
					icon={<Smartphone size={24} />}
					categories={categories}
					products={smartphones}
				/>
			</div>

			<div className="px-3">
				<ProductsCarousel
					title="Computadoras"
					icon={<Laptop size={24} />}
					categories={categories}
					products={computers}
				/>
			</div>
		</div>
	);
}
