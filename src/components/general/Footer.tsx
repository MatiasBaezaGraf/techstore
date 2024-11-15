import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
	return (
		<footer className="mt-8 text-alternative py-2 border-t border-accent bg-secondary-light">
			<div className="container mx-auto px-4">
				<div className="flex flex-col items-center md:flex-row md:justify-between">
					<div className="">
						<Image
							src="/logoTransparent.png"
							alt="Logo de la tienda"
							width={150}
							height={60}
							objectFit="contain"
						/>
					</div>
					<div className="flex space-x-6">
						<Link
							href="https://instagram.com"
							target="_blank"
							aria-label="Síguenos en Instagram"
						>
							<Instagram className="w-6 h-6 text-white hover:text-green-500 transition-colors" />
						</Link>
					</div>
				</div>
				<div className="mt-8 text-center text-sm text-gray-400">
					<p>&copy; {new Date().getFullYear()} Techstore</p>
				</div>
			</div>
		</footer>
	);
};
