"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { House, Power } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

export const DashboardNavbar = ({
	user,
	onLogOut,
}: {
	user: User | null;
	onLogOut: () => void;
}) => {
	return (
		<div className="w-full fixed top-0 h-14 z-50 flex flex-row justify-between items-center py-3  bg-white border-b border-neutral-300/80">
			<div className="w-full max-w-[1160px] flex flex-row items-center justify-between mx-auto px-4 ">
				<div className="flex flex-row items-center gap-4">
					<Link href="/home">
						<Button
							variant="outline"
							className="hover:border-secondary/70 text-secondary/70"
						>
							<House className="h-4 w-4 md:mr-2" />
							<span className="hidden md:block">Inicio</span>
						</Button>
					</Link>
					<span className="text-sm text-secondary/60 hidden md:block">
						{user?.email}
					</span>
				</div>
				<span className="text-sm text-secondary/60 md:hidden">
					{user?.email}
				</span>
				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant="outline"
							className="hover:border-red-600 text-red-600 hover:text-red-700"
						>
							<Power className="h-4 w-4 md:mr-2" />
							<span className="hidden md:block">Cerrar</span>
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Confirmar cierre de sesión</DialogTitle>
							<DialogDescription>
								¿Estás seguro que deseas cerrar sesión?
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<DialogClose asChild>
								<Button onClick={() => onLogOut()}>Confirmar</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};
