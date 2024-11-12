import Image from "next/image";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Switch } from "../ui/switch";
import { Edit, ImageOff, Trash2 } from "lucide-react";
import Link from "next/link";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Product } from "@/app/types/types";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const ProductDashboardCard = ({
	product,
	updateProductAvailable,
}: {
	product: Product;
	updateProductAvailable: any;
}) => {
	const cdnUrl = process.env.NEXT_PUBLIC_SUPABASE_CDN_URL;

	const [productAvailable, setProductAvailable] = useState<any>(
		product.available
	);

	const handleAvailabilityChange = async () => {
		setProductAvailable(!productAvailable);
		await updateProductAvailable(product, !productAvailable);

		toast({
			title: "Producto actualizado",
			description: "El producto ha sido actualizado exitosamente.",
			duration: 1500,
		});
	};

	return (
		<Card key={product.id}>
			<CardHeader className="p-4">
				<div className="flex items-center space-x-4">
					{product.imageName ? (
						<Image
							src={cdnUrl + "/" + product.imageName}
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
						<p className="text-sm text-muted-foreground">{product.category}</p>
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-4 pt-0 ">
				<p className="text-sm mb-2">{product.description}</p>
				<p className="font-bold">${product.price.toFixed(2)}</p>
			</CardContent>
			<CardFooter className="p-4 pt-0 flex justify-between">
				<div className="flex items-center space-x-2">
					<Switch
						checked={productAvailable}
						onCheckedChange={handleAvailabilityChange}
					/>
					<Label>{productAvailable ? "Visible" : "Oculto"}</Label>
				</div>
				<div className="flex space-x-2">
					<Link href={`/dashboard/edit-product/${product.id}`}>
						<Button variant="outline" size="icon">
							<Edit className="h-4 w-4" />
						</Button>
					</Link>
					<Button variant="outline" size="icon">
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};
