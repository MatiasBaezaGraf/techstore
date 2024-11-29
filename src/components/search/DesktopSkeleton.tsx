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
			<div className="flex flex-row justify-between items-center h-24 mb-10 rounded-md bg-secondary-light w-full animate-pulse" />

			<div className="mb-8 flex flex-row gap-5">
				<div className="flex flex-col gap-3 w-[20%]">
					<div className="w-full h-10 animate-pulse rounded bg-secondary-light" />
					<div className="w-full h-10 animate-pulse rounded bg-secondary-light" />
					<div className="w-full h-10 animate-pulse rounded bg-secondary-light" />
					<div className="w-full h-10 animate-pulse rounded bg-secondary-light" />
					<div className="w-full h-10 animate-pulse rounded bg-secondary-light" />
					<div className="w-full h-10 animate-pulse rounded bg-secondary-light" />
				</div>
				<div className="flex flex-col justify-between w-[80%]">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
						<div className="h-[335px] animate-pulse w-full bg-secondary-light rounded-md" />
						<div className="h-[335px] animate-pulse w-full bg-secondary-light rounded-md" />
						<div className="h-[335px] animate-pulse w-full bg-secondary-light rounded-md" />
						<div className="h-[335px] animate-pulse w-full bg-secondary-light rounded-md" />
						<div className="h-[335px] animate-pulse w-full bg-secondary-light rounded-md" />
						<div className="h-[335px] animate-pulse w-full bg-secondary-light rounded-md" />
						<div className="h-[335px] animate-pulse w-full bg-secondary-light rounded-md" />
						<div className="h-[335px] animate-pulse w-full bg-secondary-light rounded-md" />
					</div>
				</div>
			</div>
		</div>
	);
};
