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
import Link from "next/link";

export const CategoriesCarousel = ({
	categories,
}: {
	categories: Category[];
}) => {
	const cdnUrl = process.env.NEXT_PUBLIC_SUPABASE_CDN_URL;

	return (
		<>
			<h2 className="text-xl  lg:text-2xl font-bold  mb-2 lg:mb-4  text-alternative">
				Categorías destacadas
			</h2>
			<Carousel
				opts={{
					loop: true,
				}}
				className="w-full"
			>
				<CarouselContent>
					{categories.map((category, index) => (
						<CarouselItem
							key={index}
							className="basis-full md:basis-1/2 lg:basis-full"
						>
							<div className="relative h-52 lg:h-96 w-full rounded-lg transform duration-200 hover:scale-[1.01] hover:border-primary">
								<Link href={`/search?category_id=${category.id}`}>
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
								</Link>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="left-2  border-0 bg-transparent text-alternative" />
				<CarouselNext className="right-2  border-0 bg-transparent text-alternative" />
			</Carousel>
		</>
	);
};
