"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, Loader2 } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export function DollarRateAdjuster({
	dollarRate,
	updateDollarRate,
}: {
	dollarRate: number | null;
	updateDollarRate: (rate: number) => Promise<number>;
}) {
	const [rate, setRate] = useState<number | null>(dollarRate);
	const [newRate, setNewRate] = useState<number | null>(null);

	const handleUpdate = () => {
		if (newRate) {
			setRate(null);

			updateDollarRate(newRate).then((rate) => {
				setRate(rate);
			});
		}
	};

	useEffect(() => {
		setRate(dollarRate);
	}, [dollarRate]);

	if (rate === null) {
		return (
			<Button variant="outline" className="gap-2">
				<DollarSign className="h-4 w-4" />
				USD/ARS:
				<Loader2 size={10} className="mx-auto animate-spin" />
			</Button>
		);
	}

	// return (
	// 	<Popover open={isOpen} onOpenChange={setIsOpen}>
	// 		<PopoverTrigger asChild>
	// 			<Button variant="outline" className="gap-2">
	// 				<DollarSign className="h-4 w-4" />
	// 				USD/ARS: {rate}
	// 			</Button>
	// 		</PopoverTrigger>
	// 		<PopoverContent className="w-80">
	// 			<div className="grid gap-4">
	// 				<div className="space-y-2">
	// 					<h4 className="font-medium leading-none">Tasa USD/ARS</h4>
	// 					<p className="text-sm text-muted-foreground">
	// 						Ajusta el valor del dólar para calcular precios en pesos
	// 					</p>
	// 				</div>
	// 				<div className="flex gap-2">
	// 					<Input
	// 						type="number"
	// 						defaultValue={rate}
	// 						onChange={(e) => setNewRate(Number(e.target.value))}
	// 						className="flex-1"
	// 					/>
	// 					<Button onClick={handleUpdate}>Guardar</Button>
	// 				</div>
	// 			</div>
	// 		</PopoverContent>
	// 	</Popover>
	// );

	return (
		<Sheet>
			<div
				className={`flex items-center bg-white mb-4 w-fit border rounded-md`}
			>
				<SheetTrigger asChild>
					<Button variant="outline" className="gap-2">
						<DollarSign className="h-4 w-4" />
						USD/ARS: {rate}
					</Button>
				</SheetTrigger>
			</div>

			<SheetContent side="right" className="min-h-screen">
				<SheetHeader>
					<SheetTitle>Tasa USD/ARS</SheetTitle>
					<SheetDescription>
						Ajusta el valor del dólar para calcular precios en pesos.
					</SheetDescription>
				</SheetHeader>

				<div className="flex gap-2 py-4">
					<Input
						type="number"
						defaultValue={rate}
						onChange={(e) => setNewRate(Number(e.target.value))}
						className="flex-1"
					/>
					<Button onClick={handleUpdate}>Guardar</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
