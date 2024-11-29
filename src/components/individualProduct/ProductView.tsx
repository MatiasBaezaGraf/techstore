"use client";

import { Category, HomeLink, Product } from "@/app/types/types";
import {
	ChevronLeft,
	ChevronRightIcon,
	Gamepad2,
	Laptop,
	LayoutGrid,
	MessageCircle,
	RefreshCcw,
	Tablet,
	TabletSmartphone,
	Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { SearchInputForm } from "../general/SearchInputForm";
import { Logo } from "../general/Logo";
import { LinksBar } from "../home/LinksBar";
import { ProductsCarousel } from "../home/ProductsCarousel";
import { MobileSkeleton } from "./MobileSkeleton";
import { DesktopSkeleton } from "./DesktopSkeleton";

const iconMap = {
	Laptop,
	Tablet,
	TabletSmartphone,
	Gamepad2,
};

export const ProductView = ({
	productSlug,
	getProduct,
	getCategories,
	getCategoryProducts,
}: {
	productSlug: string;
	getProduct: (slug: string) => Promise<Product>;
	getCategories: () => Promise<Category[]>;
	getCategoryProducts: () => Promise<Product[]>;
}) => {
	const cdnUrl = process.env.NEXT_PUBLIC_SUPABASE_CDN_URL;
	const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

	const [product, setProduct] = useState<Product | null>(null);
	const [categories, setCategories] = useState<Category[] | null>(null);
	const [category, setCategory] = useState<Category | null>(null);
	const [categoryProducts, setCategoryProducts] = useState<Product[] | null>(
		null
	);

	// Construir el mensaje de WhatsApp
	const generateWhatsAppLink = () => {
		const message = `Hola, estoy interesado en el producto "${
			product!.name
		}". Puedes encontrarlo aquí: ${baseUrl}/products/${category?.name}/${
			product!.slug
		}`;
		return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
			message
		)}`;
	};

	const categoryLinks: HomeLink[] =
		categories?.map((category: Category) => {
			const IconElement = iconMap[category.icon];

			return {
				title: category.name,
				url: `/search?category_id=${category.id}`,
				icon: <IconElement size={22} />,
			};
		}) || [];

	useEffect(() => {
		getProduct(productSlug).then((data) => setProduct(data));
		getCategories().then((data) => setCategories(data));
		getCategoryProducts().then((data) => setCategoryProducts(data));
	}, [productSlug]);

	useEffect(() => {
		if (product && categories) {
			const categoryToSet = categories.find(
				(c) => c.id === parseInt(product.category_id)
			);

			// console.log(categoryx);

			setCategory(categoryToSet!);
		}
	}, [product, categories]);

	// console.log(product, categories, category);

	if (!product || !categories || !category || !categoryProducts)
		return (
			<div className="min-h-withNav flex w-full max-w-[1160px] mx-auto items-stretch flex-col">
				<div className="md:hidden">
					<MobileSkeleton />
				</div>
				<div className="hidden md:block">
					<DesktopSkeleton />
				</div>
			</div>
		);

	return (
		<div className="min-h-withNav p-3 md:p-0 flex w-full max-w-[1160px] mx-auto items-stretch flex-col">
			<div className="flex flex-col  w-full pt-0 md:py-4">
				<div className="flex flex-row items-center pt-4 md:pt-0 ">
					<Link href="/" className="hidden md:block">
						<Logo size={40} />
					</Link>
					<div className="py-4 md:px-0 max-w-2xl w-full mx-auto ">
						<SearchInputForm />
					</div>
					<div className="w-[160px] hidden md:block" />
				</div>

				<div className="hidden md:flex flex-row gap-3">
					<LinksBar
						links={[
							{
								title: "Tienda",
								url: "/search",
								icon: <LayoutGrid size={22} />,
							},
							{
								title: "Nuevos",
								url: "/search?new=true",
								icon: <Tag size={22} />,
							},
							{
								title: "Renovados",
								url: "/search?new=false",
								icon: <RefreshCcw size={22} />,
							},
							...categoryLinks,
						]}
					/>
				</div>
			</div>
			<span className="text-base text-accent py-2 md:flex flex-row items-center gap-2 hidden">
				<Link href={`/home`} className="hover:text-accent/70">
					Inicio
				</Link>
				<ChevronRightIcon className="w-4 h-4 text-alternative/60" />
				<Link
					href={`/search?category_id=${category?.id}`}
					className="hover:text-accent/70"
				>
					{category?.name}
				</Link>
				<ChevronRightIcon className="w-4 h-4 text-alternative/60" />
				<span className="text-alternative/60">{product.name}</span>
			</span>
			<span className="text-base text-accent py-2 md:hidden">
				<Link
					href={`/search`}
					className="hover:text-accent/70 flex flex-row items-center gap-2"
				>
					<ChevronLeft className="w-4 h-4 text-alternative/60" />
					Volver
				</Link>
			</span>
			<div className="space-y-6 md:space-y-0 md:flex md:flex-row md:justify-bewteen md:justify-bewteen  md:items-start gap-8 py-4">
				<Carousel className="w-full  mx-auto md:mx-0 max-w-full md:basis-1/2">
					<CarouselContent>
						{/* {product.images.map((src, index) => ( */}
						<CarouselItem>
							<div className="relative aspect-square">
								<Image
									src={`${cdnUrl}/productImages/${product.imageName}`}
									alt={`${product.name}`}
									layout="fill"
									objectFit="cover"
									className="rounded-lg shadow-black shadow-lg border border-neutral-500"
								/>
							</div>
						</CarouselItem>
						{/* ))} */}
					</CarouselContent>
					{/* <CarouselPrevious className="hidden sm:flex" />
					<CarouselNext className="hidden sm:flex" /> */}
				</Carousel>

				<div className=" flex flex-col gap-5 md:basis-1/2">
					<div className="space-y">
						<span className="text-sm text-neutral-400 md:hidden">
							<Link href={`/home`}>Inicio</Link> /{" "}
							<Link href={`/search?category_id=${category?.id}`}>
								{category?.name}
							</Link>{" "}
							/
						</span>
						<h1 className="text-2xl sm:text-3xl font-bold text-alternative mb-3 mt-1">
							{product.name}
						</h1>
						<div className="flex flex-wrap gap-2 ">
							<Badge
								variant={product.new ? "accent" : "secondary"}
								className="text-xs"
							>
								{product.new ? "Nuevo" : "Reacondicionado"}
							</Badge>
							<Badge
								variant={product.available ? "secondary" : "default"}
								className="text-xs"
							>
								{product.available ? "Entrega inmediata" : "A pedido"}
							</Badge>
						</div>
					</div>
					<div className="space-y">
						<p className="text-4xl font-bold text-accent ">
							U$ {product.price}
						</p>
						<p className="text-alternative/80 text-sm">Precio final</p>
					</div>
					<div className="space-y">
						<h2 className="text-lg font-bold text-alternative mb-3">
							Descripción
						</h2>
						<p className="text-alternative/80 text-sm sm:text-base mb-8">
							{product.description}
						</p>
					</div>
					<Link
						className="mt-auto"
						href={generateWhatsAppLink()}
						target="_blank"
					>
						<Button className="w-full text-base text-secondary-dark bg-accent font-semibold hover:bg-accent/80">
							<MessageCircle className="mr-1" />
							Consultar por este producto
						</Button>
					</Link>
					<span className="text-alternative/60 text-sm mx-auto">
						Consulta disponibilidad y tiempo de entrega
					</span>
				</div>
			</div>

			<ProductsCarousel
				title={`Puede interesarte`}
				icon={<LayoutGrid size={22} />}
				categories={categories}
				products={categoryProducts}
			/>
		</div>
	);
};
