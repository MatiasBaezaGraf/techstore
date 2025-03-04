"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ArrowLeft, Camera, Loader2, Image, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Switch } from "../ui/switch";
import Link from "next/link";
import { Category, Product } from "@/app/types/types";

export const EditProductForm = ({
	productId,
	getProductToEdit,
	editProduct,
	fetchCategories,
}: {
	productId: string;
	getProductToEdit: (id: string) => Promise<Product[]>;
	editProduct: (product: Product, previousImageName: string) => Promise<void>;
	fetchCategories: () => Promise<Category[]>;
}) => {
	const router = useRouter();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [previousImageName, setPreviousImageName] = useState("");
	const [product, setProduct] = useState({
		name: "",
		description: "",
		price: "",
		stock: 0,
		category_id: "",
		slug: "",
		image: null as File | null,
		show: true,
		available: true,
		new: true,
		highlighted: false,
	});

	useEffect(() => {
		const getAndSetProductToEdit = async () => {
			const productToEdit = await getProductToEdit(productId);

			if (!productToEdit || productToEdit.length === 0) {
				router.push("/dashboard");
				return;
			}

			setProduct({
				name: productToEdit[0].name,
				description: productToEdit[0].description,
				price: productToEdit[0].price.toString(),
				stock: productToEdit[0].stock,
				category_id: productToEdit[0].category_id.toString(),
				image: null,
				show: productToEdit[0].show,
				slug: productToEdit[0].slug,
				available: productToEdit[0].available,
				new: productToEdit[0].new,
				highlighted: productToEdit[0].highlighted,
			});
			setPreviousImageName(productToEdit[0].imageName || "");
		};

		const getAndSetCategories = async () => {
			const categories = await fetchCategories();

			setCategories(categories);
		};

		getAndSetProductToEdit();
		getAndSetCategories();
	}, []);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;

		setProduct(
			(prev: {
				name: string;
				description: string;
				price: string;
				stock: number;
				category_id: string;
				image: File | null;
				slug: string;
				show: boolean;
				available: boolean;
				new: boolean;
				highlighted: boolean;
			}) => ({ ...prev, [name]: value })
		);
	};

	const handleSelectChange = (value: string) => {
		if (value === "") return;
		setProduct(
			(prev: {
				name: string;
				description: string;
				price: string;
				stock: number;
				category_id: string;
				image: File | null;
				slug: string;
				show: boolean;
				available: boolean;
				new: boolean;
				highlighted: boolean;
			}) => ({ ...prev, category_id: value })
		);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setProduct((prev) => ({ ...prev, image: e.target.files![0] }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			await editProduct(
				{
					...product,
					price: parseFloat(product.price),
				},
				previousImageName
			);

			toast({
				title: "Producto actualizado",
				description: "El producto ha sido actualizado exitosamente.",
				duration: 1500,
			});

			router.push("/dashboard");
		} catch (error) {
			toast({
				title: "Error",
				description: "Ocurrió un error al actualizar el producto.",
				duration: 5000,
				variant: "destructive",
			});

			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!product.name)
		return (
			<div className="container mx-auto p-4 flex flex-col h-screen justify-center items-center  ">
				<Loader2 size={50} className="mx-auto animate-spin" />
				<span className="text-base text-neutral-500 mt-4">
					Obteniendo el producto
				</span>
			</div>
		);

	return (
		<div className="container mx-auto p-2 max-w-md">
			<Card>
				<CardHeader>
					<div className="flex flex-row items-center justify-between">
						<Link href="/dashboard">
							<Button variant="ghost" size="icon" className="mr-2">
								<ArrowLeft className="h-4 w-4" />
								<span className="sr-only">Volver atrás</span>
							</Button>
						</Link>
						<CardTitle className="text-2xl font-bold">
							Editar Producto
						</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="nombre">Nombre del Producto</Label>
							<Input
								id="name"
								name="name"
								defaultValue={product.name}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="descripcion">Descripción</Label>
							<Textarea
								id="description"
								name="description"
								defaultValue={product.description}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="precio">Precio</Label>
							<Input
								id="price"
								name="price"
								type="number"
								min="0"
								step="0.01"
								defaultValue={product.price}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="stock">Stock</Label>
							<Input
								id="stock"
								name="stock"
								type="number"
								min="0"
								defaultValue={product.stock}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="categoria">Categoría</Label>
							<Select
								value={product.category_id}
								onValueChange={handleSelectChange}
								required
							>
								<SelectTrigger>
									<SelectValue placeholder="Selecciona una categoría" />
								</SelectTrigger>
								<SelectContent>
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
							<Label htmlFor="foto">Foto del Producto</Label>
							<div className="flex items-center gap-2 ">
								<Input
									id="image"
									name="image"
									type="file"
									accept="image/*"
									onChange={handleFileChange}
									className="hidden"
								/>

								{product.image ? (
									<div className="text-sm flex flex-row items-center gap-2 border bg-neutral-300 h-10 px-4 py-2 rounded-md">
										<Image className="mr-2 h-4 w-4 " />
										<span className="text-ellipsis text-nowrap overflow-hidden max-w-[200px]">
											{product.image.name}
										</span>
										<X
											className="ml-2 h-4 w-4 cursor-pointer"
											onClick={() =>
												setProduct((prev) => ({ ...prev, image: null }))
											}
										/>
									</div>
								) : (
									<Button
										type="button"
										variant="outline"
										onClick={() => document.getElementById("image")?.click()}
									>
										<Camera className="mr-2 h-4 w-4" /> Subir Foto Nueva
									</Button>
								)}
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<Switch
								id="show"
								checked={product.show}
								onCheckedChange={(checked) =>
									setProduct((prev) => ({ ...prev, show: checked }))
								}
							/>
							<Label htmlFor="visibilidad">Producto visible</Label>
						</div>
						<div className="flex items-center space-x-2">
							<Switch
								id="show"
								checked={product.available}
								onCheckedChange={(checked) =>
									setProduct((prev) => ({ ...prev, available: checked }))
								}
							/>
							<Label htmlFor="visibilidad">Disponibilidad inmediata</Label>
						</div>
						<div className="flex items-center space-x-2">
							<Switch
								id="new"
								checked={product.new}
								onCheckedChange={(checked) =>
									setProduct((prev) => ({ ...prev, new: checked }))
								}
							/>
							<Label htmlFor="visibilidad">Producto nuevo</Label>
						</div>
						<div className="flex items-center space-x-2">
							<Switch
								id="highlighted"
								checked={product.highlighted}
								onCheckedChange={(checked) =>
									setProduct((prev) => ({ ...prev, highlighted: checked }))
								}
							/>
							<Label htmlFor="visibilidad">Producto destacado</Label>
						</div>
						<CardFooter className="px-0">
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Actualizando...
									</>
								) : (
									"Actualizar Producto"
								)}
							</Button>
						</CardFooter>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};
