import { hashPassword, verifyPassword } from './auth';

describe('hashPassword', () => {
  test('returns a hash that is not the original password', async () => {
    const hash = await hashPassword('mypassword');
    expect(hash).not.toBe('mypassword');
  });

  test('returns a bcrypt hash string', async () => {
    const hash = await hashPassword('mypassword');
    // bcrypt hashes always start with $2b$ and are 60 characters
    expect(hash).toMatch(/^\$2[ab]\$/);
    expect(hash).toHaveLength(60);
  });

  test('produces different hashes for the same password', async () => {
    const hash1 = await hashPassword('mypassword');
    const hash2 = await hashPassword('mypassword');
    expect(hash1).not.toBe(hash2);
  });
});

describe('verifyPassword', () => {
  test('returns true for correct password', async () => {
    const hash = await hashPassword('mypassword');
    const result = await verifyPassword('mypassword', hash);
    expect(result).toBe(true);
  });

  test('returns false for wrong password', async () => {
    const hash = await hashPassword('mypassword');
    const result = await verifyPassword('wrongpassword', hash);
    expect(result).toBe(false);
  });
});
