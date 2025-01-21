import { createClient } from "@/app/utils/server";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const fetchDollarRate = async () => {
			const supabase = await createClient();
			const { data, error } = await supabase
				.from("settings")
				.select("*")
				.eq("name", "dollar_value");

			if (error) {
				throw error;
			}

			return data[0].value;
		};

		const dollarRate = await fetchDollarRate();

		return NextResponse.json(dollarRate);
	} catch (error) {
		return NextResponse.json(
			{
				error: "Error al obtener la cotización del dólar",
			},
			{ status: 500 }
		);
	}
}
