import { HomeLink } from "@/app/types/types";
import Link from "next/link";

export const LinksBar = ({ links }: { links: HomeLink[] }) => {
	return (
		<div className="flex flex-row justify-between items-center p-4 rounded-md border border-alternative/20 w-full ">
			{links.map((link, index) => (
				<Link
					key={index}
					href={link.url}
					className="flex flex-1 flex-row items-center justify-center gap-2 text-center p-4 rounded-md transform duration-200 hover:bg-secondary hover:scale-105"
				>
					<span className="text-accent">{link.icon}</span>
					<span className="text-sm text-alternative">{link.title}</span>
				</Link>
			))}
		</div>
	);
};
