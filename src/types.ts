export interface WaveTypes {
  sine: number,
  square: number,
  triangular: number,
  saw: number,
}

export interface WaveOptionsType {
  0: string,
  1: string,
  2: string,
  3: string,
}

export interface OscState {
  amplitude: number,
  frequency: number,
  noiseLevel: number,
  heightLimit: number,
  waveChoice: number,
  widthLimit?: number,
}
