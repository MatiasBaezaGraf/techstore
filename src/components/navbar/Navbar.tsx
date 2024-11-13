import Image from "next/image";
import { SidebarMenu } from "./SidebarMenu";
import { Logo } from "../general/Logo";

export const Navbar = () => {
	//Navbar transparente
	return (
		<div className="w-full fixed top-0 h-16 z-50 flex flex-row justify-between items-center p-3 bg-secondary-dark">
			<SidebarMenu />
			<Logo />
		</div>
	);
};
