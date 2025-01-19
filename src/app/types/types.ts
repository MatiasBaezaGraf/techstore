export type Product = {
	id?: string;
	name: string;
	description: string;
	price: number;
	category_id: string;
	imageName?: string;
	show: boolean;
	stock: number;
	available: boolean;
	new: boolean;
	highlighted: boolean;
	slug: string;
};

export type ProductToInsert = {
	name: string;
	description: string;
	price: number;
	stock: number;
	category_id: string;
	image?: File;
	show: boolean;
	available: boolean;
	new: boolean;
	highlighted: boolean;
};

export type Filters = {
	name?: string;
	category_id?: string | "todas";
	visibility?: boolean | null;
	priceMin?: number;
	priceMax?: number;
	new?: boolean;
	available?: boolean;
};

export type Category = {
	id: number;
	name: string;
	icon: "Laptop" | "Tablet" | "TabletSmartphone" | "Gamepad2" | "Cable";
	imageName?: string;
};

export type Pagination = {
	page: number;
	limit: number;
	totalPages: number;
	pageItems: Product[];
};

export type Sorting = {
	sortBy?: string;
	sortDirection?: string;
};

export type HomeLink = {
	url: string;
	icon: React.ReactNode;
	title: string;
};
