export const MobileSkeleton = () => {
	return (
		<div className="container mx-auto p-4 flex flex-col gap-3 min-h-withNav justify-center items-center  ">
			<div className="bg-secondary-light w-full h-10 animate-pulse rounded"></div>
			<div className="w-full flex flex-row gap-3">
				<div className="bg-secondary-light w-full h-10 animate-pulse rounded"></div>
				<div className="bg-secondary-light w-full h-10 animate-pulse rounded"></div>
			</div>
			<div className="w-full flex flex-col gap-3 mt-3">
				<div className="w-full flex flex-row gap-3">
					<div className=" bg-secondary-light w-full h-80 animate-pulse rounded"></div>
					<div className=" bg-secondary-light w-full h-80 animate-pulse rounded"></div>
				</div>
				<div className="w-full flex flex-row gap-3">
					<div className="bg-secondary-light w-full h-80 animate-pulse rounded"></div>
					<div className="bg-secondary-light w-full h-80 animate-pulse rounded"></div>
				</div>
				<div className="w-full flex flex-row gap-3">
					<div className="bg-secondary-light w-full h-80 animate-pulse rounded"></div>
					<div className="bg-secondary-light w-full h-80 animate-pulse rounded"></div>
				</div>
			</div>
			<div className="w-full flex flex-row justify-center gap-3 mt-8">
				<div className="bg-secondary-light h-10 aspect-square animate-pulse rounded"></div>
				<div className="bg-secondary-light h-10 aspect-square  animate-pulse rounded"></div>
				<div className="bg-secondary-light h-10 aspect-square  animate-pulse rounded"></div>
			</div>
		</div>
	);
};
