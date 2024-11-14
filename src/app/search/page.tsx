import { SearchView } from "@/components/search/SearchView";
import { createClient } from "../utils/server";

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
		<SearchView
			fetchProducts={fetchProducts}
			fetchCategories={fetchCategories}
		/>
	);
}
