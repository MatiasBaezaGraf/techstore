import { Footer } from "@/components/general/Footer";
import { Navbar } from "@/components/navbar/Navbar";

export default function SearchLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col bg-secondary-dark">
			<Navbar />
			<div className="mt-16 md:mt-0 mb-16">{children}</div>
			<Footer />
		</div>
	);
}
