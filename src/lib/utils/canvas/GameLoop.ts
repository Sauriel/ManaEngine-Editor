export default class GameLoop {
  private fps: number;
  private frameDuration: number;
  private lastTime: number;
  private accumulatedTime: number;
  private animationFrameId: number | null = null;
  private renderCallbacks: Array<() => void> = [];

  constructor(fps: number) {
    this.fps = fps;
    this.frameDuration = 1000 / fps;
    this.lastTime = 0;
    this.accumulatedTime = 0;
  }

  private update(deltaTime: number): void {
    // Hier kommt die Logik deines Spiels hin (z.B. Bewegung, Kollisionsabfragen)
    console.log(`Updating game logic with deltaTime: ${deltaTime}ms`);
  }

  private render(): void {
    // Alle registrierten Render-Funktionen aufrufen
    for (const callback of this.renderCallbacks) {
      callback();
    }
  }

  private loop = (currentTime: number): void => {
    if (!this.lastTime) {
      this.lastTime = currentTime;
    }

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime >= this.frameDuration) {
      this.update(this.frameDuration);
      this.accumulatedTime -= this.frameDuration;
    }

    this.render();

    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  public start(): void {
    if (this.animationFrameId === null) {
      this.lastTime = 0;
      this.animationFrameId = requestAnimationFrame(this.loop);
    }
  }

  public stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public addRenderCallback(callback: () => void): void {
    this.renderCallbacks.push(callback);
  }

  public removeRenderCallback(callback: () => void): void {
    this.renderCallbacks = this.renderCallbacks.filter((cb) => cb !== callback);
  }

  // Die isRunning Methode
  public isRunning(): boolean {
    return this.animationFrameId !== null;
  }
}
