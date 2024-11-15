import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	// Si el usuario accede a la raíz, redirigir a /home
	if (request.nextUrl.pathname === "/") {
		const url = request.nextUrl.clone();
		url.pathname = "/home";
		return NextResponse.redirect(url);
	}

	// Continuar con la solicitud si no es la raíz
	return NextResponse.next();
}

export const config = {
	matcher: "/",
};
