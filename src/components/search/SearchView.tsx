"use client";

import {
	Category,
	Filters,
	HomeLink,
	Pagination as PaginationType,
	Product,
	Sorting,
} from "@/app/types/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PaginationControls } from "./PaginationControls";
import { ProductsRepeater } from "./ProductsRepeater";
import { FiltersBar } from "./FiltersBar";
import { SortingBar } from "./SortingBar";
import {
	Gamepad2,
	Laptop,
	RefreshCcw,
	Search,
	Tablet,
	TabletSmartphone,
	Tag,
} from "lucide-react";
import { Input } from "../ui/input";
import { LinksBar } from "../home/LinksBar";
import { Logo } from "../general/Logo";
import { FiltersOrderSidebar } from "./FiltersOrderSidebar";

const iconMap = {
	Laptop,
	Tablet,
	TabletSmartphone,
	Gamepad2,
};

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
		limit: 12,
		totalPages: 0,
		pageItems: [],
	});

	const categoryLinks: HomeLink[] =
		categories?.map((category: Category) => {
			const IconElement = iconMap[category.icon];

			return {
				title: category.name,
				url: `/search?category_id=${category.id}`,
				icon: <IconElement size={22} />,
			};
		}) || [];

	useEffect(() => {
		fetchProducts().then((data) => {
			//Setear todos los productos
			setProducts(data);
			//Filtrar los productos segun los filtros iniciales
			const filteredCalculatedProducts = data.filter((product) => {
				const categoryName = categories?.find(
					(category) => category.id === parseInt(product.category_id)
				)?.name;

				// Busca en el nombre, la descripción del producto y en el nombre de la categoría
				const matchesName =
					!filters.name ||
					product.name.toLowerCase().includes(filters.name.toLowerCase()) ||
					product.description
						.toLowerCase()
						.includes(filters.name.toLowerCase()) ||
					categoryName?.toLowerCase().includes(filters.name.toLowerCase()); // Buscar en el nombre de la categoría

				const matchesCategory =
					!filters.category_id ||
					product.category_id.toString().includes(filters.category_id);

				const matchesPrice =
					(!filters.priceMin || product.price >= filters.priceMin) &&
					(!filters.priceMax || product.price <= filters.priceMax);

				const matchesNew =
					filters.new === undefined || product.new === filters.new;
				const matchesAvailable =
					filters.available === undefined ||
					product.available === filters.available;

				return (
					matchesName &&
					matchesPrice &&
					matchesNew &&
					matchesAvailable &&
					matchesCategory
				);
			});

			const filteredAndSortedCalculatedProducts =
				filteredCalculatedProducts.sort((a, b) => {
					if (sorting.sortBy === "price") {
						return sorting.sortDirection === "asc"
							? a.price - b.price
							: b.price - a.price;
					}

					if (sorting.sortBy === "new") {
						return sorting.sortDirection === "desc"
							? Number(b.new) - Number(a.new) // Primero los `new: true`
							: Number(a.new) - Number(b.new); // Primero los `new: false`
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
					const categoryName = categories?.find(
						(category) => category.id === parseInt(product.category_id)
					)?.name;

					// Busca en el nombre, la descripción del producto y en el nombre de la categoría
					const matchesName =
						!filters.name ||
						product.name.toLowerCase().includes(filters.name.toLowerCase()) ||
						product.description
							.toLowerCase()
							.includes(filters.name.toLowerCase()) ||
						categoryName?.toLowerCase().includes(filters.name.toLowerCase()); // Buscar en el nombre de la categoría

					const matchesPrice =
						(!filters.priceMin || product.price >= filters.priceMin) &&
						(!filters.priceMax || product.price <= filters.priceMax);

					const matchesCategory =
						!filters.category_id ||
						product.category_id.toString().includes(filters.category_id);

					const matchesNew =
						filters.new === undefined || product.new === filters.new;
					const matchesAvailable =
						filters.available === undefined ||
						product.available === filters.available;

					return (
						matchesName &&
						matchesPrice &&
						matchesNew &&
						matchesAvailable &&
						matchesCategory
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

						if (sorting.sortBy === "new") {
							return sorting.sortDirection === "desc"
								? Number(b.new) - Number(a.new) // Primero los `new: true`
								: Number(a.new) - Number(b.new); // Primero los `new: false`
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

	useEffect(() => {
		// Solo los parámetros relevantes para los filtros
		const updatedFilters: Filters = {
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
		};

		setSorting({
			sortBy: searchParams.get("sortBy") ?? undefined,
			sortDirection: searchParams.get("sortDirection") ?? undefined,
		});
		// Actualiza únicamente los filtros
		setFilters(updatedFilters);
	}, [
		searchParams.get("name"),
		searchParams.get("category_id"),
		searchParams.get("priceMin"),
		searchParams.get("priceMax"),
		searchParams.get("new"),
		searchParams.get("available"),
	]);

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

	const updateSearchParams = (updates: Record<string, string | undefined>) => {
		// Obtiene todos los parámetros actuales
		const currentParams = new URLSearchParams(searchParams.toString());

		// Aplica las actualizaciones
		Object.entries(updates).forEach(([key, value]) => {
			if (value === undefined) {
				currentParams.delete(key); // Elimina el parámetro si es undefined
			} else {
				currentParams.set(key, value);
			}
		});

		// Empuja la nueva URL
		router.push(`/search?${currentParams.toString()}`);
	};

	const handleFiltersChange = (
		attribute: string,
		value: string | boolean | undefined
	) => {
		if (attribute === "name") {
			// Si el filtro es `name`, resetea los demás filtros
			setFilters({
				name: value ? String(value) : undefined,
				category_id: undefined,
				priceMin: undefined,
				priceMax: undefined,
				new: undefined,
				available: undefined,
			});

			// Actualiza los parámetros en la URL para reflejar el cambio
			updateSearchParams({
				name: value ? String(value) : undefined,
				category_id: undefined,
				priceMin: undefined,
				priceMax: undefined,
				new: undefined,
				available: undefined,
			});
		} else {
			// Si no es el filtro `name`, actualiza normalmente
			setFilters((prev) => ({
				...prev,
				[attribute]: value,
			}));

			// Actualiza solo el filtro correspondiente en la URL
			updateSearchParams({
				[attribute]: value !== undefined ? String(value) : undefined,
			});
		}
	};

	const handleSortingChange = (sorting: {
		sortBy: string;
		sortDirection: string;
	}) => {
		setSorting((prev) => ({
			...prev,
			...sorting, // Actualiza ambos valores: sortBy y sortDirection
		}));

		// Actualiza los parámetros de búsqueda con ambos valores
		updateSearchParams(sorting);
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
		// if (true)
		return (
			<div className="container mx-auto p-4 flex flex-col gap-3 min-h-withNav justify-center items-center  ">
				<div className="bg-secondary-light w-full h-10 animate-pulse rounded"></div>
				<div className="w-full flex flex-row gap-3">
					<div className="bg-secondary-light w-full h-10 animate-pulse rounded"></div>
					<div className="bg-secondary-light w-full h-10 animate-pulse rounded"></div>
				</div>
				<div className="w-full flex flex-col gap-3 mt-3">
					<div className="w-full flex flex-row gap-3">
						<div className=" bg-secondary-light w-full h-80 animate-pulse rounded"></div>
						<div className=" bg-secondary-light w-full h-80 animate-pulse rounded"></div>
					</div>
					<div className="w-full flex flex-row gap-3">
						<div className="bg-secondary-light w-full h-80 animate-pulse rounded"></div>
						<div className="bg-secondary-light w-full h-80 animate-pulse rounded"></div>
					</div>
					<div className="w-full flex flex-row gap-3">
						<div className="bg-secondary-light w-full h-80 animate-pulse rounded"></div>
						<div className="bg-secondary-light w-full h-80 animate-pulse rounded"></div>
					</div>
				</div>
				<div className="w-full flex flex-row justify-center gap-3 mt-8">
					<div className="bg-secondary-light h-10 aspect-square animate-pulse rounded"></div>
					<div className="bg-secondary-light h-10 aspect-square  animate-pulse rounded"></div>
					<div className="bg-secondary-light h-10 aspect-square  animate-pulse rounded"></div>
				</div>
			</div>
		);

	return (
		<div className="min-h-withNav p-3 md:p-0 flex w-full max-w-[1160px] mx-auto  flex-col ">
			<div className="flex flex-row items-center w-full pt-4  ">
				<Link href="/" className="hidden md:block">
					<Logo size={40} />
				</Link>

				<div className="relative  w-full mx-auto max-w-2xl">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
					<Input
						onChange={(e) => handleFiltersChange("name", e.target.value)}
						type="search"
						placeholder="Buscar productos..."
						className="w-full pl-10   bg-secondary-light border-accent text-alternative placeholder-neutral-400 focus:border-accent"
					/>
				</div>
				<div className="w-[160px] hidden md:block" />
			</div>
			<div className="hidden md:flex flex-row gap-3 mb-10">
				<LinksBar
					links={[
						{
							title: "Nuevos",
							url: "/search?new=true",
							icon: <Tag size={22} />,
						},
						{
							title: "Renovados",
							url: "/search?new=false",
							icon: <RefreshCcw size={22} />,
						},
						...categoryLinks,
					]}
				/>
			</div>

			<div className="flex flex-row gap-3 mb-3 md:hidden">
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

			{filters.name && (
				<h2 className="text-xl md:text-3xl font-normal text-primary/70 mb-8 flex flex-row gap-2">
					<span className="hidden md:block">
						Resultados de la búsqueda por:
					</span>{" "}
					<span className="font-semibold">{filters.name}</span>
				</h2>
			)}

			<div className="mb-8 md:flex md:flex-row md:gap-5 flex-1">
				<div className="hidden md:flex w-[20%]">
					<FiltersOrderSidebar
						filters={filters}
						sorting={sorting}
						handleFiltersChange={handleFiltersChange}
						categories={categories}
						cleanFiltersAndSorting={cleanFiltersAndSorting}
						handleSortingChange={handleSortingChange}
					/>
				</div>

				<div className="w-full flex flex-col justify-between md:w-[80%] flex-1">
					<ProductsRepeater
						products={pagination.pageItems}
						categories={categories}
					/>

					<div className="hidden md:block mt-8">
						<PaginationControls
							pagination={pagination}
							handlePageChange={handlePageChange}
						/>
					</div>
				</div>
			</div>

			<div className="mt-auto md:hidden">
				<PaginationControls
					pagination={pagination}
					handlePageChange={handlePageChange}
				/>
			</div>
		</div>
	);
};
