import { SearchView } from "@/components/search/SearchView";
import { createClient } from "../utils/server";
import { Suspense } from "react";

export default function SearchPage() {
	async function fetchProducts() {
		"use server";

		const supabase = await createClient();

		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("show", true);

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

	async function fetchDollarRate() {
		"use server";

		const supabase = await createClient();

		const { data, error } = await supabase
			.from("settings")
			.select("*")
			.eq("name", "dollar_value");

		if (error) {
			throw error;
		}

		return data[0].value;
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
