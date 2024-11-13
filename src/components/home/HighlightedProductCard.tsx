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
						src={`${cdnUrl}/${product.imageName}`}
						alt={product.name}
						layout="fill"
						objectFit="contain"
						className="p-4 bg-white rounded-t-lg"
					/>
				</div>
				<CardContent className="p-4 flex flex-col justify-between">
					<h3 className="text-2xl font-bold text-accent">${product.price}</h3>
					<h3 className="text-sm font- text-alternative mb-2 line-clamp-2">
						{product.name}
					</h3>
				</CardContent>
			</div>
			{/* <CardFooter className="p-4 pt-0">
				<Button className="w-full bg-accent hover:bg-green-700 text-alternative">
					<MessageCircle className="w-4 h-4 mr-2" />
					Consultar
				</Button>
			</CardFooter> */}
		</Card>
	);
};
