"use client";

import { Category } from "@/app/types/types";
import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export const CategoriesCarousel = ({
	fetchCategories,
}: {
	fetchCategories: () => Promise<Category[]>;
}) => {
	const cdnUrl = process.env.NEXT_PUBLIC_SUPABASE_CDN_URL;

	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const getAndSetCategories = async () => {
			const categories = await fetchCategories();

			setCategories(categories);
		};

		getAndSetCategories();
	}, []);

	if (categories.length === 0) {
		return (
			<div className="mt-4">
				<h2 className="text-xl font-bold  mb-2 text-alternative">Categorías</h2>
				<div className="container mx-auto p-4 flex flex-col h-[200px] bg-secondary-light rounded-lg justify-center items-center  ">
					<Loader2 size={50} className="mx-auto animate-spin text-accent" />
				</div>
			</div>
		);
	}

	return (
		<>
			<h2 className="text-xl font-bold  mb-2 text-alternative">Categorías</h2>
			<Carousel
				opts={{
					loop: true,
				}}
				className="w-full"
			>
				<CarouselContent>
					{categories.map((category, index) => (
						<CarouselItem key={index} className="basis-full">
							<div className="relative h-52 w-full rounded-lg">
								<Image
									src={cdnUrl + "/categoryImages/" + category.imageName}
									alt={category.name}
									layout="fill"
									objectFit="cover"
									className="rounded-lg"
								/>
								<div className="absolute inset-0 bg-black border border-neutral-700 rounded-lg bg-opacity-40 flex items-center justify-center">
									<h3 className="text-white text-2xl font-bold">
										{category.name}
									</h3>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="left-2  border-0" />
				<CarouselNext className="right-2  border-0" />
			</Carousel>
		</>
	);
};
