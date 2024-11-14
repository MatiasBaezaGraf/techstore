import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Instagram, Search } from "lucide-react";
import { createClient } from "../utils/server";
import { HighlightedProductsCarousel } from "@/components/home/HighlightedProductsCarousel";
import Link from "next/link";
import { CategoriesCarousel } from "@/components/home/CategoriesCarousel";

const categorias = [
	{ nombre: "Smartphones", imagen: "/smartphones.png" },
	{ nombre: "Laptops", imagen: "/laptops.png" },
];

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

			<footer className="mt-16 text-alternative py-2 border-t border-accent bg-secondary-light">
				<div className="container mx-auto px-4">
					<div className="flex flex-col items-center md:flex-row md:justify-between">
						<div className="">
							<Image
								src="/logoTransparent.png"
								alt="Logo de la tienda"
								width={150}
								height={60}
								objectFit="contain"
							/>
						</div>
						<div className="flex space-x-6">
							<Link
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Síguenos en Instagram"
							>
								<Instagram className="w-6 h-6 text-white hover:text-green-500 transition-colors" />
							</Link>
						</div>
					</div>
					<div className="mt-8 text-center text-sm text-gray-400">
						<p>&copy; {new Date().getFullYear()} Techstore</p>
						{/* <div className="mt-2 space-x-4">
            <Link href="/terminos" className="hover:text-green-500 transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/privacidad" className="hover:text-green-500 transition-colors">
              Política de Privacidad
            </Link>
          </div> */}
					</div>
				</div>
			</footer>
		</div>
	);
}
