"use client";

import { Category, Product } from "@/app/types/types";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { SearchInputForm } from "../general/SearchInputForm";

export const ProductView = ({
	productSlug,
	getProduct,
	getCategory,
}: {
	productSlug: string;
	getProduct: (slug: string) => Promise<Product>;
	getCategory: () => Promise<Category>;
}) => {
	const cdnUrl = process.env.NEXT_PUBLIC_SUPABASE_CDN_URL;
	const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

	const [product, setProduct] = useState<Product | null>(null);
	const [category, setCategory] = useState<Category | null>(null);

	// Construir el mensaje de WhatsApp
	const generateWhatsAppLink = () => {
		const message = `Hola, estoy interesado en el producto "${
			product!.name
		}". Puedes encontrarlo aquí: ${baseUrl}/products/${category!.name}/${
			product!.slug
		}`;
		return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
			message
		)}`;
	};

	useEffect(() => {
		getProduct(productSlug).then((data) => setProduct(data));
		getCategory().then((data) => setCategory(data));
	}, [productSlug]);

	if (!product || !category)
		return (
			<div className="container mx-auto p-4 flex flex-col gap-3 py-8 min-h-withNav justify-start items-start  ">
				<div className="bg-secondary-light w-full mb-3 h-10 animate-pulse rounded"></div>
				<div className="bg-secondary-light w-full mb-3 aspect-square animate-pulse rounded"></div>
				<div className="bg-secondary-light w-1/3 h-4 animate-pulse rounded"></div>
				<div className="bg-secondary-light w-2/3 h-6 animate-pulse rounded"></div>
				<div className="bg-secondary-light w-1/5 h-6 animate-pulse rounded"></div>
				<div className="bg-secondary-light w-1/2 h-6 animate-pulse rounded mb-3"></div>
				<div className="bg-secondary-light w-full h-10 animate-pulse rounded"></div>
			</div>
		);

	return (
		<div className="container min-h-withNav mx-auto px-4 py-8">
			<div className="mb-8">
				<SearchInputForm />
			</div>
			<div className="space-y-6 sm:space-y-8">
				<Carousel className="w-full max-w-md mx-auto">
					<CarouselContent>
						{/* {product.images.map((src, index) => ( */}
						<CarouselItem>
							<div className="relative aspect-square">
								<Image
									src={`${cdnUrl}/productImages/${product.imageName}`}
									alt={`${product.name}`}
									layout="fill"
									objectFit="cover"
									className="rounded-lg shadow-black shadow-lg border border-neutral-500"
								/>
							</div>
						</CarouselItem>
						{/* ))} */}
					</CarouselContent>
					<CarouselPrevious className="hidden sm:flex" />
					<CarouselNext className="hidden sm:flex" />
				</Carousel>

				<div className="space-y">
					<span className="text-sm text-neutral-400">
						<Link href={`/home`}>Inicio</Link> /{" "}
						<Link href={`/search?category_id=${category?.id}`}>
							{category?.name}
						</Link>{" "}
						/
					</span>
					<h1 className="text-2xl sm:text-3xl font-bold text-alternative mb-3">
						{product.name}
					</h1>
					<p className="text-2xl font-semibold text-accent mb-3">
						U$ {product.price}
					</p>
					<div className="flex flex-wrap gap-2 mb-3">
						<Badge
							variant={product.new ? "accent" : "secondary"}
							className="text-sm"
						>
							{product.new ? "Nuevo" : "Reacondicionado"}
						</Badge>
						<Badge
							variant={product.available ? "secondary" : "default"}
							className="text-sm"
						>
							{product.available ? "Entrega inmediata" : "A pedido"}
						</Badge>
					</div>
					<p className="text-alternative/80 text-sm sm:text-base mb-8">
						{product.description}
					</p>
					<Link
						className="mt-auto"
						href={generateWhatsAppLink()}
						target="_blank"
					>
						<Button className="w-full sm:w-auto text-base border-accent border">
							<MessageCircle className="mr-1" />
							Consultar por este producto
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
