import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

// Routes that require authentication
const protectedRoutes = ['/account', '/tickets'];

// Routes that require specific roles
const roleRoutes: Record<string, ('coordinator' | 'admin')[]> = {
    '/admin': ['admin'],
    '/coordinator': ['coordinator', 'admin'],
};

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Check if this path needs protection
    const needsAuth = protectedRoutes.some(route => path.startsWith(route));
    const requiredRoles = Object.entries(roleRoutes).find(([route]) =>
        path.startsWith(route)
    )?.[1];

    // If no protection needed, continue
    if (!needsAuth && !requiredRoles) {
        return NextResponse.next();
    }

    // Get token from cookie
    const token = request.cookies.get('token')?.value;

    if (!token) {
        // Not logged in - redirect to login
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', path);
        return NextResponse.redirect(loginUrl);
    }

    // Verify token and get payload
    const payload = await verifyToken(token);

    if (!payload) {
        // Invalid token - redirect to login
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', path);
        return NextResponse.redirect(loginUrl);
    }

    // If role-protected, check role
    if (requiredRoles) {
        const userRole = payload.role as string;

        if (!requiredRoles.includes(userRole as 'coordinator' | 'admin')) {
            // User doesn't have required role - show 403
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
    }

    // All checks passed
    return NextResponse.next();
}

// Configure which routes middleware runs on
export const config = {
    matcher: [
        '/account/:path*',
        '/tickets/:path*',
        '/admin/:path*',
        '/coordinator/:path*',
    ],
};
