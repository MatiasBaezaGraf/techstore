import { createClient } from "@/app/utils/server";
import { EditProductForm } from "@/components/products/EditProductForm";
import { redirect } from "next/navigation";

export default async function EditProductPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = await params;

	async function getProductToEdit(id: string) {
		"use server";

		const supabase = await createClient();

		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("id", id);

		if (error) {
			redirect("/dashboard");
		}

		return data;
	}

	async function editProduct(
		product: {
			name: string;
			description: string;
			price: number;
			category_id: string;
			image?: File;
			show: boolean;
			available: boolean;
			new: boolean;
			highlighted: boolean;
		},
		previousImageName: string
	) {
		"use server";

		const supabase = await createClient();

		const productToEdit: {
			name: string;
			description: string;
			price: number;
			category_id: string;
			show: boolean;
			available: boolean;
			new: boolean;
			highlighted: boolean;
			imageName?: string;
		} = {
			name: product.name,
			description: product.description,
			price: product.price,
			category_id: product.category_id,
			show: product.show,
			available: product.available,
			new: product.new,
			highlighted: product.highlighted,
		};

		if (product.image) {
			productToEdit.imageName = product.image.name;
		}

		const { error: productError } = await supabase
			.from("products")
			.update(productToEdit)
			.eq("id", id);

		if (productError) {
			throw productError;
		}

		if (product.image) {
			//First, we delete the old image
			const { error: deleteError } = await supabase.storage
				.from("productImages")
				.remove([previousImageName]);

			if (deleteError) {
				throw deleteError;
			}

			const { error: imageError } = await supabase.storage
				.from("productImages")
				.upload(product.image.name, product.image);

			if (imageError) {
				throw imageError;
			}
		}
	}

	async function fetchCategories() {
		"use server";

		const supabase = await createClient();

		const { data, error } = await supabase.from("categories").select("*");

		if (error) {
			throw error;
		}

		return data;
	}

	return (
		<EditProductForm
			getProductToEdit={getProductToEdit}
			productId={id}
			editProduct={editProduct}
			fetchCategories={fetchCategories}
		/>
	);
}