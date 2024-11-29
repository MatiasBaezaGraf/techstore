import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "Techstore | Tienda de tecnología",
	description: "Tienda de tecnología",
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body className={`${inter.className} antialiased bg-accent`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
