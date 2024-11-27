import { Category, Product } from "@/app/types/types";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";

export const ProductCard = ({
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
		<Card
			key={product.id}
			className="bg-secondary-dark transform duration-200 border-neutral-600 shadow-black shadow hover:shadow-lg hover:border-primary hover:scale-[1.01] overflow-hidden h-[335px] flex flex-col"
		>
			<CardContent className="p-0 flex-1 flex flex-col">
				<div className={`flex flex-col h-full`}>
					<Link href={`/products/${category.name}/${product.slug}`} passHref>
						<div
							className={`relative mb-2 overflow-hidden h-[175px] bg-alternative`}
						>
							<Image
								src={`${cdnUrl}/productImages/${product.imageName}`}
								alt={product.name}
								layout="fill"
								className="rounded-t-md hover:scale-105 transform duration-200 object-contain"
							/>
						</div>
					</Link>

					<div className="flex-1 flex justify-start flex-col p-2">
						<span className="flex flex-row items-center gap-2 mb-1">
							<p className="text-primary text-lg font-bold text-nowrap">
								U$ {product.price}
							</p>
							{product.new && (
								<Badge className=" bg-accent hover:bg-accent  text-alternative  border-0 h-4 px-2">
									Nuevo
								</Badge>
							)}
						</span>
						<p className="text-xs text-alternative/50">{category.name}</p>
						<h2 className="text-sm font-regular  text-alternative line-clamp-2 mb-1">
							{product.name}
						</h2>

						<Link
							className="mt-auto"
							href={generateWhatsAppLink()}
							target="_blank"
						>
							<Button
								className="w-full   sm:w-auto text-sm border-accent bg-accent/30 hover:bg-accent/40  hover:border"
								size={"sm"}
							>
								<MessageCircle className="mr-1" />
								Consultar
							</Button>
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
