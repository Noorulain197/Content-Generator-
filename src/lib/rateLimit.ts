import { RateLimiterMemory } from "rate-limiter-flexible";

const points = Number(process.env.RATE_POINTS || 30);
const duration = Number(process.env.RATE_DURATION || 60);

const limiter = new RateLimiterMemory({ points, duration });

export async function limit(ip: string) {
  try {
    await limiter.consume(ip);
    return { ok: true } as const;
  } catch {
    return { ok: false } as const;
  }
}