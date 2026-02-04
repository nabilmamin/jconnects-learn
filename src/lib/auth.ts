import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { getUserById } from '@/lib/db';
import { createToken, verifyToken } from '@/lib/jwt';

// Re-export JWT functions so existing imports still work
export { createToken, verifyToken };

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

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

    return { id: user.id, email: user.email, name: user.name, role: user.role };

}
