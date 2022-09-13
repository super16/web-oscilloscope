export interface WaveTypes {
  sine: number,
  square: number,
  triangular: number,
  saw: number,
}

export interface WaveOptionsType {
  [key: number]: string
}

export interface OscState {
  amplitude: number,
  frequency: number,
  noiseLevel: number,
  heightLimit: number,
  waveChoice: number,
  widthLimit?: number,
}
