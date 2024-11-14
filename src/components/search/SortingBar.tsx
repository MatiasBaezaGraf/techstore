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
import {
	ArrowDownUp,
	ChevronDown,
	ChevronUp,
	SlidersVertical,
} from "lucide-react";
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
}: {
	sorting: Sorting;
	handleSortingChange: (attribute: string, value: any) => void;
}) => {
	const [isSortingOpen, setSortingOpen] = useState(false);

	return (
		<div className="flex justify-between items-center mb-4 w-full">
			<Sheet open={isSortingOpen} onOpenChange={setSortingOpen}>
				<SheetTrigger asChild>
					<Button
						className="w-full bg-secondary text-alternative border-secondary-light"
						variant="outline"
						size="icon"
					>
						<span>Ordenar</span>
						<ArrowDownUp className="h-4 w-4" />
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
							<Label htmlFor="categoria">Categoría</Label>
							<Select
								value={sorting.sortBy}
								onValueChange={(value) => handleSortingChange("sortBy", value)}
							>
								<SelectTrigger
									id="categoria"
									className="w-full bg-secondary-light text-white border-gray-600"
								>
									<SelectValue placeholder="Ordenar por" />
								</SelectTrigger>
								<SelectContent className="bg-secondary-light text-white border-gray-600">
									<SelectItem value={"name"}>Nombre</SelectItem>
									<SelectItem value={"price"}>Precio</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="direccion">Dirección</Label>
							<Select
								value={sorting.sortDirection}
								onValueChange={(value) =>
									handleSortingChange("sortDirection", value)
								}
							>
								<SelectTrigger
									id="direccion"
									className="w-full bg-secondary-light text-white border-gray-600"
								>
									<SelectValue placeholder="Dirección" />
								</SelectTrigger>
								<SelectContent className="bg-secondary-light text-white border-gray-600">
									<SelectItem value={"asc"}>Ascendente</SelectItem>
									<SelectItem value={"desc"}>Descendente</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<Button
							className="w-full bg-primary hover:bg-primary/80 text-white"
							onClick={() => setSortingOpen(false)}
						>
							Aplicar
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
