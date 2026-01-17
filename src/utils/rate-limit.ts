export interface RateLimitConfig {
    interval: number; // Interval in milliseconds
    uniqueTokenPerInterval: number; // Max number of unique tokens per interval
}

export class RateLimit {
    private tokens: Map<string, number[]>;
    private config: RateLimitConfig;

    constructor(config: RateLimitConfig) {
        this.config = config;
        this.tokens = new Map();
    }

    check(limit: number, token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const now = Date.now();
            const windowStart = now - this.config.interval;

            const limits = this.tokens.get(token) ?? [];

            // Filter out timestamps older than the window
            const validLimits = limits.filter((timestamp) => timestamp > windowStart);

            if (validLimits.length >= limit) {
                reject(new Error("Rate limit exceeded"));
            } else {
                validLimits.push(now);
                this.tokens.set(token, validLimits);

                // Cleanup old tokens (simple optimization)
                if (this.tokens.size > this.config.uniqueTokenPerInterval) {
                    // naive cleanup: clear everything if map gets too big to prevent memory leak
                    // A better approach would be an LRU cache, but this suffices for simple use cases
                    this.tokens.clear();
                    this.tokens.set(token, validLimits);
                }

                resolve();
            }
        });
    }
}

export const rateLimiter = new RateLimit({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 1000, // Max 1000 users per minute
});
