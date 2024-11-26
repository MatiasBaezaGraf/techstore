import { SidebarMenu } from "./SidebarMenu";
import { Logo } from "../general/Logo";
import { createClient } from "@/app/utils/server";
import Link from "next/link";

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
		<div className="w-full fixed top-0 h-16 z-50 flex flex-row justify-between items-center md:hidden bg-secondary">
			<div className="flex flex-row justify-between w-full items-center p-3 mx-auto max-w-[1160px] ">
				<SidebarMenu fetchCategories={fetchCategories} />
				<Link href="/" className="flex items-center gap-2">
					<Logo />
				</Link>
			</div>
		</div>
	);
};
