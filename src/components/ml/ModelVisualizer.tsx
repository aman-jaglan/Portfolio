import React, { useEffect, useState } from "react";
import { MLParameters, TrainingState, LayerVisualization } from "@/types/ml-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Cpu, Database, AlertCircle, Server } from "lucide-react";

interface ModelVisualizerProps {
  parameters: MLParameters;
  trainingState: TrainingState;
}

const ModelVisualizer: React.FC<ModelVisualizerProps> = ({ parameters, trainingState }) => {
  const [layers, setLayers] = useState<LayerVisualization[]>([]);

  useEffect(() => {
    // Generate layer visualization based on parameters
    const inputLayer = {
      layerType: "Input",
      neurons: getInputNeurons(parameters.dataset),
      activation: "N/A"
    };

    const hiddenLayers = parameters.neuronLayers.map((neurons, index) => ({
      layerType: `Hidden ${index + 1}`,
      neurons,
      activation: parameters.activationFunction
    }));

    const outputLayer = {
      layerType: "Output",
      neurons: getOutputNeurons(parameters.dataset, parameters.modelType),
      activation: getOutputActivation(parameters.dataset)
    };

    setLayers([inputLayer, ...hiddenLayers, outputLayer]);
  }, [parameters]);

  // Helper function to determine input neurons based on dataset
  const getInputNeurons = (dataset: string): number => {
    switch (dataset) {
      case "iris": return 4;
      case "mnist": return 784;
      case "boston": return 13;
      case "california": return 8;
      default: return 10;
    }
  };

  // Helper function to determine output neurons based on dataset and model type
  const getOutputNeurons = (dataset: string, modelType: string): number => {
    if (modelType === "neural-network") {
      switch (dataset) {
        case "iris": return 3;
        case "mnist": return 10;
        case "boston": return 1;
        case "california": return 1;
        default: return 2;
      }
    } else {
      // For other model types
      return 1;
    }
  };

  // Helper function to determine output activation function
  const getOutputActivation = (dataset: string): string => {
    switch (dataset) {
      case "iris":
      case "mnist":
        return "softmax";
      case "boston":
      case "california":
        return "linear";
      default:
        return "sigmoid";
    }
  };

  // If model is still in idle state
  if (trainingState.status === "idle") {
    return (
      <div className="flex items-center justify-center h-64 flex-col space-y-4 text-center">
        <AlertCircle className="h-12 w-12 text-orange-500" />
        <h3 className="text-xl font-medium">No Model Visualization Available</h3>
        <p className="text-muted-foreground max-w-md">
          Start training a model to visualize its architecture. The visualization will show the structure and connections of your neural network.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Brain className="mr-2 h-5 w-5 text-purple-500" />
            Neural Network Architecture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-4 flex-wrap">
            {layers.map((layer, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center bg-slate-100 dark:bg-slate-800 p-4 rounded-lg min-w-[120px]">
                  <span className="text-xs text-muted-foreground mb-1">{layer.layerType} Layer</span>
                  <div className="relative bg-white dark:bg-slate-700 rounded-lg p-3 w-20 h-32 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-600">
                    <Badge variant={layer.layerType === "Input" ? "default" :
                               layer.layerType === "Output" ? "destructive" : "secondary"}
                           className="absolute -top-2 text-xs">
                      {layer.neurons} {layer.neurons === 1 ? "neuron" : "neurons"}
                    </Badge>
                    {
                      // Draw neurons (dots) up to 8, then "..." for more
                      Array.from({ length: Math.min(8, layer.neurons) }).map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-500 my-0.5"></div>
                      ))
                    }
                    {layer.neurons > 8 && <div className="text-xs mt-1">...</div>}
                    <span className="text-xs absolute bottom-1 font-mono">
                      {layer.activation !== "N/A" && layer.activation}
                    </span>
                  </div>
                </div>

                {index < layers.length - 1 && (
                  <div className="mx-2">
                    <ArrowRight className="h-5 w-5 text-slate-400" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Cpu className="mr-2 h-5 w-5 text-purple-500" />
              Model Parameters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm font-medium">Model Type:</dt>
                <dd className="text-sm">{parameters.modelType}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium">Total Parameters:</dt>
                <dd className="text-sm">{calculateTotalParameters(layers).toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium">Activation Function:</dt>
                <dd className="text-sm">{parameters.activationFunction}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium">Optimizer:</dt>
                <dd className="text-sm">{parameters.optimizer}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium">Learning Rate:</dt>
                <dd className="text-sm">{parameters.learningRate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium">Dropout Rate:</dt>
                <dd className="text-sm">{parameters.dropout}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Database className="mr-2 h-5 w-5 text-purple-500" />
              Training Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm font-medium">Dataset:</dt>
                <dd className="text-sm">{parameters.dataset}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium">Epochs:</dt>
                <dd className="text-sm">{parameters.epochs}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium">Batch Size:</dt>
                <dd className="text-sm">{parameters.batchSize}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium">Progress:</dt>
                <dd className="text-sm">
                  {trainingState.status === "training"
                    ? `${Math.round(trainingState.progress)}%`
                    : trainingState.status === "complete"
                      ? "Completed"
                      : "Not started"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium">Status:</dt>
                <dd className="text-sm">
                  <Badge variant={
                    trainingState.status === "complete" ? "destructive" :
                    trainingState.status === "training" ? "default" :
                    "secondary"
                  }>
                    {trainingState.status.charAt(0).toUpperCase() + trainingState.status.slice(1)}
                  </Badge>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      {trainingState.status === "complete" && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Server className="mr-2 h-5 w-5 text-purple-500" />
              Production Deployment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your model has been trained successfully and is ready for deployment. In a real-world scenario,
                you would save this model to a file, upload it to a cloud service, or integrate it into an application.
              </p>

              <div className="text-xs font-mono bg-slate-100 dark:bg-slate-800 p-3 rounded">
                <div className="text-green-500">// How to export this model in real TensorFlow.js</div>
                <div className="text-slate-500">await model.save('localstorage://my-model');</div>
                <div className="text-slate-500">await model.save('downloads://my-model');</div>
                <div className="text-slate-500">await model.save('indexeddb://my-model');</div>
                <div className="mt-2 text-green-500">// How to load the model back</div>
                <div className="text-slate-500">const model = await tf.loadLayersModel('localstorage://my-model');</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Helper function to calculate total parameters in the model
const calculateTotalParameters = (layers: LayerVisualization[]): number => {
  let total = 0;

  for (let i = 0; i < layers.length - 1; i++) {
    // Parameters between current layer and next layer:
    // (neurons in current layer + 1) * neurons in next layer
    // +1 is for the bias term
    total += (layers[i].neurons + 1) * layers[i+1].neurons;
  }

  return total;
};

export default ModelVisualizer;