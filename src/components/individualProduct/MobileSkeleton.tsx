export const MobileSkeleton = () => {
	return (
		<div className="container mx-auto p-4 flex flex-col gap-3 py-8 min-h-withNav justify-start items-start  ">
			<div className="bg-secondary-light w-full mb-3 h-10 animate-pulse rounded"></div>
			<div className="bg-secondary-light w-full mb-3 aspect-square animate-pulse rounded"></div>
			<div className="bg-secondary-light w-1/3 h-4 animate-pulse rounded"></div>
			<div className="bg-secondary-light w-2/3 h-6 animate-pulse rounded"></div>
			<div className="bg-secondary-light w-1/5 h-6 animate-pulse rounded"></div>
			<div className="bg-secondary-light w-1/2 h-6 animate-pulse rounded mb-3"></div>
			<div className="bg-secondary-light w-full h-10 animate-pulse rounded"></div>
		</div>
	);
};
