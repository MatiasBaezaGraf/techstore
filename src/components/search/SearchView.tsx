"use client";

import {
	Category,
	Filters,
	Pagination as PaginationType,
	Product,
	Sorting,
} from "@/app/types/types";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PaginationControls } from "./PaginationControls";
import { ProductsRepeater } from "./ProductsRepeater";
import { FiltersBar } from "./FiltersBar";
import { SortingBar } from "./SortingBar";
import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";

export const SearchView = ({
	fetchProducts,
	fetchCategories,
}: {
	fetchProducts: () => Promise<Product[]>;
	fetchCategories: () => Promise<Category[]>;
}) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [products, setProducts] = useState<Product[] | null>(null);
	const [categories, setCategories] = useState<Category[] | null>(null);

	const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
		null
	);

	const [filters, setFilters] = useState<Filters>({
		name: searchParams.get("name") ?? undefined,
		category_id: searchParams.get("category_id") ?? undefined,
		priceMin: searchParams.get("priceMin")
			? parseInt(searchParams.get("priceMin")!)
			: undefined,
		priceMax: searchParams.get("priceMax")
			? parseInt(searchParams.get("priceMax")!)
			: undefined,
		new: searchParams.has("new")
			? searchParams.get("new") === "true"
			: undefined,
		available: searchParams.has("available")
			? searchParams.get("available") === "true"
			: undefined,
	});

	const [sorting, setSorting] = useState<Sorting>({
		sortBy: searchParams.get("sortBy") ?? undefined,
		sortDirection: searchParams.get("sortDirection") ?? undefined,
	});

	const [pagination, setPagination] = useState<PaginationType>({
		page: 1,
		limit: 6,
		totalPages: 0,
		pageItems: [],
	});

	useEffect(() => {
		fetchProducts().then((data) => {
			//Setear todos los productos
			setProducts(data);
			//Filtrar los productos segun los filtros iniciales
			const filteredCalculatedProducts = data.filter((product) => {
				return (
					(!filters.name ||
						product.name.toLowerCase().includes(filters.name.toLowerCase())) &&
					(!filters.category_id ||
						filters.category_id === "todas" ||
						parseInt(product.category_id) === parseInt(filters.category_id)) &&
					(!filters.priceMin || product.price >= filters.priceMin) &&
					(!filters.priceMax || product.price <= filters.priceMax) &&
					(filters.new === undefined || product.new === filters.new) &&
					(filters.available === undefined ||
						product.available === filters.available)
				);
			});

			const filteredAndSortedCalculatedProducts =
				filteredCalculatedProducts.sort((a, b) => {
					if (sorting.sortBy === "price") {
						return sorting.sortDirection === "asc"
							? a.price - b.price
							: b.price - a.price;
					}

					if (sorting.sortBy === "name") {
						return sorting.sortDirection === "asc"
							? a.name.localeCompare(b.name)
							: b.name.localeCompare(a.name);
					}

					return 0;
				});

			setFilteredProducts(filteredAndSortedCalculatedProducts);
			//Setear el total de paginas y los productos de la pagina actual
			setPagination({
				...pagination,
				totalPages: Math.ceil(
					filteredAndSortedCalculatedProducts.length / pagination.limit
				),
				pageItems: filteredAndSortedCalculatedProducts.slice(
					0,
					pagination.limit
				),
			});
		});

		fetchCategories().then((data) => {
			setCategories(data);
		});
	}, []);

	useEffect(() => {
		const applyFiltersAndSorting = () => {
			if (products) {
				// Filtrado
				const filteredCalculatedProducts = products.filter((product) => {
					return (
						(!filters.name ||
							product.name
								.toLowerCase()
								.includes(filters.name.toLowerCase())) &&
						(!filters.category_id ||
							filters.category_id === "todas" ||
							parseInt(product.category_id) ===
								parseInt(filters.category_id)) &&
						(!filters.priceMin || product.price >= filters.priceMin) &&
						(!filters.priceMax || product.price <= filters.priceMax) &&
						(filters.new === undefined || product.new === filters.new) &&
						(filters.available === undefined ||
							product.available === filters.available)
					);
				});

				// Ordenamiento
				const filteredAndSortedProducts = filteredCalculatedProducts.sort(
					(a, b) => {
						if (sorting.sortBy === "price") {
							return sorting.sortDirection === "asc"
								? a.price - b.price
								: b.price - a.price;
						}

						if (sorting.sortBy === "name") {
							return sorting.sortDirection === "asc"
								? a.name.localeCompare(b.name)
								: b.name.localeCompare(a.name);
						}

						return 0;
					}
				);

				// Actualización de productos filtrados y paginación
				setFilteredProducts(filteredAndSortedProducts);
				setPagination((prev) => ({
					...prev,
					page: 1,
					totalPages: Math.ceil(filteredAndSortedProducts.length / prev.limit),
					pageItems: filteredAndSortedProducts.slice(0, prev.limit),
				}));
			}
		};

		applyFiltersAndSorting();
	}, [filters, sorting, products, pagination.limit]);

	const handlePageChange = (newPage: number) => {
		if (newPage < 1 || newPage > pagination.totalPages) return;
		setPagination((prev) => ({
			...prev,
			page: newPage,
			pageItems:
				filteredProducts?.slice(
					(newPage - 1) * prev.limit,
					newPage * prev.limit
				) || [],
		}));
	};

	const handleFiltersChange = (attribute: string, value: any) => {
		setFilters((prev) => ({
			...prev,
			[attribute]: value,
		}));

		//Actualiza la URL con los filtros activos
		const newSearchParams = new URLSearchParams();

		// Recorre los filtros y añade a la URL solo aquellos que no son undefined
		const updatedFilters = { ...filters, [attribute]: value };
		Object.entries(updatedFilters).forEach(([key, val]) => {
			if (val !== undefined) {
				newSearchParams.set(key, String(val));
			}
		});

		// Empuja la nueva URL
		router.push(`/search?${newSearchParams.toString()}`);
	};

	const handleSortingChange = (attribute: string, value: any) => {
		setSorting((prev) => ({
			...prev,
			[attribute]: value,
		}));

		//Actualiza la URL con los filtros activos
		const newSearchParams = new URLSearchParams();

		// Recorre los filtros y añade a la URL solo aquellos que no son undefined
		const updatedSorting = { ...sorting, [attribute]: value };
		Object.entries(updatedSorting).forEach(([key, val]) => {
			if (val !== undefined) {
				newSearchParams.set(key, String(val));
			}
		});

		// Empuja la nueva URL
		router.push(`/search?${newSearchParams.toString()}`);
	};

	const cleanFiltersAndSorting = () => {
		// Limpia los estados de filtros y orden
		setFilters({
			name: undefined,
			category_id: undefined,
			priceMin: undefined,
			priceMax: undefined,
			new: undefined,
			available: undefined,
		});

		setSorting({
			sortBy: undefined,
			sortDirection: undefined,
		});

		// Actualiza la URL eliminando todos los parámetros
		router.push(`/search`);
	};

	if (!products || !categories)
		return (
			<div className="container mx-auto p-4 flex flex-col min-h-withNav justify-center items-center  ">
				<Loader2 size={50} className="mx-auto animate-spin text-primary" />
				<span className="text-base text-neutral-500 mt-4">
					Obteniendo los productos
				</span>
			</div>
		);

	return (
		<div className="min-h-withNav p-3 flex flex-col justify-between">
			<div className="relative mb-3">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
				<Input
					onChange={(e) => handleFiltersChange("name", e.target.value)}
					type="search"
					placeholder="Buscar productos..."
					className="w-full pl-10 bg-secondary-light border-accent text-alternative placeholder-neutral-400 focus:border-accent"
				/>
			</div>

			<div className="flex flex-row gap-3 mb-3">
				<FiltersBar
					filters={filters}
					handleFiltersChange={handleFiltersChange}
					categories={categories}
					cleanFilters={cleanFiltersAndSorting}
				/>
				<SortingBar
					sorting={sorting}
					handleSortingChange={handleSortingChange}
					cleanSorting={cleanFiltersAndSorting}
				/>
			</div>
			<h2 className="text-xl font-semibold text-primary/70 mb-3">
				{filters.name}
			</h2>

			<div className="mb-8">
				<ProductsRepeater products={pagination.pageItems} />
			</div>

			<div className="mt-auto">
				<PaginationControls
					pagination={pagination}
					handlePageChange={handlePageChange}
				/>
			</div>
		</div>
	);
};
