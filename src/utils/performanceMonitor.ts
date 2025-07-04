/**
 * Performance Monitor
 * 
 * Tracks FPS and performance metrics for optimization
 */

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private frameCount: number = 0;
  private lastTime: number = 0;
  private fps: number = 0;
  private fpsHistory: number[] = [];
  private enabled: boolean = false;

  private constructor() {}

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  public enable(enabled: boolean): void {
    this.enabled = enabled;
    if (enabled) {
      this.lastTime = performance.now();
    }
  }

  public update(): void {
    if (!this.enabled) return;

    this.frameCount++;
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;

    if (deltaTime >= 1000) { // Update FPS every second
      this.fps = Math.round((this.frameCount * 1000) / deltaTime);
      this.fpsHistory.push(this.fps);
      
      // Keep only last 10 seconds of FPS data
      if (this.fpsHistory.length > 10) {
        this.fpsHistory.shift();
      }

      this.frameCount = 0;
      this.lastTime = currentTime;
    }
  }

  public getFPS(): number {
    return this.fps;
  }

  public getAverageFPS(): number {
    if (this.fpsHistory.length === 0) return 0;
    return Math.round(this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length);
  }

  public getMinFPS(): number {
    return this.fpsHistory.length > 0 ? Math.min(...this.fpsHistory) : 0;
  }

  public getMaxFPS(): number {
    return this.fpsHistory.length > 0 ? Math.max(...this.fpsHistory) : 0;
  }

  public getPerformanceReport(): {
    current: number;
    average: number;
    min: number;
    max: number;
    status: string;
  } {
    const avg = this.getAverageFPS();
    let status = 'Unknown';
    
    if (avg >= 55) status = 'Excellent';
    else if (avg >= 45) status = 'Good';
    else if (avg >= 30) status = 'Fair';
    else if (avg >= 20) status = 'Poor';
    else status = 'Very Poor';

    return {
      current: this.getFPS(),
      average: avg,
      min: this.getMinFPS(),
      max: this.getMaxFPS(),
      status
    };
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
