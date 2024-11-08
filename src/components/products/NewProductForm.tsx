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
import { Camera, Loader2 } from "lucide-react";
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

export const NewProductForm = ({
	insertProduct,
}: {
	insertProduct: (product: any) => Promise<any>;
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
	});

	const categorias = [
		"Electrónicos",
		"Accesorios",
		"Ropa",
		"Hogar",
		"Deportes",
	];

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
			});

			router.push("/productos"); // Asumiendo que tienes una ruta '/productos'
		} catch (error) {
			console.error(error);

			toast({
				title: "Error",
				description: "Ocurrió un error al agregar el producto.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="container mx-auto p-4 max-w-md">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						Agregar Nuevo Producto
					</CardTitle>
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
							<div className="flex items-center">
								<Input
									id="image"
									name="image"
									type="file"
									accept="image/*"
									onChange={handleFileChange}
									className="hidden"
								/>
								<Button
									type="button"
									variant="outline"
									onClick={() => document.getElementById("foto")?.click()}
								>
									<Camera className="mr-2 h-4 w-4" /> Subir Foto
								</Button>
								{product.image && (
									<span className="text-sm">{product.image.name}</span>
								)}
							</div>
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
