import { Product } from "@/app/types/types";
import { Card } from "../ui/card";

export const ProductCard = ({ product }: { product: Product }) => {
	return (
		<Card className="bg-secondary-light border-neutral-700">
			{product.name}
			<span className="text-alternative">{product.price}</span>
		</Card>
	);
};
