import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
	return price.toLocaleString("es-AR", {});
}

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
