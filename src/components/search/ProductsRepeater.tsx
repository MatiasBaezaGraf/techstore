import { Product } from "@/app/types/types";
import { ProductCard } from "./ProductCard";
import { SearchX } from "lucide-react";

export const ProductsRepeater = ({ products }: { products: Product[] }) => {
	if (products.length === 0) {
		return (
			<div className="h-[50vh] flex flex-col gap-5 items-center justify-center	">
				<SearchX className="h-12 w-12 text-alternative" />
				<p className="text-center text-alternative/70">
					No se encontraron productos
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};
