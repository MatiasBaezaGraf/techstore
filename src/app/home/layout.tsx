import { Navbar } from "@/components/navbar/Navbar";

export default function HomePageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col bg-secondary">
			<Navbar />
			<div className="mt-16">{children}</div>
		</div>
	);
}
