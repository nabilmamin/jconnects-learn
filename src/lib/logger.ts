/**
 * Simple logging utility
 *
 * In production, you'd replace console calls with a service like:
 * - Sentry (error tracking)
 * - LogRocket (session replay)
 * - Datadog (full observability)
 *
 * For now, we use console with structured output.
 */

type LogLevel = 'info' | 'warn' | 'error';

interface LogContext {
    [key: string]: unknown;
}

function formatLog(level: LogLevel, message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    return {
        timestamp,
        level,
        message,
        ...context,
    };
}

export const logger = {
    info(message: string, context?: LogContext) {
        console.log(JSON.stringify(formatLog('info', message, context)));
    },

    warn(message: string, context?: LogContext) {
        console.warn(JSON.stringify(formatLog('warn', message, context)));
    },

    error(message: string, error?: Error, context?: LogContext) {
        console.error(JSON.stringify(formatLog('error', message, {
            ...context,
            errorName: error?.name,
            errorMessage: error?.message,
            stack: error?.stack,
        })));
    },
};
