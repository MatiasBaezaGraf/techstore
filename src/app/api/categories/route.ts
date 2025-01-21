import { createClient } from "@/app/utils/server";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const fetchCategories = async () => {
			const supabase = await createClient();
			const { data, error } = await supabase.from("categories").select("*");

			if (error) {
				throw error;
			}
			return data;
		};

		const categories = await fetchCategories();

		return NextResponse.json(categories);
	} catch (error) {
		return {
			status: 500,
			body: {
				error: "Error al obtener las categorías",
			},
		};
	}
}
