"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { Power } from "lucide-react";

export const DashboardNavbar = ({
	user,
	onLogOut,
}: {
	user: User | null;
	onLogOut: () => void;
}) => {
	return (
		<div className="w-full fixed top-0 h-14 z-50 flex flex-row justify-between items-center py-3  bg-white border-b border-neutral-300/80">
			<div className="w-full max-w-[1536px] flex flex-row items-center justify-between mx-auto px-4 ">
				<span className="text-sm text-secondary/60">{user?.email}</span>
				<Button
					variant="outline"
					className="hover:border-red-600"
					onClick={() => onLogOut()}
				>
					<Power className="h-4 w-4 mr-2" />
					Cerrar sesión
				</Button>
			</div>
		</div>
	);
};
