"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { login } from "@/app/login/actions";
import { Alert, AlertDescription } from "../ui/alert";
import { Loader2Icon } from "lucide-react";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({
		message: "",
		show: false,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		setLoading(true);

		e.preventDefault();

		const formData = new FormData();

		formData.append("email", email);
		formData.append("password", password);

		const res = await login(formData);

		if (res.error) {
			setError({
				message: "Email o contraseña incorrectos.",
				show: true,
			});
		}

		setLoading(false);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						Iniciar sesión
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						{error.show && (
							<Alert variant="destructive">
								<AlertDescription>{error.message}</AlertDescription>
							</Alert>
						)}
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<Button type="submit" className="w-full" disabled={loading}>
							{loading && <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />}
							Login
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Link href="/home" className="text-sm text-blue-600 hover:underline">
						Ir a la página de inicio
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
