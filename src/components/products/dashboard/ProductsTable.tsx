import { Category, Product } from "@/app/types/types";
import Image from "next/image";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, ImageOff, SearchX, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export const ProductsTable = ({
	products,
	categories,
	dollarRate,
	updateProductShow,
	deleteProduct,
}: {
	products: Product[];
	categories: Category[];
	dollarRate: number;
	updateProductShow: (product: Product) => void;
	deleteProduct: (product: Product) => void;
}) => {
	const cdnUrl = process.env.NEXT_PUBLIC_SUPABASE_CDN_URL;

	const handleShowChange = async (product: Product) => {
		// setProductShow(!productShow);
		await updateProductShow(product);

		toast({
			title: "Producto actualizado",
			description: "El producto ha sido actualizado exitosamente.",
			duration: 1500,
		});
	};

	const handleDeleteProduct = async (product: Product) => {
		await deleteProduct(product);

		toast({
			title: "Producto eliminado",
			description: "El producto ha sido eliminado exitosamente.",
			duration: 1500,
		});
	};

	if (products.length === 0)
		return (
			<div className="flex flex-col gap-2 items-center justify-center h-32 border-y w-full">
				<SearchX className="h-8 w-8 text-neutral-400" />
				<p className="text-secondary/70 text-sm">
					No hay productos para mostrar
				</p>
			</div>
		);

	return (
		<Table className="border-y">
			{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px] hidden md:table-cell">
						Imagen
					</TableHead>
					<TableHead className="w-[320px]">Nombre</TableHead>
					<TableHead>Categoría</TableHead>
					<TableHead>Stock</TableHead>
					<TableHead>Precio</TableHead>
					<TableHead>Visible</TableHead>
					<TableHead>Acciones</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.map((product) => (
					<TableRow key={product.id}>
						<TableCell className="hidden md:table-cell">
							{product.imageName ? (
								<Image
									src={`${cdnUrl}/productImages/${product.imageName}`}
									alt={product.name}
									width={35}
									height={35}
									className="rounded-md aspect-square object-cover"
								/>
							) : (
								<div className="w-8 h-8 bg-neutral-200 rounded-md flex items-center justify-center">
									<ImageOff className="h-4 w-4 text-neutral-400" />
								</div>
							)}
						</TableCell>
						<TableCell>
							<span className="line-clamp-2">{product.name}</span>
						</TableCell>
						<TableCell>
							{
								categories.find(
									(category) => category.id === parseInt(product.category_id)
								)?.name
							}
						</TableCell>
						<TableCell>
							<span className="font-medium text-nowrap">{product.stock}</span>
						</TableCell>
						<TableCell>
							<div className="flex flex-col items-start">
								<span className="font-medium text-nowrap">
									U$ {formatPrice(product.price)}
								</span>
								<span className="font-medium text-nowrap text-secondary/45">
									AR$ {formatPrice(product.price * dollarRate)}
								</span>
							</div>
						</TableCell>
						<TableCell>
							<Switch
								defaultChecked={product.show}
								// checked={product.show}
								onCheckedChange={() => handleShowChange(product)}
							/>
						</TableCell>
						<TableCell className="flex flex-row">
							<Link
								href={`/dashboard/edit-product/${product.id}`}
								className="mr-3"
							>
								<Button variant="outline" size="icon">
									<Edit className="h-3 w-3" />
								</Button>
							</Link>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="outline" size="icon">
										<Trash2 className="h-4 w-4 text-red-600" />
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Eliminar producto</DialogTitle>
										<DialogDescription>
											¿Estás seguro que deseas eliminar el producto? Esta acción
											no se puede deshacer.
										</DialogDescription>
									</DialogHeader>
									<DialogFooter>
										<DialogClose asChild>
											<Button onClick={() => handleDeleteProduct(product)}>
												Confirmar
											</Button>
										</DialogClose>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
