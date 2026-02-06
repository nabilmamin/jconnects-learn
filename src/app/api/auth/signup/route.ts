import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, createToken } from '@/lib/auth';
import { createUser, getUserByEmail } from '@/lib/db';
import { cookies } from 'next/headers';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
    try {
        // Destructure the request body
        const { email, password, name } = await request.json();

        // Validate required inputs are being passed through
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: 'Email, password, and name are required' },
                { status: 400 }
            );
        }

        // Check if the user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        // Hash password and create user
        const passwordHash = await hashPassword(password);
        const user = await createUser(email, passwordHash, name);

        // Create JWT (new users default to 'public' role)
        const token = await createToken({ userId: user.id, email: user.email, role: user.role });

        // Set HTTP Only Cookie
        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
        });

        logger.info('User signed up', { userId: user.id });

        // Return success (don't send password_hash!)
        return NextResponse.json({
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });
    } catch (error) {
        logger.error('Signup failed', error instanceof Error ? error : new Error(String(error)), {
            route: 'POST /api/auth/signup',
        });
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}

