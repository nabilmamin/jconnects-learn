import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createToken } from '@/lib/auth';
import { getUserByEmail } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json(
            { error: 'Email and password are required' },
            { status: 400 }
        );
    }

    const user = await getUserByEmail(email);
    if (!user) {
        return NextResponse.json(
            { error: 'Invalid email or password' },
            { status: 401 }
        );
    }

    const validPassword = await verifyPassword(password, user.password_hash);
    if (!validPassword) {
        return NextResponse.json(
            { error: 'Invalid email or password' },
            { status: 401 }
        );
    }

    const token = await createToken({ userId: user.id, email: user.email });

    const cookieStore = await cookies();
    cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
        user: { id: user.id, email: user.email, name: user.name }
    })
}