import { SidebarMenu } from "./SidebarMenu";
import { Logo } from "../general/Logo";
import { createClient } from "@/app/utils/server";

export const Navbar = () => {
	async function fetchCategories() {
		"use server";

		const supabase = await createClient();

		const { data, error } = await supabase.from("categories").select("*");

		if (error) {
			throw error;
		}

		return data;
	}
	//Navbar transparente
	return (
		<div className="w-full fixed top-0 h-16 z-50 flex flex-row justify-between items-center p-3 bg-secondary-dark">
			<SidebarMenu fetchCategories={fetchCategories} />
			<Logo />
		</div>
	);
};
