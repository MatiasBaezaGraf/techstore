"use client";

import { Category, Filters } from "@/app/types/types";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronDown, Filter, SlidersHorizontal } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

export const FiltersBar = ({
	filters,
	handleFiltersChange,
	categories,
}: {
	filters: Filters;
	handleFiltersChange: any;
	categories: Category[];
}) => {
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);

	return (
		<div className="flex justify-between items-center mb-4 w-full">
			<Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
				<SheetTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="w-full bg-secondary text-alternative border-secondary-light"
					>
						<span>Filtrar</span>
						<Filter className="h-4 w-4" />
					</Button>
				</SheetTrigger>
				<SheetContent
					side="bottom"
					className="bg-secondary text-white h-[80vh]"
				>
					<SheetHeader>
						<Button
							variant={"ghost"}
							className="w-full bg-secondary text-alternative  hover:bg-secondary-light hover:text-alternative"
							onClick={() => setIsFiltersOpen(false)}
						>
							<span className="sr-only">Cerrar</span>
							<ChevronDown className="h-6 w-6" />
						</Button>
						<SheetTitle className="text-white">Filtros</SheetTitle>
						<SheetDescription className="text-gray-400">
							Ajusta los filtros para refinar tu búsqueda
						</SheetDescription>
					</SheetHeader>
					<div className="space-y-6 py-4">
						<div className="space-y-2">
							<Label htmlFor="categoria">Categoría</Label>
							<Select
								value={filters.category_id}
								onValueChange={(value) =>
									handleFiltersChange(
										"category_id",
										value === "todas" ? undefined : value
									)
								}
							>
								<SelectTrigger
									id="categoria"
									className="w-full bg-secondary-light text-white border-gray-600"
								>
									<SelectValue placeholder="Todas las categorías" />
								</SelectTrigger>
								<SelectContent className="bg-secondary-light text-white border-gray-600">
									<SelectItem value={"todas"}>Todas las categorías</SelectItem>
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
						<div className="space-y-2">
							<Label htmlFor="estado">Estado</Label>
							<Select
								value={
									filters.new
										? "new"
										: filters.new === false
										? "refurbished"
										: "all"
								}
								onValueChange={(value) =>
									handleFiltersChange(
										"new",
										value === "new"
											? true
											: value === "refurbished"
											? false
											: undefined
									)
								}
							>
								<SelectTrigger
									id="estado"
									className="w-full bg-secondary-light text-white border-gray-600"
								>
									<SelectValue placeholder="Estado" />
								</SelectTrigger>
								<SelectContent className="bg-secondary-light text-white border-gray-600">
									<SelectItem value="all">Todos</SelectItem>
									<SelectItem value="new">Nuevo</SelectItem>
									<SelectItem value="refurbished">Reacondicionado</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center space-x-2">
							<Switch
								id="available"
								checked={filters.available}
								onCheckedChange={(checked) =>
									handleFiltersChange("available", checked ? true : undefined)
								}
							/>
							<label htmlFor="available">Disponibilidad inmediata</label>
						</div>
						{/* <div className="space-y-2">
							<Label htmlFor="price-range">Rango de precio</Label>
							<Slider
								id="price-range"
								min={0}
								max={1000}
								step={10}
								value={priceRange}
								onValueChange={setPriceRange}
								className="w-full"
							/>
							<div className="flex justify-between text-sm">
								<span>${priceRange[0]}</span>
								<span>${priceRange[1]}</span>
							</div>
						</div> */}
						<Button
							className="w-full bg-primary hover:bg-primary/80 text-white"
							onClick={() => setIsFiltersOpen(false)}
						>
							Aplicar
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
