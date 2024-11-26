import {
	MessageCircle,
	Instagram,
	AlertCircle,
	DollarSign,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const InfoCards = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-secondary'dark rounded-lg border border-alternative/20">
			<Card className="border-none bg-transparent">
				<CardContent className="flex items-start gap-4 p-2">
					<MessageCircle className="h-6 w-6 text-accent" />
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none text-white">
							WhatsApp
						</p>
						<p className="text-sm text-gray-400">
							Consultas y pedidos por WhatsApp
						</p>
					</div>
				</CardContent>
			</Card>

			<Card className="border-none bg-transparent">
				<CardContent className="flex items-start gap-4 p-2">
					<Instagram className="h-6 w-6 text-accent" />
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none text-white">
							Instagram
						</p>
						<p className="text-sm text-gray-400">
							También por mensaje directo en Instagram
						</p>
					</div>
				</CardContent>
			</Card>

			<Card className="border-none bg-transparent">
				<CardContent className="flex items-start gap-4 p-2">
					<AlertCircle className="h-6 w-6 text-accent" />
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none text-white">
							Importante
						</p>
						<p className="text-sm text-gray-400">
							No realizamos ventas por otros medios
						</p>
					</div>
				</CardContent>
			</Card>

			<Card className="border-none bg-transparent">
				<CardContent className="flex items-start gap-4 p-2">
					<DollarSign className="h-6 w-6 text-accent" />
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none text-white">
							Precios
						</p>
						<p className="text-sm text-gray-400">
							Sujetos a cambios sin previo aviso
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
