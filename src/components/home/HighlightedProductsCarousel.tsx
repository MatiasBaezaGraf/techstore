"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

import { useEffect, useState } from "react";
import { Product } from "@/app/types/types";
import { HighlightedProductCard } from "./HighlightedProductCard";
import { Loader2 } from "lucide-react";

export const HighlightedProductsCarousel = ({
	fetchHighlightedProducts,
}: {
	fetchHighlightedProducts: () => Promise<Product[]>;
}) => {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		fetchHighlightedProducts().then((data) => {
			setProducts(data);
		});
	}, []);

	if (products.length === 0) {
		return (
			<div className="mt-4">
				<h2 className="text-xl font-bold  mb-2 text-alternative">
					Productos destacados
				</h2>
				<div className="container mx-auto p-4 flex flex-col h-[250px] bg-secondary-light rounded-lg justify-center items-center  ">
					<Loader2 size={50} className="mx-auto animate-spin text-accent" />
				</div>
			</div>
		);
	}

	return (
		<div className="mt-4">
			<h2 className="text-xl font-bold  mb-2 text-alternative">
				Productos destacados
			</h2>
			<Carousel
				opts={{
					loop: true,
				}}
				className="w-full"
			>
				<CarouselContent>
					{products.map((product, index) => (
						<CarouselItem key={index} className="basis-1/2">
							<HighlightedProductCard product={product} />
						</CarouselItem>
					))}
				</CarouselContent>
				{/* <CarouselPrevious className="left-2  border-0 bg-transparent" />
				<CarouselNext className="right-2  border-0" /> */}
			</Carousel>
		</div>
	);
};
