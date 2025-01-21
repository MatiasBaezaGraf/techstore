import { SearchView } from "@/components/search/SearchView";
import { Suspense } from "react";
import { Product } from "../types/types";
import { baseUrl } from "@/lib/utils";

export default function SearchPage() {
	async function fetchProducts() {
		"use server";

		const response = await fetch(`${baseUrl}/api/products`, {
			cache: "force-cache",
			next: {
				tags: ["products"],
			},
		});

		const data: Product[] = await response.json();

		return data.filter((product) => product.show === true);
	}

	async function fetchCategories() {
		"use server";

		const response = await fetch(`${baseUrl}/api/categories`, {
			cache: "force-cache",
			next: {
				tags: ["categories"],
			},
		});

		return response.json();
	}

	async function fetchDollarRate() {
		"use server";

		const response = await fetch(`${baseUrl}/api/dollar`, {
			cache: "force-cache",
			next: {
				tags: ["dollar"],
			},
		});

		return response.json();
	}

	return (
		<Suspense
			fallback={
				<div className="container mx-auto p-4 flex flex-col gap-3 min-h-withNav justify-center items-center  ">
					<div className="bg-secondary-light w-full h-10 animate-pulse rounded"></div>
					<div className="w-full flex flex-row gap-3">
						<div className="bg-secondary-light w-full h-10 animate-pulse rounded"></div>
						<div className="bg-secondary-light w-full h-10 animate-pulse rounded"></div>
					</div>
					<div className="w-full flex flex-col gap-3 mt-3">
						<div className="w-full flex flex-row gap-3">
							<div className=" bg-secondary-light w-full h-80 animate-pulse rounded"></div>
							<div className=" bg-secondary-light w-full h-80 animate-pulse rounded"></div>
						</div>
						<div className="w-full flex flex-row gap-3">
							<div className="bg-secondary-light w-full h-80 animate-pulse rounded"></div>
							<div className="bg-secondary-light w-full h-80 animate-pulse rounded"></div>
						</div>
						<div className="w-full flex flex-row gap-3">
							<div className="bg-secondary-light w-full h-80 animate-pulse rounded"></div>
							<div className="bg-secondary-light w-full h-80 animate-pulse rounded"></div>
						</div>
					</div>
					<div className="w-full flex flex-row justify-center gap-3 mt-8">
						<div className="bg-secondary-light h-10 aspect-square animate-pulse rounded"></div>
						<div className="bg-secondary-light h-10 aspect-square  animate-pulse rounded"></div>
						<div className="bg-secondary-light h-10 aspect-square  animate-pulse rounded"></div>
					</div>
				</div>
			}
		>
			<SearchView
				fetchProducts={fetchProducts}
				fetchCategories={fetchCategories}
				fetchDollarRate={fetchDollarRate}
			/>
		</Suspense>
	);
}
