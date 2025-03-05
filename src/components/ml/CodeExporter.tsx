import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MLParameters, TrainingState } from "@/types/ml-types";
import { Code, Copy, Download, ExternalLink, Layers, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeExporterProps {
  parameters: MLParameters;
  trainingState: TrainingState;
}

const CodeExporter: React.FC<CodeExporterProps> = ({ parameters, trainingState }) => {
  const { toast } = useToast();
  const [framework, setFramework] = useState<'tensorflow' | 'pytorch' | 'keras'>('tensorflow');

  // If model is still in idle state
  if (trainingState.status === "idle") {
    return (
      <div className="flex items-center justify-center h-64 flex-col space-y-4 text-center">
        <AlertCircle className="h-12 w-12 text-orange-500" />
        <h3 className="text-xl font-medium">No Model Code Available</h3>
        <p className="text-muted-foreground max-w-md">
          Train a model first to see the generated code for implementing it in different frameworks.
        </p>
      </div>
    );
  }

  // Generate code based on the current parameters and selected framework
  const generateCode = () => {
    // Configure network structure
    const inputDim = getInputDimension(parameters.dataset);
    const outputDim = getOutputDimension(parameters.dataset, parameters.modelType);
    const hiddenLayers = parameters.neuronLayers;

    switch (framework) {
      case 'tensorflow':
        return generateTensorflowCode(inputDim, hiddenLayers, outputDim, parameters);
      case 'pytorch':
        return generatePytorchCode(inputDim, hiddenLayers, outputDim, parameters);
      case 'keras':
        return generateKerasCode(inputDim, hiddenLayers, outputDim, parameters);
      default:
        return '// Code generation failed';
    }
  };

  // Helper functions to get dimensions based on dataset
  const getInputDimension = (dataset: string): number => {
    switch (dataset) {
      case "iris": return 4;
      case "mnist": return 784;
      case "boston": return 13;
      case "california": return 8;
      default: return 10;
    }
  };

  const getOutputDimension = (dataset: string, modelType: string): number => {
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

  // Code generation for different frameworks
  const generateTensorflowCode = (inputDim: number, hiddenLayers: number[], outputDim: number, params: MLParameters) => {
    return `
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import ${params.optimizer === 'adam' ? 'Adam' : params.optimizer === 'sgd' ? 'SGD' : 'RMSprop'}
import numpy as np

# Define the model
model = Sequential()

# Input layer
model.add(Dense(${hiddenLayers[0]}, activation='${params.activationFunction}', input_shape=(${inputDim},)))
model.add(Dropout(${params.dropout}))

# Hidden layers
${hiddenLayers.slice(1).map(neurons => 
  `model.add(Dense(${neurons}, activation='${params.activationFunction}'))\n` +
  `model.add(Dropout(${params.dropout}))`
).join('\n')}

# Output layer
model.add(Dense(${outputDim}, activation='${getOutputActivation(params.dataset)}'))

# Compile the model
optimizer = ${params.optimizer === 'adam' ? `Adam(learning_rate=${params.learningRate})` : 
  params.optimizer === 'sgd' ? `SGD(learning_rate=${params.learningRate})` : 
  `RMSprop(learning_rate=${params.learningRate})`}

model.compile(
    optimizer=optimizer,
    loss='${getOutputLoss(params.dataset)}',
    metrics=['accuracy']
)

# Model summary
model.summary()

# Example training (replace X_train, y_train with your data)
# model.fit(
#     X_train, y_train,
#     epochs=${params.epochs},
#     batch_size=${params.batchSize},
#     validation_split=0.2
# )
`;
  };

  const generatePytorchCode = (inputDim: number, hiddenLayers: number[], outputDim: number, params: MLParameters) => {
    return `
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset

# Define the neural network
class NeuralNetwork(nn.Module):
    def __init__(self):
        super(NeuralNetwork, self).__init__()
        
        # Input layer
        layers = [nn.Linear(${inputDim}, ${hiddenLayers[0]}),
                  nn.${params.activationFunction.charAt(0).toUpperCase() + params.activationFunction.slice(1)}(),
                  nn.Dropout(${params.dropout})]
        
        # Hidden layers
        ${hiddenLayers.slice(0, -1).map((neurons, i) => 
          `layers.extend([
            nn.Linear(${neurons}, ${hiddenLayers[i + 1]}),
            nn.${params.activationFunction.charAt(0).toUpperCase() + params.activationFunction.slice(1)}(),
            nn.Dropout(${params.dropout})
          ])`
        ).join('\n        ')}
        
        # Output layer
        layers.append(nn.Linear(${hiddenLayers[hiddenLayers.length - 1]}, ${outputDim}))
        
        # Add output activation if needed
        ${getOutputActivation(params.dataset) !== 'linear' ? 
          `layers.append(nn.${getOutputActivation(params.dataset) === 'softmax' ? 'Softmax(dim=1)' : 'Sigmoid()'})` : 
          '# No activation for regression'}
        
        self.model = nn.Sequential(*layers)
    
    def forward(self, x):
        return self.model(x)

# Initialize the model
model = NeuralNetwork()

# Define loss function
criterion = ${getOutputLoss(params.dataset) === 'categorical_crossentropy' ? 
  'nn.CrossEntropyLoss()' : 
  getOutputLoss(params.dataset) === 'binary_crossentropy' ? 
  'nn.BCELoss()' : 
  'nn.MSELoss()'}

# Define optimizer
optimizer = optim.${params.optimizer === 'adam' ? 'Adam' : params.optimizer === 'sgd' ? 'SGD' : 'RMSprop'}(
    model.parameters(),
    lr=${params.learningRate}
)

# Example training loop
# for epoch in range(${params.epochs}):
#     # Training
#     model.train()
#     for inputs, targets in train_loader:
#         optimizer.zero_grad()
#         outputs = model(inputs)
#         loss = criterion(outputs, targets)
#         loss.backward()
#         optimizer.step()
`;
  };

  const generateKerasCode = (inputDim: number, hiddenLayers: number[], outputDim: number, params: MLParameters) => {
    return `
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import ${params.optimizer === 'adam' ? 'Adam' : params.optimizer === 'sgd' ? 'SGD' : 'RMSprop'}
import numpy as np

# Data preparation (example)
# (X_train, y_train), (X_test, y_test) = keras.datasets.${params.dataset === 'mnist' ? 'mnist.load_data()' : 'boston_housing.load_data()'}
# X_train = X_train.reshape(X_train.shape[0], -1) / 255.0  # For MNIST

# Build the model
model = Sequential([
    # Input layer
    Dense(${hiddenLayers[0]}, activation='${params.activationFunction}', input_shape=(${inputDim},)),
    Dropout(${params.dropout}),
    
    # Hidden layers
    ${hiddenLayers.slice(1).map(neurons => 
      `Dense(${neurons}, activation='${params.activationFunction}'),\n    Dropout(${params.dropout}),`
    ).join('\n    ')}
    
    # Output layer
    Dense(${outputDim}, activation='${getOutputActivation(params.dataset)}')
])

# Compile the model
model.compile(
    optimizer=keras.optimizers.${params.optimizer === 'adam' ? 'Adam' : params.optimizer === 'sgd' ? 'SGD' : 'RMSprop'}(
        learning_rate=${params.learningRate}
    ),
    loss='${getOutputLoss(params.dataset)}',
    metrics=['accuracy']
)

# Model summary
model.summary()

# Train the model
# history = model.fit(
#     X_train, y_train,
#     epochs=${params.epochs},
#     batch_size=${params.batchSize},
#     validation_split=0.2,
#     verbose=1
# )

# Evaluate the model
# test_loss, test_acc = model.evaluate(X_test, y_test)
# print(f'Test accuracy: {test_acc}')
`;
  };

  // Helper function to determine output activation function
  const getOutputActivation = (dataset: string): string => {
    switch (dataset) {
      case "iris":
        return "softmax";
      case "mnist":
        return "softmax";
      case "boston":
      case "california":
        return "linear";
      default:
        return "sigmoid";
    }
  };

  // Helper function to determine loss function
  const getOutputLoss = (dataset: string): string => {
    switch (dataset) {
      case "iris":
      case "mnist":
        return "categorical_crossentropy";
      case "boston":
      case "california":
        return "mean_squared_error";
      default:
        return "binary_crossentropy";
    }
  };

  // Copy code to clipboard
  const copyCode = () => {
    navigator.clipboard.writeText(generateCode());
    toast({
      title: "Code Copied",
      description: `${framework.charAt(0).toUpperCase() + framework.slice(1)} code copied to clipboard.`,
      duration: 3000,
    });
  };

  // Download code as file
  const downloadCode = () => {
    const code = generateCode();
    const fileName = `${parameters.modelType}_${parameters.dataset}_${framework}`;
    const fileExtension = framework === 'pytorch' ? 'py' : 'py';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Code Downloaded",
      description: `File saved as ${fileName}.${fileExtension}`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Code className="mr-2 h-5 w-5 text-purple-500" />
            Model Code Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tensorflow" onValueChange={(value) => setFramework(value as 'tensorflow' | 'pytorch' | 'keras')}>
            <div className="mb-4 flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="tensorflow">TensorFlow</TabsTrigger>
                <TabsTrigger value="pytorch">PyTorch</TabsTrigger>
                <TabsTrigger value="keras">Keras</TabsTrigger>
              </TabsList>

              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={copyCode}>
                  <Copy className="h-4 w-4 mr-1" /> Copy
                </Button>
                <Button variant="outline" size="sm" onClick={downloadCode}>
                  <Download className="h-4 w-4 mr-1" /> Download
                </Button>
              </div>
            </div>

            <div className="relative">
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-auto max-h-[500px] text-sm font-mono">
                {generateCode()}
              </pre>

              {trainingState.status === "complete" && (
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  Using optimal parameters
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col space-y-2">
              <h3 className="text-sm font-medium flex items-center">
                <Layers className="h-4 w-4 mr-1" /> Model Architecture
              </h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Input: {getInputDimension(parameters.dataset)} features</p>
                <p>Hidden Layers: {parameters.neuronLayers.join(" → ")}</p>
                <p>Output: {getOutputDimension(parameters.dataset, parameters.modelType)} {parameters.dataset === 'boston' || parameters.dataset === 'california' ? 'unit(s) (regression)' : 'class(es) (classification)'}</p>
                <p>Activation: {parameters.activationFunction} (hidden), {getOutputActivation(parameters.dataset)} (output)</p>
                <p>Loss: {getOutputLoss(parameters.dataset)}</p>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <Button variant="link" className="p-0 h-auto text-sm" onClick={() => {
                  window.open(
                    framework === 'tensorflow' ? 'https://www.tensorflow.org/api_docs/python/tf/all_symbols' :
                    framework === 'pytorch' ? 'https://pytorch.org/docs/stable/index.html' :
                    'https://keras.io/api/',
                    '_blank'
                  );
                }}>
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View {framework.charAt(0).toUpperCase() + framework.slice(1)} Documentation
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeExporter;