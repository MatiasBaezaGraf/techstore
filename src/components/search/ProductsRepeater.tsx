import { Category, Product } from "@/app/types/types";
import { ProductCard } from "./ProductCard";
import { SearchX } from "lucide-react";

export const ProductsRepeater = ({
	products,
	categories,
	dollarRate,
}: {
	products: Product[];
	categories: Category[];
	dollarRate: number;
}) => {
	const getProductCategory = (categoryId: string) => {
		return categories.find((category) => category.id === parseInt(categoryId))!;
	};

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
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:w-full">
			{products.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
					category={getProductCategory(product.category_id)}
					dollarRate={dollarRate}
				/>
			))}
		</div>
	);
};
