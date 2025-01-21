"use client";

import { Category, HomeLink, Product } from "@/app/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "../general/Logo";
import { SearchInputForm } from "../general/SearchInputForm";
import { Button } from "../ui/button";
import {
	Cable,
	Gamepad2,
	Laptop,
	LayoutGrid,
	LogIn,
	RefreshCcw,
	Star,
	Tablet,
	TabletSmartphone,
	Tag,
} from "lucide-react";
import { LinksBar } from "./LinksBar";
import { CategoriesCarousel } from "./CategoriesCarousel";
import { ProductsCarousel } from "./ProductsCarousel";
import { InfoCards } from "./InfoCards";
import { DesktopHomeSkeleton } from "./DesktopHomeSkeleton";

const iconMap = {
	Laptop,
	Tablet,
	TabletSmartphone,
	Gamepad2,
	Cable,
};

export const HomeView = ({
	fetchProducts,
	fetchCategories,
	fetchDollarRate,
}: {
	fetchProducts: ({
		categoryId,
		highlighted,
	}: {
		categoryId?: string;
		highlighted?: boolean;
	}) => Promise<Product[]>;
	fetchCategories: () => Promise<Category[]>;
	fetchDollarRate: () => Promise<number>;
}) => {
	const [highlightedProducts, setHighlightedProducts] = useState<
		Product[] | null
	>(null);
	const [smartphones, setSmartphones] = useState<Product[] | null>(null);
	const [computers, setComputers] = useState<Product[] | null>(null);
	const [categories, setCategories] = useState<Category[] | null>(null);
	const [dollarRate, setDollarRate] = useState<number | null>(null);
	const [categoryLinks, setCategoryLinks] = useState<HomeLink[] | null>(null);

	useEffect(() => {
		fetchProducts({ highlighted: true }).then(setHighlightedProducts);
		fetchProducts({ categoryId: "1" }).then(setSmartphones);
		fetchProducts({ categoryId: "2" }).then(setComputers);
		fetchDollarRate().then(setDollarRate);
		fetchCategories().then((categories) => {
			setCategories(categories);
			const categoryLinks: HomeLink[] = categories.map((category: Category) => {
				const IconElement = iconMap[category.icon];

				return {
					title: category.name,
					url: `/search?category_id=${category.id}`,
					icon: <IconElement size={22} />,
				};
			});

			setCategoryLinks(categoryLinks);
		});
	}, []);

	if (
		highlightedProducts == null ||
		smartphones == null ||
		computers == null ||
		!categoryLinks ||
		!categories ||
		!dollarRate
		// true
	)
		return (
			<div className=" flex flex-col gap-3 w-full max-w-[1160px] mx-auto">
				<div>
					<DesktopHomeSkeleton />
				</div>
			</div>
		);

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
					dollarRate={dollarRate}
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
					dollarRate={dollarRate}
				/>
			</div>

			<div className="px-3">
				<ProductsCarousel
					title="Computadoras"
					icon={<Laptop size={24} />}
					categories={categories}
					products={computers}
					dollarRate={dollarRate}
				/>
			</div>
		</div>
	);
};
