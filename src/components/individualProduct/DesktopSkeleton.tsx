export const DesktopSkeleton = () => {
	return (
		<div className="min-h-withNav p-3 md:p-0 flex w-full max-w-[1160px] mx-auto  flex-col ">
			<div className="flex flex-row items-center w-full pt-4  ">
				<div className="h-32 w-32 m-4 rounded-md animate-pulse bg-secondary-light" />

				<div className="relative  w-full mx-auto max-w-2xl">
					<div className="w-full h-10  bg-secondary-light  rounded-md animate-pulse" />
				</div>
				<div className="w-[160px] hidden md:block" />
			</div>
			<div className="flex flex-row justify-between items-center h-24 mb-8 rounded-md bg-secondary-light w-full animate-pulse" />
			<div className="h-6 w-1/3 rounded-md bg-secondary-light animate-pulse" />
			<div className="flex flex-row justify-bewteen justify-bewteen items-start gap-8 py-4">
				<div className="basis-1/2 aspect-square bg-secondary-light rounded-md animate-pulse" />
				<div className="basis-1/2 flex flex-col items-start gap-3">
					<div className="h-6 w-1/3 rounded-md bg-secondary-light animate-pulse" />
					<div className="h-4 w-2/3 rounded-md bg-secondary-light animate-pulse" />
					<div className="h-8 w-1/3 rounded-md bg-secondary-light animate-pulse mt-3" />
					<div className="h-4 w-1/5 rounded-md bg-secondary-light animate-pulse mb-3" />
					<div className="h-20 w-full rounded-md bg-secondary-light animate-pulse" />
					<div className="h-10 w-full rounded-md bg-secondary-light animate-pulse" />
					<div className="h-4 w-1/2 rounded-md bg-secondary-light animate-pulse mx-auto" />
				</div>
			</div>
		</div>
	);
};
