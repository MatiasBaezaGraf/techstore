import { Sorting } from "@/app/types/types";
import { useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ArrowDownUp, ChevronDown } from "lucide-react";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export const SortingBar = ({
	sorting,
	handleSortingChange,
	cleanSorting,
}: {
	sorting: Sorting;
	handleSortingChange: (sorting: {
		sortBy: string;
		sortDirection: string;
	}) => void;
	cleanSorting: () => void;
}) => {
	const [isSortingOpen, setSortingOpen] = useState(false);

	return (
		<div className="flex justify-between items-center w-full">
			<Sheet open={isSortingOpen} onOpenChange={setSortingOpen}>
				<SheetTrigger asChild>
					<Button
						className={`w-full  text-alternative hover:bg-secondary-dark hover:text-alternative  ${
							sorting.sortBy
								? "border-accent bg-accent/10 "
								: "border-secondary-light bg-secondary"
						}`}
						variant="outline"
						size="icon"
					>
						<ArrowDownUp className="h-4 w-4" />
						<span>Ordenar</span>
						{sorting.sortBy && (
							<div className="rounded-full border flex items-center justify-center border-accent aspect-square h-5 w-5">
								<span className="text-alternative">1</span>
							</div>
						)}
					</Button>
				</SheetTrigger>
				<SheetContent
					side="bottom"
					className="bg-secondary text-white h-[80vh]"
				>
					<SheetHeader>
						<Button
							variant={"ghost"}
							className="w-full bg-secondary text-alternative hover:bg-secondary-light hover:text-alternative"
							onClick={() => setSortingOpen(false)}
						>
							<span className="sr-only">Cerrar</span>
							<ChevronDown className="h-6 w-6" />
						</Button>
						<SheetTitle className="text-white">Ordenar por</SheetTitle>
						<SheetDescription className="text-gray-400">
							Ordena los productos por precio y nombre
						</SheetDescription>
					</SheetHeader>
					<div className="space-y-6 py-4">
						<div className="space-y-2">
							<Label htmlFor="sorting">Ordenar por</Label>
							<Select
								value={`${sorting.sortBy}-${sorting.sortDirection}`}
								onValueChange={(value) => {
									const [sortBy, sortDirection] = value.split("-");
									handleSortingChange({ sortBy, sortDirection });
								}}
							>
								<SelectTrigger
									id="sorting"
									className="w-full bg-secondary-light text-white border-gray-600"
								>
									<SelectValue placeholder="Seleccionar orden" />
								</SelectTrigger>
								<SelectContent className="bg-secondary-light text-white border-gray-600">
									<SelectItem value="price-desc">Mayor precio</SelectItem>
									<SelectItem value="price-asc">Menor precio</SelectItem>
									<SelectItem value="new-desc">Mas nuevos</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<Button
							className="w-full bg-primary hover:bg-primary/80 text-white"
							onClick={() => setSortingOpen(false)}
						>
							Aplicar
						</Button>
						<Button
							className="w-full bg-secondary-light hover:bg-secondary/80 text-white"
							onClick={() => {
								cleanSorting();
								setSortingOpen(false);
							}}
						>
							Limpiar
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
