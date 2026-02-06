import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { logger } from '@/lib/logger';

// To logout, just delete the token
export async function POST() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('token');

        return NextResponse.json({ success: true });
    } catch (error) {
        logger.error('Logout failed', error instanceof Error ? error : new Error(String(error)), {
            route: 'POST /api/auth/logout',
        });
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}