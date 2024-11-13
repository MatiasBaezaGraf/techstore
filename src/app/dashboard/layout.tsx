export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col bg-alternative min-h-screen">{children}</div>
	);
}
