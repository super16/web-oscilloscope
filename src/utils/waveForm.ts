export default class Wave {
  constructor(
    public amplitude: number,
    public ctx: CanvasRenderingContext2D,
    public frequency: number,
    public height: number,
    public noise: number,
    public width: number,
    public x: number,
    public y: number,
  ) {
    this.amplitude = amplitude;
    this.ctx = ctx;
    this.frequency = frequency;
    this.height = height;
    this.noise = noise;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  sineWave() {
    while (this.x < this.width) {
      this.x += this.randomNoise();
      this.y = this.height / 2 + (this.amplitude
        * Math.sin((2 * Math.PI * this.x) / this.frequency));
      this.y += this.randomNoise();
      this.ctx.lineTo(this.x, this.y);
      this.x += 1;
    }
    this.ctx.stroke();
  }

  squareWave() {
    while (this.x < this.width) {
      this.x += this.randomNoise();
      this.y = this.height / 2
        + Math.sign(Math.sin((2 * Math.PI * this.x) / this.frequency)) * this.amplitude;
      this.y += this.randomNoise();
      this.ctx.lineTo(this.x, this.y);
      this.x += 1;
    }
    this.ctx.stroke();
  }

  triangleWave() {
    while (this.x < this.width) {
      this.x += this.randomNoise();
      this.y = this.height / 2 + (4 * (this.amplitude / this.frequency))
        * Math.abs(((((this.x - this.frequency / 4) % this.frequency)
        + this.frequency) % this.frequency) - (this.frequency / 2)) - this.amplitude;
      this.y += this.randomNoise();
      this.ctx.lineTo(this.x, this.y);
      this.x += 1;
    }
    this.ctx.stroke();
  }

  sawWave() {
    while (this.x < this.width) {
      this.x += this.randomNoise();
      this.y = this.height / 2 + ((2 * this.amplitude) / Math.PI)
        * Math.atan(1 / Math.tan((this.x * Math.PI) / this.frequency));
      this.y += this.randomNoise();
      this.ctx.lineTo(this.x, this.y);
      this.x += 1;
    }
    this.ctx.stroke();
  }

  randomNoise() {
    return (Math.random() * ((0 + this.noise / 2) - (0 - this.noise / 2)) + (0 - this.noise / 2));
  }
}
