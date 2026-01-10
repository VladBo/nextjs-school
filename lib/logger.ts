/* eslint-disable no-console */

/**
 * Simple logger utility that wraps console methods.
 * Allows centralized logging configuration.
 */
export const logger = {
  info: (...args: unknown[]) => console.log(...args),
  warn: (...args: unknown[]) => console.warn(...args),
  error: (...args: unknown[]) => console.error(...args),
  debug: (...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(...args);
    }
  },
};
