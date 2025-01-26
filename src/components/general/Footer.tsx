import { Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";

export const Footer = () => {
	return (
		<footer className="mt-auto text-alternative py-2 border-t border-alternative/10  bg-secondary">
			<div className="container mx-auto px-4">
				<div className="flex flex-col items-center gap-3">
					<div className="flex items-center gap-4">
						<Logo size={30} />
					</div>

					<div className="flex flex-wrap justify-center gap-6">
						<Link
							href="https://www.instagram.com/techstore.lsm/"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-alternative hover:text-accent/80"
						>
							<Instagram className="w-6 h-6" />
							<span className="text-sm">@techstore</span>
						</Link>
						|
						<Link
							href="https://wa.me/5493435079951"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-alternative hover:text-accent/80"
						>
							<MessageCircle className="w-6 h-6" />
							<span className="text-sm">+54 9 3435 07‑9951</span>
						</Link>
					</div>

					<p className="text-sm text-gray-400">
						© {2024} TechStore. Todos los derechos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
};
