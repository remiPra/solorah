import { randomBytes } from 'crypto';

// In-memory store for admin session tokens
// Tokens expire after 7 days. On server restart, admin must re-login (acceptable).
const validTokens = new Map<string, number>(); // token -> expiry timestamp
const TOKEN_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

// Rate limiting: track failed attempts per IP
const failedAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

export function generateAdminToken(): string {
  // Clean expired tokens
  const now = Date.now();
  for (const [token, expiry] of validTokens) {
    if (now > expiry) validTokens.delete(token);
  }

  const token = randomBytes(32).toString('hex');
  validTokens.set(token, now + TOKEN_TTL);
  return token;
}

export function isValidAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  const expiry = validTokens.get(token);
  if (!expiry) return false;
  if (Date.now() > expiry) {
    validTokens.delete(token);
    return false;
  }
  return true;
}

export function isRateLimited(ip: string): boolean {
  const entry = failedAttempts.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.lastAttempt > LOCKOUT_MS) {
    failedAttempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

export function recordFailedAttempt(ip: string): void {
  const entry = failedAttempts.get(ip);
  const now = Date.now();
  if (!entry || now - entry.lastAttempt > LOCKOUT_MS) {
    failedAttempts.set(ip, { count: 1, lastAttempt: now });
  } else {
    entry.count++;
    entry.lastAttempt = now;
  }
}

export function clearFailedAttempts(ip: string): void {
  failedAttempts.delete(ip);
}
