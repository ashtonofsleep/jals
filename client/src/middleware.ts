import { NextRequest, NextResponse } from 'next/server'
import {getCookie, refreshCookie, deleteCookie} from "@lib/auth/session.cookies";
import {TSessionCookie} from "@lib/auth/session.types";
import {getSession} from "@ctx/auth/auth.utils.server";

const protectedRoutes = ['/dashboard']
const authRoutes = ['/login', '/register']

export default async function middleware(req: NextRequest) {
	/**
	 * Session cookie handling
	 */

	// Set up types and defaults
	let cookie: TSessionCookie = null;
	let currentSession: any = null;
	let isAuthenticated: boolean = false;
	let isAdmin: boolean = false

	// Get session cookie
	cookie = await getCookie();

	// If session cookie valid, confirm with API
	if (cookie && cookie?.sessionId) {
		// Fetch current session data
		currentSession = await getSession(cookie);

		if (currentSession) {
			// Current session is defined, so API confirmed valid session and refreshed it
			await refreshCookie()
			isAuthenticated = true;
			isAdmin = (currentSession.isAdmin);
		} else {
			// No current user, delete session cookie
			await deleteCookie();
		}
	}

	/**
	 * Authorization and route protection
	 */

	const path = req.nextUrl.pathname
	const isProtectedRoute = protectedRoutes.includes(path)
	const isAuthRoute = authRoutes.includes(path)

	if (isProtectedRoute && !isAuthenticated) {
		return NextResponse.redirect(new URL('/login', req.nextUrl))
	}

	if (
		isAuthRoute &&
		isAuthenticated &&
		!req.nextUrl.pathname.startsWith('/dashboard')
	) {
		return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
	}

	return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}