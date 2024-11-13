import Image from "next/image";

export const Logo = () => {
	return (
		<div className="relative w-16 h-16">
			<Image
				src="/logo.jpg"
				alt="Logo de la tienda"
				layout="fill"
				objectFit="contain"
			/>
		</div>
	);
};
