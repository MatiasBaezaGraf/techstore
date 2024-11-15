import { Product } from "@/app/types/types";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

export const ProductCard = ({ product }: { product: Product }) => {
	const cdnUrl = process.env.NEXT_PUBLIC_SUPABASE_CDN_URL;

	return (
		<Card
			key={product.id}
			className="bg-secondary-dark transform duration-200 border-neutral-600 shadow-black shadow hover:shadow-lg hover:border-primary hover:scale-[1.01]"
		>
			<CardContent className="p-0">
				<div className={`flex flex-col`}>
					<div className={`relative aspect-square mb-2`}>
						<Image
							src={`${cdnUrl}/productImages/${product.imageName}`}
							alt={product.name}
							layout="fill"
							objectFit="cover"
							className="rounded-t-md"
						/>
					</div>
					<div className="flex-1 p-2">
						<p className="text-primary text-lg font-bold mb-1 ">
							U$ {product.price}
						</p>
						<h2 className="text-xs font-regular mb-1 text-alternative/70 line-clamp-2">
							{product.name}
						</h2>
						{/* <p className="text-sm text-gray-400 mb-1">
							{product.available ? "Disponible" : "No disponible"}
						</p>
						<p className="text-sm text-gray-400">
							{product.new ? "Nuevo" : "Reacondicionado"}
						</p> */}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
