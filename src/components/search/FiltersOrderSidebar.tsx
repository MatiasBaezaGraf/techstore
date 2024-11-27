import { Category, Filters, Sorting } from "@/app/types/types";
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
} from "../ui/sidebar";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronDown, FilterX } from "lucide-react";
import { useState } from "react";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import { Label } from "../ui/label";

export const FiltersOrderSidebar = ({
	filters,
	sorting,
	handleFiltersChange,
	cleanFiltersAndSorting,
	categories,
	handleSortingChange,
}: {
	filters: Filters;
	sorting: Sorting;
	categories: Category[];
	cleanFiltersAndSorting: () => void;
	handleFiltersChange: (
		attribute: string,
		value: string | boolean | undefined
	) => void;
	handleSortingChange: (sorting: {
		sortBy: string;
		sortDirection: string;
	}) => void;
}) => {
	const [categoriesOpen, setCategoriesOpen] = useState(false);
	const [conditionOpen, setConditionOpen] = useState(false);

	return (
		<div className="flex flex-col text-alternative w-full">
			<SidebarHeader>
				<h2 className="text-xl font-semibold ">Filtros</h2>
				{(Object.values(filters).filter((value) => value).length > 0 ||
					sorting.sortBy) && (
					<Button
						variant="outline"
						size="icon"
						className="bg-secondary  hover:bg-secondary-dark hover:border-accent hover:text-alternative w-full"
						onClick={cleanFiltersAndSorting}
					>
						<FilterX className="h-4 w-4" />
						Limpiar filtros
					</Button>
				)}
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="text-lg font-semibold text-alternative px-0">
						Ordenar Por
					</SidebarGroupLabel>
					<SidebarGroupContent className="px-0 border-b border-alternative/20">
						<RadioGroup
							value={`${sorting.sortBy}-${sorting.sortDirection}`}
							onValueChange={(value) => {
								const [sortBy, sortDirection] = value.split("-");
								handleSortingChange({ sortBy, sortDirection });
							}}
							className="flex flex-col space-y-2 pb-8 pt-4 "
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="price-desc"
									id="price-desc"
									className="bg-alternative"
								/>
								<Label
									htmlFor="price-desc"
									className={`text-sm ${
										sorting.sortBy === "price" &&
										sorting.sortDirection === "desc"
											? "font-semibold text-accent"
											: "font-normal text-alternative"
									}`}
								>
									Mayor precio
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									className="bg-alternative"
									value="price-asc"
									id="price-asc"
								/>
								<Label
									htmlFor="price-asc"
									className={`text-sm ${
										sorting.sortBy === "price" &&
										sorting.sortDirection === "asc"
											? "font-semibold text-accent"
											: "font-normal text-alternative"
									}`}
								>
									Menor precio
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									className="bg-alternative"
									value="new-desc"
									id="new-desc"
								/>
								<Label
									htmlFor="new-desc"
									className={`text-sm ${
										sorting.sortBy === "new" && sorting.sortDirection === "desc"
											? "font-semibold text-accent"
											: "font-normal text-alternative"
									}`}
								>
									Mas nuevos
								</Label>
							</div>
						</RadioGroup>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupContent className="px-0 border-b border-alternative/20">
						<Collapsible className="pb-6 ">
							<CollapsibleTrigger
								onClick={() => setCategoriesOpen(!categoriesOpen)}
								className="text-lg font-semibold text-alternative px-0 w-full flex flex-row justify-between items-center"
							>
								Categoría
								<ChevronDown
									className={`h-5 w-5 text-alternative/60  ${
										categoriesOpen ? "transform rotate-180" : ""
									}`}
								/>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<RadioGroup
									value={filters.category_id}
									onValueChange={(value) =>
										handleFiltersChange("category_id", value)
									}
									className="flex flex-col space-y-2 pb-2 pt-4 "
								>
									{categories.map((category) => (
										<div
											key={category.id}
											className="flex items-center space-x-2"
										>
											<RadioGroupItem
												value={category.id.toString()}
												id={category.id.toString()}
												className="bg-alternative"
											/>
											<Label
												className={`text-sm ${
													filters.category_id === category.id.toString()
														? "font-semibold text-accent"
														: "font-normal text-alternative"
												}`}
												htmlFor={category.id.toString()}
											>
												{category.name}
											</Label>
										</div>
									))}
								</RadioGroup>
							</CollapsibleContent>
						</Collapsible>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupContent>
						<Collapsible className="pb-6 ">
							<CollapsibleTrigger
								onClick={() => setConditionOpen(!conditionOpen)}
								className="text-lg font-semibold text-alternative px-0 w-full flex flex-row justify-between items-center"
							>
								Condición
								<ChevronDown
									className={`h-5 w-5 text-alternative/60  ${
										conditionOpen ? "transform rotate-180" : ""
									}`}
								/>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<RadioGroup
									value={filters.new?.toString()}
									onValueChange={(value) => handleFiltersChange("new", value)}
									className="flex flex-col space-y-2 pb-2 pt-4 "
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="true"
											id="new-true"
											className="bg-alternative"
										/>
										<Label
											htmlFor="new-true"
											className={`text-sm ${
												filters.new === true
													? "font-semibold text-accent"
													: "font-normal text-alternative"
											}`}
										>
											Nuevo
										</Label>
									</div>
									<div className={`flex items-center space-x-2 rounded`}>
										<RadioGroupItem
											value="false"
											id="new-false"
											className="bg-alternative"
										/>
										<Label
											htmlFor="new-false"
											className={`text-sm ${
												filters.new === false
													? "font-semibold text-accent"
													: "font-normal text-alternative"
											}`}
										>
											Renovado
										</Label>
									</div>
								</RadioGroup>
							</CollapsibleContent>
						</Collapsible>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</div>
	);
};
