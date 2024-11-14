import Image from "next/image";

import { Product } from "@/app/types/types";

import { Card, CardContent, CardFooter } from "../ui/card";

export const HighlightedProductCard = ({ product }: { product: Product }) => {
	const cdnUrl = process.env.NEXT_PUBLIC_SUPABASE_CDN_URL;

	return (
		<Card className="w-full max-w-sm min-h-full flex flex-col justify-between bg-secondary-light border border-neutral-500 overflow-hidden">
			<div className="flex flex-col justify-start">
				<div className="relative aspect-square">
					<Image
						src={`${cdnUrl}/productImages/${product.imageName}`}
						alt={product.name}
						layout="fill"
						objectFit="contain"
						className="p-4 bg-white rounded-t-lg"
					/>
				</div>
				<CardContent className="p-4 flex flex-col justify-center">
					<h3 className="text-2xl font-bold text-accent">${product.price}</h3>
					<h3 className="text-sm font- text-alternative  line-clamp-2">
						{product.name}
					</h3>
					<p className="text-sm text-neutral-400 line-clamp-3">
						{product.new ? "Nuevo" : "Reacondicionado"}
					</p>
				</CardContent>
			</div>
			{product.available && (
				<CardFooter className="bg-accent p-2 flex items-center text-xs font-semibold justify-center pt-2">
					Disponibilidad inmediata
				</CardFooter>
			)}
		</Card>
	);
};
