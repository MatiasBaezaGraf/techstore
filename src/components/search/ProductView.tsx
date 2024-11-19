"use client";

import { Category, Product } from "@/app/types/types";
import { Loader2, MessageCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
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

	const [product, setProduct] = useState<Product | null>(null);
	const [category, setCategory] = useState<Category | null>(null);

	useEffect(() => {
		getProduct(productSlug).then((data) => setProduct(data));
		getCategory().then((data) => setCategory(data));
	}, [productSlug]);

	if (!product || !category)
		return (
			<div className="container mx-auto p-4 flex flex-col min-h-withNav justify-center items-center  ">
				<Loader2 size={50} className="mx-auto animate-spin text-primary" />
				<span className="text-base text-neutral-500 mt-4">
					Obteniendo el producto
				</span>
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
					<Button className="w-full sm:w-auto text-base border-accent border">
						<MessageCircle className="mr-1" />
						Consultar por este producto
					</Button>
				</div>
			</div>
		</div>
	);
};
