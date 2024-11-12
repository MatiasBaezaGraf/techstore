"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
	Edit,
	Filter,
	ImageOff,
	Loader2,
	Plus,
	Search,
	Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Filters, Product } from "@/app/types/types";
import { ProductDashboardCard } from "./ProductDashboardCard";

export const ProductsDashboard = ({
	fetchedProducts,
	updateProductAvailable,
}: {
	fetchedProducts: Product[] | null;
	updateProductAvailable: any;
}) => {
	const [products, setProducts] = useState<Product[] | null>(null);

	const [filters, setFilters] = useState<Filters>({
		name: "",
		category: "",
		visibility: null,
	});

	useEffect(() => {
		if (fetchedProducts) {
			setProducts(products);
		}
	}, [fetchedProducts]);

	useEffect(() => {
		let filteredProducts = fetchedProducts?.filter((product) => {
			let name = product.name.toLowerCase();
			let category = product.category.toLowerCase();
			let visibility = product.show;

			return (
				name.includes(filters.name.toLowerCase()) &&
				category.includes(filters.category.toLowerCase()) &&
				(filters.visibility === null || visibility === filters.visibility)
			);
		});

		setProducts(filteredProducts || []);
	}, [filters]);

	if (!products)
		return (
			<div className="container mx-auto p-4 flex flex-col h-screen justify-center items-center  ">
				<Loader2 size={50} className="mx-auto animate-spin" />
				<span className="text-base text-neutral-500 mt-4">
					Obteniendo los productos
				</span>
			</div>
		);

	const categorias = [
		"Todas",
		...new Set(fetchedProducts?.map((p) => p.category)),
	];

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Productos</h1>
				<Link href="/dashboard/new-product">
					<Button size="sm">
						<Plus className="mr-2 h-4 w-4" /> Agregar
					</Button>
				</Link>
			</div>

			<div className="mb-4">
				<div className="relative">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Buscar productos..."
						value={filters.name}
						onChange={(e) =>
							setFilters((prev) => ({ ...prev, name: e.target.value }))
						}
						className="pl-8"
					/>
				</div>
			</div>

			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="sm" className="mb-4">
						<Filter className="mr-2 h-4 w-4" /> Filtros
					</Button>
				</SheetTrigger>
				<SheetContent side="bottom" className="h-[80vh]">
					<SheetHeader>
						<SheetTitle>Filtros</SheetTitle>
						<SheetDescription>
							Ajusta los filtros para encontrar los productos que buscas.
						</SheetDescription>
					</SheetHeader>
					<div className="py-4 space-y-4">
						<div>
							<Label htmlFor="categoria">Categoría</Label>
							<Select
								value={filters.category === "" ? "todos" : filters.category}
								onValueChange={(value) => {
									setFilters((prev) => ({
										...prev,
										category: value === "todos" ? "" : value,
									}));
								}}
							>
								<SelectTrigger id="categoria">
									<SelectValue placeholder="Selecciona una categoría" />
								</SelectTrigger>
								<SelectContent>
									{categorias.map((categoria) => (
										<SelectItem key={categoria} value={categoria}>
											{categoria}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div>
							<Label htmlFor="visibilidad">Visibilidad</Label>
							<Select
								value={
									filters.visibility === null
										? "todos"
										: filters.visibility
										? "visible"
										: "oculto"
								}
								onValueChange={(value) => {
									if (value === "todos")
										setFilters((prev) => ({ ...prev, visibility: null }));
									else
										setFilters((prev) => ({
											...prev,
											visibility: value === "visible",
										}));
								}}
							>
								<SelectTrigger id="visibilidad">
									<SelectValue placeholder="Selecciona visibilidad" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="todos">Todos</SelectItem>
									<SelectItem value="visible">Visible</SelectItem>
									<SelectItem value="oculto">Oculto</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<SheetClose asChild>
						<Button className="w-full mt-4">Aplicar Filtros</Button>
					</SheetClose>
				</SheetContent>

				<div className="space-y-4">
					{products.map((product) => (
						<ProductDashboardCard
							key={product.id}
							product={product}
							updateProductAvailable={updateProductAvailable}
						/>
					))}
				</div>
			</Sheet>
		</div>
	);
};
