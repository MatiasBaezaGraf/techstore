import { Laptop, LogIn, Star, TabletSmartphone } from "lucide-react";
import { Logo } from "../general/Logo";
import { SearchInputForm } from "../general/SearchInputForm";
import { Button } from "../ui/button";
import { InfoCards } from "./InfoCards";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export const DesktopHomeSkeleton = () => {
	return (
		<div className="flex flex-col w-full pt-0 md:py-4">
			<div className="flex flex-row items-center pt-4 md:pt-0 ">
				<span className="hidden md:block">
					<Logo size={40} />
				</span>
				<div className="py-4 md:px-0 px-3 max-w-2xl w-full mx-auto ">
					<SearchInputForm />
				</div>
				<div className="w-[160px] hidden md:block text-right">
					<Button
						variant="ghost"
						className=" text-alternative hover:bg-secondary-dark/40 hover:text-alternative"
					>
						<LogIn className="mr-2" />
						Iniciar sesión
					</Button>
				</div>
			</div>
			<div className="hidden md:flex flex-row gap-3">
				<div className="flex flex-row justify-between items-center p-4 gap-4 rounded-md border border-alternative/20 w-full ">
					{[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
						<div
							key={index}
							className="flex flex-1 h-[54px] flex-row items-center justify-center gap-2 text-center p-4 rounded-md bg-secondary-light animate-pulse"
						/>
					))}
				</div>
			</div>

			<div className="mt-[28px] md:mt-[44px] px-3">
				<h2 className="text-xl  lg:text-2xl font-bold  mb-2 lg:mb-4  text-alternative">
					Categorías destacadas
				</h2>
				<div className="relative h-52 lg:h-96 w-full rounded-lg  bg-secondary-light animate-pulse"></div>
			</div>

			<div className="px-3 mt-3">
				<div className="my-8">
					<h2 className="text-xl flex flex-row items-center gap-2 w-full border-b pb-6 border-alternative/20  lg:text-2xl  font-bold mb-8  text-alternative">
						<Star size={24} />
						Productos destacados
					</h2>
					<Carousel
						opts={{
							loop: true,
						}}
						className="w-full"
					>
						<CarouselContent>
							{[1, 2, 3, 4, 5].map((index) => (
								<CarouselItem
									key={index}
									className="basis-1/2 md:basis-1/3 lg:basis-1/5"
								>
									<div className="flex flex-1  h-[325px] lg:h-[360px] rounded-md bg-secondary-light animate-pulse" />
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</div>

			<div className="px-3 mt-3">
				<InfoCards />
			</div>

			<div className="px-3 mt-3">
				<div className="my-8">
					<h2 className="text-xl flex flex-row items-center gap-2 w-full border-b pb-6 border-alternative/20  lg:text-2xl  font-bold mb-8  text-alternative">
						<TabletSmartphone size={24} />
						Smartphones
					</h2>
					<Carousel
						opts={{
							loop: true,
						}}
						className="w-full"
					>
						<CarouselContent>
							{[1, 2, 3, 4, 5].map((index) => (
								<CarouselItem
									key={index}
									className="basis-1/2 md:basis-1/3 lg:basis-1/5"
								>
									<div className="flex flex-1  h-[325px] lg:h-[360px] rounded-md bg-secondary-light animate-pulse" />
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</div>

			<div className="px-3 mt-3">
				<div className="my-8">
					<h2 className="text-xl flex flex-row items-center gap-2 w-full border-b pb-6 border-alternative/20  lg:text-2xl  font-bold mb-8  text-alternative">
						<Laptop size={24} />
						Computadoras
					</h2>
					<Carousel
						opts={{
							loop: true,
						}}
						className="w-full"
					>
						<CarouselContent>
							{[1, 2, 3, 4, 5].map((index) => (
								<CarouselItem
									key={index}
									className="basis-1/2 md:basis-1/3 lg:basis-1/5"
								>
									<div className="flex flex-1  h-[325px] lg:h-[360px] rounded-md bg-secondary-light animate-pulse" />
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</div>
		</div>
	);
};
