// src/middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	const protectedRoutes = [
		"/trips",
		"/reservations",
		"/account",
		"/properties",
		"/listing",
	];

	const url = req.nextUrl.clone();

	if (protectedRoutes.includes(url.pathname)) {
		if (!token) {
			url.pathname = "/login";
			return NextResponse.redirect(url);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/trips", "/reservations", "/account", "/properties", "/listing"],
};
