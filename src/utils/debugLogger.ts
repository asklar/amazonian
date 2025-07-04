/**
 * Debug Logger Utility
 * 
 * Provides conditional logging that only outputs when debug mode is enabled.
 * This helps improve performance in production builds by eliminating console output.
 */

export class DebugLogger {
  private static instance: DebugLogger;
  private debugMode: boolean = false;

  private constructor() {}

  public static getInstance(): DebugLogger {
    if (!DebugLogger.instance) {
      DebugLogger.instance = new DebugLogger();
    }
    return DebugLogger.instance;
  }

  public setDebugMode(enabled: boolean): void {
    this.debugMode = enabled;
  }

  public log(...args: any[]): void {
    if (this.debugMode) {
      console.log(...args);
    }
  }

  public warn(...args: any[]): void {
    if (this.debugMode) {
      console.warn(...args);
    }
  }

  public error(...args: any[]): void {
    if (this.debugMode) {
      console.error(...args);
    }
  }

  public info(...args: any[]): void {
    if (this.debugMode) {
      console.info(...args);
    }
  }

  public debug(...args: any[]): void {
    if (this.debugMode) {
      console.debug(...args);
    }
  }
}

// Global debug logger instance
export const debugLogger = DebugLogger.getInstance();

// Convenience function for conditional logging
export const debugLog = (...args: any[]) => debugLogger.log(...args);
export const debugWarn = (...args: any[]) => debugLogger.warn(...args);
export const debugError = (...args: any[]) => debugLogger.error(...args);
export const debugInfo = (...args: any[]) => debugLogger.info(...args);
