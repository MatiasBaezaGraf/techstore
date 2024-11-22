"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
	ChevronLeft,
	ChevronRight,
	Filter,
	Loader2,
	Plus,
	Search,
	XIcon,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../../ui/sheet";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";
import { Category, Filters, Product } from "@/app/types/types";
import { ProductsTable } from "./ProductsTable";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/components/ui/pagination";

export const ProductsDashboard = ({
	fetchProducts,
	fetchCategories,
	updateProductShow,
	deleteProduct,
}: {
	fetchProducts: () => Promise<Product[]>;
	fetchCategories: () => Promise<Category[]>;
	updateProductShow: (product: Product) => void;
	deleteProduct: (product: Product) => void;
}) => {
	const [fetchedProducts, setFetchedProducts] = useState<Product[] | null>(
		null
	);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [filters, setFilters] = useState<Filters>({
		name: "",
		category_id: "",
		visibility: null,
	});

	// Paginación
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 10;

	// Aplicar filtros
	const applyFilters = () => {
		const filtered = fetchedProducts?.filter((product) => {
			const name = product.name.toLowerCase();
			const category_id = product.category_id.toString();
			const visibility = product.show;

			return (
				(!filters.name || name.includes(filters.name.toLowerCase())) &&
				(!filters.category_id || category_id === filters.category_id) &&
				(filters.visibility === null || visibility === filters.visibility)
			);
		});
		setFilteredProducts(filtered || []);
		setCurrentPage(1); // Reiniciar a la página 1 al aplicar filtros
	};

	// Obtener productos paginados
	const getPaginatedProducts = () => {
		const startIndex = (currentPage - 1) * productsPerPage;
		return filteredProducts.slice(startIndex, startIndex + productsPerPage);
	};

	// Manejo de eliminación de producto
	const onDeleteProduct = async (product: Product) => {
		await deleteProduct(product);
		setFetchedProducts(
			(prev) => prev?.filter((p) => p.id !== product.id) || null
		);
	};

	const getVisibleRange = () => {
		const start = (currentPage - 1) * productsPerPage + 1;
		const end = Math.min(
			currentPage * productsPerPage,
			filteredProducts.length
		);
		return `${start}-${end}`;
	};

	// Cargar productos y categorías al inicio
	useEffect(() => {
		const getAndSetProducts = async () => {
			const products = await fetchProducts();
			setFetchedProducts(products);
			setFilteredProducts(products);
		};

		const getAndSetCategories = async () => {
			const categories = await fetchCategories();
			setCategories(categories);
		};

		getAndSetProducts();
		getAndSetCategories();
	}, []);

	// Reaplicar filtros cuando cambien
	useEffect(() => {
		applyFilters();
	}, [filters, fetchedProducts]);

	if (!fetchedProducts)
		return (
			<div className="container mx-auto p-4 flex flex-col h-screen justify-center items-center">
				<Loader2 size={50} className="mx-auto animate-spin" />
				<span className="text-base text-neutral-500 mt-4">
					Obteniendo los productos
				</span>
			</div>
		);

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
				<div
					className={`flex items-center mb-4 w-fit border rounded-md ${
						filters.category_id || filters.visibility || filters.name
							? "border-secondary"
							: ""
					}`}
				>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className={`h-10 ${
								filters.category_id || filters.visibility || filters.name
									? "rounded-r-none"
									: ""
							}`}
						>
							<Filter className="mr-2 h-4 w-4" /> Filtros
						</Button>
					</SheetTrigger>
					{(filters.category_id || filters.visibility || filters.name) && (
						<Button
							variant="ghost"
							onClick={() =>
								setFilters({ name: "", category_id: "", visibility: null })
							}
							className="h-10 rounded-l-none"
						>
							<XIcon size={5} />
						</Button>
					)}
				</div>
				<SheetContent side="left" className="min-h-screen">
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
								value={
									filters.category_id === "" ? "todas" : filters.category_id
								}
								onValueChange={(value) =>
									setFilters((prev) => ({
										...prev,
										category_id: value === "todas" ? "" : value,
									}))
								}
							>
								<SelectTrigger id="categoria">
									<SelectValue placeholder="Selecciona una categoría" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="todas">Todas</SelectItem>
									{categories.map((category) => (
										<SelectItem
											key={category.id}
											value={category.id.toString()}
										>
											{category.name}
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
								onValueChange={(value) =>
									setFilters((prev) => ({
										...prev,
										visibility: value === "todos" ? null : value === "visible",
									}))
								}
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
					<SheetClose asChild>
						<Button
							onClick={() =>
								setFilters({ name: "", category_id: "", visibility: null })
							}
							variant="outline"
							className="w-full mt-2"
						>
							Limpiar Filtros
						</Button>
					</SheetClose>
				</SheetContent>
			</Sheet>

			<div className="flex flex-col border items-end rounded-md">
				<Pagination className="w-fit mx-0">
					<PaginationContent className="text-sm">
						<span className="text-secondary/70">
							{getVisibleRange()} de {filteredProducts.length}
						</span>
						<PaginationItem>
							<Button
								variant="ghost"
								size="sm"
								disabled={currentPage === 1}
								onClick={() => setCurrentPage((prev) => prev - 1)}
							>
								<ChevronLeft className="h-4 w-4" />
							</Button>
						</PaginationItem>
						{/* MOSTRAR LA CANTIDAD DE PRODUCTOS */}
						<PaginationItem>
							<Button
								variant="ghost"
								size="sm"
								disabled={
									currentPage ===
									Math.ceil(filteredProducts.length / productsPerPage)
								}
								onClick={() => setCurrentPage((prev) => prev + 1)}
							>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</PaginationItem>
					</PaginationContent>
				</Pagination>

				<ProductsTable
					products={getPaginatedProducts()}
					categories={categories}
					updateProductShow={updateProductShow}
					deleteProduct={onDeleteProduct}
				/>

				<Pagination className="w-fit mx-0">
					<PaginationContent className="text-sm">
						<span className="text-secondary/70">
							{getVisibleRange()} de {filteredProducts.length}
						</span>
						<PaginationItem>
							<Button
								variant="ghost"
								size="sm"
								disabled={currentPage === 1}
								onClick={() => setCurrentPage((prev) => prev - 1)}
							>
								<ChevronLeft className="h-4 w-4" />
							</Button>
						</PaginationItem>
						{/* MOSTRAR LA CANTIDAD DE PRODUCTOS */}
						<PaginationItem>
							<Button
								variant="ghost"
								size="sm"
								disabled={
									currentPage ===
									Math.ceil(filteredProducts.length / productsPerPage)
								}
								onClick={() => setCurrentPage((prev) => prev + 1)}
							>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
};
