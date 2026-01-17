export class LoginRateLimit {
    private attempts: Map<string, { count: number; lockedUntil: number | null }>;
    private readonly maxAttempts: number;
    private readonly lockDuration: number;

    // Constructor with default values for maxAttempts and lockDuration (10 attempts and 15 minutes)
    constructor(maxAttempts = 10, lockDuration = 15 * 60 * 1000) {
        this.attempts = new Map();
        this.maxAttempts = maxAttempts;
        this.lockDuration = lockDuration;
    }

    check(ip: string): void {
        const record = this.attempts.get(ip);

        if (!record) return;

        if (record.lockedUntil && Date.now() < record.lockedUntil) {
            throw new Error("Too many failed attempts. Please try again in 15 minutes.");
        }

        // specific cleanup if lock expired
        if (record.lockedUntil && Date.now() > record.lockedUntil) {
            this.attempts.delete(ip);
        }
    }

    registerFailure(ip: string): void {
        const record = this.attempts.get(ip) ?? { count: 0, lockedUntil: null };

        // Check if already locked (should have been caught by check, but safety first)
        if (record.lockedUntil && Date.now() < record.lockedUntil) return;

        record.count += 1;

        if (record.count >= this.maxAttempts) {
            record.lockedUntil = Date.now() + this.lockDuration;
        }

        this.attempts.set(ip, record);
    }

    reset(ip: string): void {
        this.attempts.delete(ip);
    }
}

const globalForLoginLimiter = globalThis as unknown as {
    loginLimiter: LoginRateLimit | undefined;
};

export const loginLimiter =
    globalForLoginLimiter.loginLimiter ?? new LoginRateLimit(10, 15 * 60 * 1000);

if (process.env.NODE_ENV !== "production") globalForLoginLimiter.loginLimiter = loginLimiter;
