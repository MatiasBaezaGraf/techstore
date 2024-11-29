import Image from "next/image";

import { Category, Product } from "@/app/types/types";

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";

export const CarouselProductCard = ({
	product,
	category,
}: {
	product: Product;
	category: Category;
}) => {
	const cdnUrl = process.env.NEXT_PUBLIC_SUPABASE_CDN_URL;
	const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

	// Construir el mensaje de WhatsApp
	const generateWhatsAppLink = () => {
		const message = `Hola, estoy interesado en el producto "${product.name}". Puedes encontrarlo aquí: ${baseUrl}/products/${category.name}/${product.slug}`;
		return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
			message
		)}`;
	};

	return (
		<Card className="w-full max-w-sm min-h-full flex flex-col justify-between bg-secondary-light border border-neutral-500 overflow-hidden h-[305px] lg:h-[360px]">
			<div className="flex flex-col justify-start h-full">
				<Link href={`/products/${category.name}/${product.slug}`} passHref>
					<div className="relative  h-[170px] lg:h-[200px]">
						<Image
							src={`${cdnUrl}/productImages/${product.imageName}`}
							alt={product.name}
							layout="fill"
							className="p-4 bg-white rounded-t-lg hover:scale-105 transform duration-200 object-contain"
						/>
					</div>
				</Link>
				<CardContent className="p-2 flex flex-col items-start justify-start flex-1 h-full">
					<div className="flex items-center gap-2 mb-1 justify-between w-full">
						<h3 className="text-xl font-bold text-accent">
							U$ {product.price}
						</h3>
						<Badge
							className="w-min px-2"
							variant={product.new ? "accent" : "default"}
						>
							{product.new ? "Nuevo" : "Renovado"}
						</Badge>
					</div>
					<p className="text-xs text-alternative/50">{category.name}</p>
					<h3 className="text-sm  text-alternative  line-clamp-1 mb-2">
						{product.name}
					</h3>

					<Link
						className="mt-auto w-full "
						href={generateWhatsAppLink()}
						target="_blank"
					>
						<Button
							className="w-full text-sm text-secondary-dark bg-accent font-semibold hover:bg-accent/80"
							size={"sm"}
						>
							<MessageCircle className="mr-1" />
							Consultar
						</Button>
					</Link>
				</CardContent>
			</div>
			{/* {product.available && (
				<CardFooter className="bg-accent p-2 flex items-center text-xs font-semibold justify-center pt-2">
					Disponibilidad inmediata
				</CardFooter>
			)} */}
		</Card>
	);
};
