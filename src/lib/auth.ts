import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { getUserById } from '@/lib/db';

const SALT_ROUNDS=10;

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

type TokenPayload = {
    userId: string;
    email: string;
};

export async function createToken(payload: TokenPayload): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256'})
        .setExpirationTime('7d')
        .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as TokenPayload;
    } catch {
        return null;
    }
};

// Check who is currently logged in
export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return null;
    }

    const payload = await verifyToken(token);
    if (!payload) { 
        return null;
    }

    const user = await getUserById(payload.userId);
    if (!user) {
        return null; 
    }

    return { id: user.id, email: user.email, name: user.name };

}
