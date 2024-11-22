import { DashboardNavbar } from "@/components/navbar/DashboardNavbar";
import { createClient } from "../utils/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = await createClient();

	const { data } = await supabase.auth.getUser();

	async function logOut() {
		"use server";

		const supabase = await createClient();

		await supabase.auth.signOut();

		redirect("/home");
	}

	return (
		<div className="flex flex-col bg-neutral-100 min-h-screen">
			<DashboardNavbar user={data.user} onLogOut={logOut} />
			<div className="mt-14">{children}</div>
		</div>
	);
}
