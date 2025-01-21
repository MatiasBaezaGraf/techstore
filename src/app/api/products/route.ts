import { createClient } from "@/app/utils/server";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const fetchProducts = async () => {
			const supabase = await createClient();
			const { data, error } = await supabase.from("products").select("*");

			if (error) {
				throw error;
			}
			return data;
		};

		const products = await fetchProducts();

		return NextResponse.json(products);
	} catch (error) {
		return NextResponse.json(
			{
				error: `Error al obtener los productos: ${error}`,
			},
			{ status: 500 }
		);
	}
}
