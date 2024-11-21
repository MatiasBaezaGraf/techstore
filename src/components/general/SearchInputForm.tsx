"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SearchInputForm = () => {
	const [inputValue, setInputValue] = useState("");

	const router = useRouter();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();

		// Redirect to /search with name=inputvalue
		router.push(`/search?name=${inputValue}`);
	};

	return (
		<form className="relative" onSubmit={handleSearch}>
			<button
				type="submit"
				className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-alternative"
			>
				<Search />
			</button>
			<Input
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				type="search"
				placeholder="Buscar productos..."
				className="w-full pl-10 bg-secondary-light border-accent text-alternative placeholder-neutral-400 focus:border-accent"
			/>
		</form>
	);
};
