import { SearchView } from "@/components/search/SearchView";
import { createClient } from "../utils/server";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function SearchPage() {
	async function fetchProducts() {
		"use server";

		const supabase = await createClient();

		const { data, error } = await supabase.from("products").select("*");

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
		<Suspense
			fallback={
				<div className="container mx-auto p-4 flex flex-col min-h-withNav justify-center items-center  ">
					<Loader2 size={50} className="mx-auto animate-spin text-primary" />
					<span className="text-base text-neutral-500 mt-4">
						Cargando página
					</span>
				</div>
			}
		>
			<SearchView
				fetchProducts={fetchProducts}
				fetchCategories={fetchCategories}
			/>
		</Suspense>
	);
}
