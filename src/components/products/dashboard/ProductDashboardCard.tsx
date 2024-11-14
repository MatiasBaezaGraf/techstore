import Image from "next/image";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../ui/card";
import { Switch } from "../../ui/switch";
import { Edit, ImageOff, Trash2 } from "lucide-react";
import Link from "next/link";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { Category, Product } from "@/app/types/types";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
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

export const ProductDashboardCard = ({
	product,
	category,
	updateProductShow,
	deleteProduct,
}: {
	product: Product;
	category: Category;
	updateProductShow: (product: Product) => void;
	deleteProduct: (product: Product) => void;
}) => {
	const cdnUrl = process.env.NEXT_PUBLIC_SUPABASE_CDN_URL;

	const [productShow, setProductShow] = useState<any>(product.show);

	const handleShowChange = async () => {
		setProductShow(!productShow);
		await updateProductShow(product);

		toast({
			title: "Producto actualizado",
			description: "El producto ha sido actualizado exitosamente.",
			duration: 1500,
		});
	};

	const handleDeleteProduct = async () => {
		await deleteProduct(product);

		toast({
			title: "Producto eliminado",
			description: "El producto ha sido eliminado exitosamente.",
			duration: 1500,
		});
	};

	return (
		<Card key={product.id}>
			<CardHeader className="p-4">
				<div className="flex items-center space-x-4">
					{product.imageName ? (
						<Image
							src={`${cdnUrl}/productImages/${product.imageName}`}
							alt={product.name}
							width={70}
							height={70}
							className="rounded-md aspect-square object-cover"
						/>
					) : (
						<div className="w-16 h-16 bg-neutral-200 rounded-md flex items-center justify-center">
							<ImageOff className="h-8 w-8 text-neutral-400" />
						</div>
					)}

					<div>
						<CardTitle className="text-lg">{product.name}</CardTitle>
						<p className="text-sm text-muted-foreground">{category.name}</p>
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-4 pt-0 ">
				<p className="text-sm mb-2">{product.description}</p>
				<p className="font-bold">${product.price.toFixed(2)}</p>
			</CardContent>
			<CardFooter className="p-4 pt-0 flex justify-between">
				<div className="flex items-center space-x-2">
					<Switch checked={productShow} onCheckedChange={handleShowChange} />
					<Label>Producto Visible</Label>
				</div>
				<div className="flex space-x-2">
					<Link href={`/dashboard/edit-product/${product.id}`}>
						<Button variant="outline" size="icon">
							<Edit className="h-4 w-4" />
						</Button>
					</Link>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline" size="icon">
								<Trash2 className="h-4 w-4" />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Eliminar producto</DialogTitle>
								<DialogDescription>
									¿Estás seguro que deseas eliminar el producto? Esta acción no
									se puede deshacer.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<DialogClose asChild>
									<Button onClick={handleDeleteProduct}>Confirmar</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</CardFooter>
		</Card>
	);
};
