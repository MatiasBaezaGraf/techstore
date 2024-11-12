"use client";

import { Product } from "@/app/types/types";

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
import { ArrowLeft, Camera, Image, Loader2, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Switch } from "../ui/switch";
import Link from "next/link";

export const NewProductForm = ({
	insertProduct,
}: {
	insertProduct: (product: any) => Promise<void>;
}) => {
	const router = useRouter();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [product, setProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: null as File | null,
		show: true,
		available: true,
	});

	const categorias = ["Smartphones", "Computadoras"];

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setProduct((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (value: string) => {
		setProduct((prev) => ({ ...prev, category: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setProduct((prev) => ({ ...prev, image: e.target.files![0] }));
		}
	};

	const handleVisibilityChange = (checked: boolean) => {
		setProduct((prev) => ({ ...prev, show: checked }));
	};

	const handleAvailabilityChange = (checked: boolean) => {
		setProduct((prev) => ({ ...prev, available: checked }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			await insertProduct({
				...product,
				price: parseFloat(product.price),
			});

			toast({
				title: "Producto agregado",
				description: "El producto ha sido agregado exitosamente.",
				duration: 1500,
			});

			router.push("/dashboard");
		} catch (error) {
			toast({
				title: "Error",
				description: "Ocurrió un error al agregar el producto.",
				duration: 5000,
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

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
							Agregar Nuevo Producto
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
								value={product.name}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="descripcion">Descripción</Label>
							<Textarea
								id="description"
								name="description"
								value={product.description}
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
								value={product.price}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="categoria">Categoría</Label>
							<Select onValueChange={handleSelectChange} required>
								<SelectTrigger>
									<SelectValue placeholder="Selecciona una categoría" />
								</SelectTrigger>
								<SelectContent>
									{categorias.map((categoria) => (
										<SelectItem key={categoria} value={categoria}>
											{categoria}
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
										<Camera className="mr-2 h-4 w-4" /> Subir Foto
									</Button>
								)}
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<Switch
								id="show"
								checked={product.show}
								onCheckedChange={handleVisibilityChange}
							/>
							<Label htmlFor="visibilidad">Producto visible</Label>
						</div>
						<div className="flex items-center space-x-2">
							<Switch
								id="show"
								checked={product.available}
								onCheckedChange={handleAvailabilityChange}
							/>
							<Label htmlFor="visibilidad">Disponibilidad inmediata</Label>
						</div>
						<CardFooter className="px-0">
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Agregando...
									</>
								) : (
									"Agregar Producto"
								)}
							</Button>
						</CardFooter>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};
