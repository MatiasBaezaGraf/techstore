import Image from "next/image";

export const Logo = ({ size = 16 }: { size?: number }) => {
	return (
		<div
			style={{
				width: `${size * 4}px`,
				height: `${size * 4}px`,
			}}
			className="relative"
		>
			<Image
				src="/logoTransparent.png"
				alt="Logo de la tienda"
				fill
				className="object-contain"
			/>
		</div>
	);
};
