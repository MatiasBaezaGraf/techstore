import { Product } from "@/app/types/types";
import { ProductCard } from "./ProductCard";

export const ProductsRepeater = ({ products }: { products: Product[] }) => {
	return (
		<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};
