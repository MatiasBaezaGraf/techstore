export type Product = {
	id?: string;
	name: string;
	description: string;
	price: number;
	category: string;
	imageName?: string;
	show: boolean;
	available: boolean;
};

export type Filters = {
	name: string;
	category: string;
	visibility: boolean | null;
	priceMin?: number;
	priceMax?: number;
};
