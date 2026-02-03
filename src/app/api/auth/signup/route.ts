import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, createToken } from '@/lib/auth';
import { createUser, getUserByEmail } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
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

    // Creawte JWT
    const token = await createToken({ userId: user.id, email: user.email });

    // Set HTTP Only Cookie
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    });

    // Return success (don't send password_hash!)
    return NextResponse.json({
        user: { id: user.id, email: user.email, name: user.name }
    });
}

