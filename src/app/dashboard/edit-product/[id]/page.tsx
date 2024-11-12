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
			category: string;
			image?: File;
			show: boolean;
			available: boolean;
		},
		previousImageName: string
	) {
		"use server";

		const supabase = await createClient();

		const productToEdit: any = {
			name: product.name,
			description: product.description,
			price: product.price,
			category: product.category,
			show: product.show,
		};

		if (product.image) {
			productToEdit.imageName = product.image.name;
		}

		const { data: productEdited, error: productError } = await supabase
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

			const { data: imageEdited, error: imageError } = await supabase.storage
				.from("productImages")
				.upload(product.image.name, product.image);

			if (imageError) {
				throw imageError;
			}
		}
	}

	return (
		<EditProductForm
			getProductToEdit={getProductToEdit}
			productId={id}
			editProduct={editProduct}
		/>
	);
}
