import { NextRequest, NextResponse } from "next/server";
import { getAuthToken, getUserData } from "./lib/cookie";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = await getAuthToken();
    const user = token ? await getUserData() : null;

    // 1. Protected /admin routes
    if (pathname.startsWith('/admin')) {
        if (!token || !user || user.role !== 'admin') {
            // If they are logged in but NOT admin, send to dashboard
            // If they are not logged in at all, send to login
            const redirectUrl = token ? '/dashboard' : '/login';
            return NextResponse.redirect(new URL(redirectUrl, request.url));
        }
    }

    // 2. Protected /dashboard, /user and /profile routes
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/user') || pathname.startsWith('/profile')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // // 3. Public routes (login/register) - Redirect to home if already logged in
    // if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    //     if (token) {
    //         return NextResponse.redirect(new URL('/dashboard', request.url));
    //     }
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/dashboard/:path*',
        '/user/:path*',
        '/profile/:path*',
        '/login',
        '/register'
    ]
}