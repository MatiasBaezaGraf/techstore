"use client";
import {
	ChevronLeft,
	Laptop,
	Menu,
	TabletSmartphone,
	Gamepad2,
	Tablet,
	Tag,
	RefreshCcw,
	House,
	LogIn,
} from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { Logo } from "../general/Logo";
import { Category } from "@/app/types/types";
import Link from "next/link";

export const iconMap = {
	Laptop,
	Tablet,
	TabletSmartphone,
	Gamepad2,
};

export const SidebarMenu = ({
	fetchCategories,
}: {
	fetchCategories: () => Promise<Category[]>;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		fetchCategories().then((data) => {
			setCategories(data);
		});
	}, []);

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

				<ScrollArea className="h-full mt-6 rounded-md border border-accent p-4 ">
					<nav>
						<ul className="flex flex-col gap-4">
							<li>
								<Link
									href={"/home"}
									onClick={() => setIsOpen(false)}
									className="w-full justify-start flex flex-row gap-2 p-1 text-base text-alternative bg-secondary-dark hover:bg-secondary"
								>
									<House />
									Inicio
								</Link>
							</li>
							{categories.length > 0
								? categories.map((category, index) => {
										const IconElement = iconMap[category.icon];

										return (
											<li key={index}>
												<Link
													onClick={() => setIsOpen(false)}
													href={`/search?category_id=${category.id}`}
													className="w-full flex flex-row gap-2 p-1 justify-start text-base text-alternative bg-secondary-dark hover:bg-secondary"
												>
													<IconElement />
													{category.name}
												</Link>
											</li>
										);
								  })
								: [1, 2, 3, 4].map((_, index) => (
										<li key={index}>
											<div className="bg-secondary-light h-8 mb-2 w-full rounded-md animate-pulse"></div>
										</li>
								  ))}
							<li>
								<Link
									onClick={() => setIsOpen(false)}
									href={"/search?new=true"}
									className="w-full justify-start flex flex-row gap-2 p-1 text-base text-alternative bg-secondary-dark hover:bg-secondary"
								>
									<Tag />
									Nuevos
								</Link>
							</li>
							<li>
								<Link
									onClick={() => setIsOpen(false)}
									href={"/search?new=false"}
									className="w-full justify-start flex flex-row gap-2 p-1 text-base text-alternative bg-secondary-dark hover:bg-secondary"
								>
									<RefreshCcw />
									Usados
								</Link>
							</li>
							<li>
								<Link
									onClick={() => setIsOpen(false)}
									href={"/login"}
									className="w-full justify-start flex flex-row gap-2 p-1 text-base text-alternative/50 bg-secondary-dark hover:bg-secondary"
								>
									<LogIn />
									Iniciar sesión
								</Link>
							</li>
						</ul>
					</nav>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
};
