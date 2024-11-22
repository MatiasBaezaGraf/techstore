import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./app/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
	// console.log("middleware.ts");
	const url = request.nextUrl.clone();

	// Si el usuario accede a la raíz, redirigir a /home
	if (request.nextUrl.pathname === "/") {
		console.log("middleware.ts: redirecting to /home");
		url.pathname = "/home";
		return NextResponse.redirect(url);
	}

	// Añade protección de autenticación a /dashboard
	// if (request.nextUrl.pathname === "/") {

	if (url.pathname.startsWith("/dashboard")) {
		return await updateSession(request);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/dashboard/:path*"],
};
