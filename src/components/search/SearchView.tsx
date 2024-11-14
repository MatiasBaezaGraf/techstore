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
		limit: 2,
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
		const applyFilters = () => {
			if (products) {
				const filteredCalculatedProducts = products!.filter((product) => {
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

				console.log(
					Math.ceil(filteredCalculatedProducts.length / pagination.limit)
				);

				setFilteredProducts(filteredCalculatedProducts);
				setPagination({
					...pagination,
					page: 1,
					totalPages: Math.ceil(
						filteredCalculatedProducts.length / pagination.limit
					),
					pageItems: filteredCalculatedProducts.slice(0, pagination.limit),
				});
			}
		};

		applyFilters();
	}, [filters]);

	useEffect(() => {
		const applySorting = () => {
			if (filteredProducts) {
				const sortedProducts = filteredProducts.sort((a, b) => {
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

				setFilteredProducts(sortedProducts);
				setPagination({
					...pagination,
					page: 1,
					totalPages: Math.ceil(sortedProducts.length / pagination.limit),
					pageItems: sortedProducts.slice(0, pagination.limit),
				});
			}
		};

		applySorting();
	}, [sorting]);

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

	if (!products || !categories) return <div>Cargando...</div>;

	return (
		<div className="min-h-screen p-3">
			<div className="flex flex-row  gap-3">
				<FiltersBar
					filters={filters}
					handleFiltersChange={handleFiltersChange}
					categories={categories}
				/>
				<SortingBar
					sorting={sorting}
					handleSortingChange={handleSortingChange}
				/>
			</div>

			<ProductsRepeater products={pagination.pageItems} />

			<div className="mt-8">
				<PaginationControls
					pagination={pagination}
					handlePageChange={handlePageChange}
				/>
			</div>
		</div>
	);
};
