import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// To logout, just delete the token
export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete('token');

    return NextResponse.json({ success: true });
}