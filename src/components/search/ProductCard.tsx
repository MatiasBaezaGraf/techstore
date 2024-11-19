import { Category, Product } from "@/app/types/types";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";

export const ProductCard = ({
	product,
	category,
}: {
	product: Product;
	category: Category;
}) => {
	const cdnUrl = process.env.NEXT_PUBLIC_SUPABASE_CDN_URL;

	return (
		<Card
			key={product.id}
			className="bg-secondary-dark transform duration-200 border-neutral-600 shadow-black shadow hover:shadow-lg hover:border-primary hover:scale-[1.01] overflow-hidden"
		>
			<CardContent className="p-0">
				<div className={`flex flex-col`}>
					<Link href={`/products/${category.name}/${product.slug}`} passHref>
						<div className={`relative aspect-square mb-2 overflow-hidden`}>
							<Image
								src={`${cdnUrl}/productImages/${product.imageName}`}
								alt={product.name}
								layout="fill"
								objectFit="cover"
								className="rounded-t-md hover:scale-105 transform duration-200"
							/>
						</div>
					</Link>
					<div className="flex-1 p-2">
						<span className="flex flex-row items-center gap-3 mb-1">
							<p className="text-primary text-lg font-bold ">
								U$ {product.price}
							</p>
							{product.new && (
								<Badge className=" bg-accent  text-alternative  border-0 h-4">
									Nuevo
								</Badge>
							)}
						</span>

						<h2 className="text-xs font-regular mb-1 text-alternative/70 line-clamp-2">
							{product.name}
						</h2>
						{/* <Button className="text-accent hover:text-primary">
							Consultar
						</Button> */}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
