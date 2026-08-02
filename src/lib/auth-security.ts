import argon2 from "argon2";

export function assertAuthSecret(environment = process.env) {
  const secret = environment.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET must contain at least 32 characters");
  }
  return secret;
}

export async function verifyPassword(hash: string, password: string) {
  try {
    return await argon2.verify(hash, password, { type: argon2.argon2id });
  } catch {
    return false;
  }
}

export function safeRedirect(target: string | null | undefined, origin: string) {
  if (!target) return `${origin}/admin`;
  try {
    const url = new URL(target, origin);
    return url.origin === origin ? url.toString() : `${origin}/admin`;
  } catch {
    return `${origin}/admin`;
  }
}

type Bucket = { attempts: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function consumeLoginAttempt(key: string, now = Date.now()) {
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { attempts: 1, resetAt: now + 15 * 60_000 });
    return true;
  }
  if (current.attempts >= 5) return false;
  current.attempts += 1;
  return true;
}

export function resetLoginAttempts() {
  buckets.clear();
}
