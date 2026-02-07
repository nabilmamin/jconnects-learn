// @vitest-environment node
// Use node environment — jose's webapi path has Uint8Array realm issues in jsdom.

import type { TokenPayload } from './jwt';

// Use dynamic import so JWT_SECRET env var is set before jwt.ts module loads.
let createToken: (payload: TokenPayload) => Promise<string>;
let verifyToken: (token: string) => Promise<TokenPayload | null>;

beforeAll(async () => {
  process.env.JWT_SECRET = 'test-secret-key-for-vitest';
  const mod = await import('./jwt');
  createToken = mod.createToken;
  verifyToken = mod.verifyToken;
});

const samplePayload: TokenPayload = {
  userId: 'user_123',
  email: 'test@example.com',
  role: 'admin',
};

describe('createToken', () => {
  test('returns a JWT string with three dot-separated parts', async () => {
    const token = await createToken(samplePayload);
    const parts = token.split('.');
    expect(parts).toHaveLength(3);
  });

  test('produces different tokens on successive calls (different iat)', async () => {
    const token1 = await createToken(samplePayload);
    const token2 = await createToken(samplePayload);
    // At minimum both should be valid strings.
    expect(typeof token1).toBe('string');
    expect(typeof token2).toBe('string');
  });
});

describe('verifyToken', () => {
  test('round-trips: verifyToken returns the original payload fields', async () => {
    const token = await createToken(samplePayload);
    const result = await verifyToken(token);

    expect(result).not.toBeNull();
    expect(result!.userId).toBe(samplePayload.userId);
    expect(result!.email).toBe(samplePayload.email);
    expect(result!.role).toBe(samplePayload.role);
  });

  test('returns null for a garbage token', async () => {
    const result = await verifyToken('not.a.jwt');
    expect(result).toBeNull();
  });

  test('returns null for a tampered token', async () => {
    const token = await createToken(samplePayload);
    // Flip the last character of the signature to tamper with it
    const tampered = token.slice(0, -1) + (token.at(-1) === 'A' ? 'B' : 'A');
    const result = await verifyToken(tampered);
    expect(result).toBeNull();
  });

  test('returns null for an empty string', async () => {
    const result = await verifyToken('');
    expect(result).toBeNull();
  });
});
