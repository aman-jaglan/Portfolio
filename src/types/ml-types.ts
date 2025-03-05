export interface MLParameters {
  learningRate: number;
  epochs: number;
  batchSize: number;
  optimizer: 'adam' | 'sgd' | 'rmsprop' | 'adagrad';
  neuronLayers: number[];
  activationFunction: 'relu' | 'sigmoid' | 'tanh' | 'linear';
  dropout: number;
  dataset: 'iris' | 'mnist' | 'boston' | 'california';
  modelType: 'neural-network' | 'decision-tree' | 'random-forest' | 'svm';
}

export interface MLMetrics {
  accuracy: number;
  loss: number;
  precision: number;
  recall: number;
  f1Score: number;
}

export interface TrainingState {
  status: 'idle' | 'training' | 'complete' | 'failed';
  progress: number;
  currentEpoch: number;
  totalEpochs: number;
  metrics: MLMetrics;
}

export interface DataPoint {
  x: number;
  y: number;
  class?: number | string;
}

export interface DatasetInfo {
  name: string;
  description: string;
  features: string[];
  target: string;
  sampleSize: number;
  imageUrl?: string;
}

export interface LayerVisualization {
  layerType: string;
  neurons: number;
  activation: string;
}