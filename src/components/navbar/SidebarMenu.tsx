"use client";

import Image from "next/image";

import { ChevronLeft, Laptop, Menu, Smartphone } from "lucide-react";
import { Button } from "../ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetOverlay,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { H1 } from "../ui/typography";
import { Logo } from "../general/Logo";

export const SidebarMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const categorias = [
		{
			icon: Smartphone,
			name: "Smartphones",
		},
		{
			icon: Laptop,
			name: "Computadoras",
		},
	];

	return (
		<Sheet open={isOpen}>
			<SheetTrigger
				onClick={() => setIsOpen(true)}
				className="hover:bg-white/5"
			>
				{/* <Button
					variant="outline"
					size="icon"
					className="fixed z-50 bg-transparent"
				> */}
				<Menu className="h-8 w-8 text-accent" />
				<span className="sr-only">Abrir menú</span>
				{/* </Button> */}
			</SheetTrigger>
			<SheetContent
				side="left"
				className="w-full sm:w-[400px] p-5 bg-secondary-dark border border-accent"
			>
				<div className="flex flex-row items-center justify-between sp ">
					<SheetTitle className="text-2xl flex items-center gap-4 font-bold text-alternative">
						<Logo />
						Categorías
					</SheetTitle>
					<Button
						variant="ghost"
						onClick={() => setIsOpen(false)}
						className="hover:bg-white/5"
					>
						<ChevronLeft className="h-6 w-6 text-accent" />
					</Button>
				</div>

				<ScrollArea className="h-full mt-6 rounded-md border border-accent p-2 ">
					<nav>
						<ul className="">
							{categorias.map((categoria, index) => (
								<li key={index}>
									<Button
										variant="ghost"
										className="w-full justify-start text-base text-alternative"
									>
										<categoria.icon className="mr-2 h-5 w-5" />
										{categoria.name}
									</Button>
								</li>
							))}
						</ul>
					</nav>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
};
