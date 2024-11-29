import { createClient } from "../utils/server";
import { ProductsCarousel } from "@/components/home/ProductsCarousel";
import { CategoriesCarousel } from "@/components/home/CategoriesCarousel";
import { SearchInputForm } from "@/components/general/SearchInputForm";
import { Logo } from "@/components/general/Logo";
import {
	Laptop,
	RefreshCcw,
	Gamepad2,
	Tablet,
	Star,
	TabletSmartphone,
	Tag,
	LayoutGrid,
	LogIn,
} from "lucide-react";
import { InfoCards } from "@/components/home/InfoCards";
import Link from "next/link";
import { LinksBar } from "@/components/home/LinksBar";
import { Category, HomeLink } from "../types/types";
import { Button } from "@/components/ui/button";

const iconMap = {
	Laptop,
	Tablet,
	TabletSmartphone,
	Gamepad2,
};

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
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("show", true);

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

	const categoryLinks: HomeLink[] = categories.map((category: Category) => {
		const IconElement = iconMap[category.icon];

		return {
			title: category.name,
			url: `/search?category_id=${category.id}`,
			icon: <IconElement size={22} />,
		};
	});

	return (
		<div className=" flex flex-col gap-3 w-full max-w-[1160px] mx-auto">
			<div className="flex flex-col  w-full pt-0 md:py-4">
				<div className="flex flex-row items-center pt-4 md:pt-0 ">
					<Link href="/" className="hidden md:block">
						<Logo size={40} />
					</Link>
					<div className="py-4 md:px-0 px-3 max-w-2xl w-full mx-auto ">
						<SearchInputForm />
					</div>
					<div className="w-[160px] hidden md:block text-right">
						<Link href={`/login`}>
							<Button
								variant="ghost"
								className=" text-alternative hover:bg-secondary-dark/40 hover:text-alternative"
							>
								<LogIn className="mr-2" />
								Iniciar sesión
							</Button>
						</Link>
					</div>
				</div>

				<div className="hidden md:flex flex-row gap-3">
					<LinksBar
						links={[
							{
								title: "Tienda",
								url: "/search",
								icon: <LayoutGrid size={22} />,
							},
							{
								title: "Nuevos",
								url: "/search?new=true",
								icon: <Tag size={22} />,
							},
							{
								title: "Renovados",
								url: "/search?new=false",
								icon: <RefreshCcw size={22} />,
							},
							...categoryLinks,
						]}
					/>
				</div>
			</div>

			{/* Carrusel de categorías */}
			<div className="mt-4 px-3">
				<CategoriesCarousel categories={categories} />
			</div>

			{/* Carrusel de productos destacados */}
			<div className="px-3">
				<ProductsCarousel
					title="Productos destacados"
					icon={<Star size={24} />}
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
					icon={<TabletSmartphone size={24} />}
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
