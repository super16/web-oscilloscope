export default class Wave {
  /**
   * Calculating y-points to form a wave by x-point.
   * Adds noise and consider cutoff level.
   * @param {number} amplitude - Amplitude of wave.
   * @param {number} cutoff - Cutoff level.
   * @param {number} frequency - Frequency of wave.
   * @param {number} height - The height of canvas.
   * @param {number} noise - Noise level.
   */
  constructor(
    private amplitude: number,
    private cutoff: number,
    private frequency: number,
    private height: number,
    private noise: number,
  ) {}

  /**
   * Calculate y-point for sinusoidal wave.
   * @param x The x-point value.
   * @return The y-point value.
   */
  sine(x: number): number {
    x += this.randomNoise();
    let y = this.height / 2 + (this.amplitude
      * Math.sin((2 * Math.PI * x) / this.frequency));
    y = this.cutoffFilter(y);
    y += this.randomNoise();
    return y;
  }

  /**
   * Calculate y-point for square wave.
   * @param x The x-point value.
   * @return The y-point value.
   */
  square(x: number): number {
    x += this.randomNoise();
    let y = this.height / 2
      + Math.sign(Math.sin((2 * Math.PI * x) / this.frequency))
      * this.amplitude;
    y = this.cutoffFilter(y);
    y += this.randomNoise();
    return y;
  }

  /**
   * Calculate y-point for triangular wave.
   * @param x The x-point value.
   * @return The y-point value.
   */
  triangle(x: number): number {
    x += this.randomNoise();
    let y = this.height / 2 + (4 * (this.amplitude / this.frequency))
      * Math.abs(((((x - this.frequency / 4) % this.frequency)
      + this.frequency) % this.frequency) - (this.frequency / 2)) - this.amplitude;
    y = this.cutoffFilter(y);
    y += this.randomNoise();
    return y;
  }

  /**
   * Calculate y-point for sawtooth wave.
   * @param x The x-point value.
   * @return The y-point value.
   */
  saw(x: number): number {
    x += this.randomNoise();
    let y = this.height / 2 + ((2 * this.amplitude) / Math.PI)
      * Math.atan(1 / Math.tan((x * Math.PI) / this.frequency));
    y = this.cutoffFilter(y);
    y += this.randomNoise();
    return y;
  }

  /**
   * Generate random noise in the limits
   * of noise argument value. Can be positive or negative.
   * @return Noise value.
   */
  randomNoise(): number {
    return (Math.random() * ((0 + this.noise / 2)
      - (0 - this.noise / 2))
      + (0 - this.noise / 2));
  }

  /**
   * Consider cutoff limit for y-value by cutoff argument value.
   * @param y The y-point value.
   * @return An y-point value with cutoff.
   */
  cutoffFilter(y: number): number {
    if ((this.height / 2) < y && (this.height - this.cutoff) < y) {
      y = this.height - this.cutoff;
    } else if (y >= 0 && y <= (this.height / 2) && this.cutoff > y) {
      y = this.cutoff;
    }
    return y;
  }
}
