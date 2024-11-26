"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import { Category, Product } from "@/app/types/types";
import { CarouselProductCard } from "./CarouselProductCard";

export const ProductsCarousel = ({
	categories,
	products,
	title,
	icon,
}: {
	title: string;
	icon?: React.ReactNode;
	categories: Category[];
	products: Product[];
}) => {
	const getProductCategory = (product: Product) => {
		const category = categories.find(
			(category) => category.id === parseInt(product.category_id)
		)!;

		return category;
	};

	return (
		<div className="my-8">
			<h2 className="text-xl flex flex-row items-center gap-2 w-full border-b pb-6 border-alternative/20  lg:text-2xl  font-bold mb-8  text-alternative">
				{icon}
				{title}
			</h2>
			<Carousel
				opts={{
					loop: true,
				}}
				className="w-full"
			>
				<CarouselContent>
					{products.map((product, index) => (
						<CarouselItem
							key={index}
							className="basis-1/2 md:basis-1/3 lg:basis-1/5"
						>
							<CarouselProductCard
								product={product}
								category={getProductCategory(product)}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="left-2  border-0 bg-transparent" />
				<CarouselNext className="right-2  border-0" />
			</Carousel>
		</div>
	);
};
