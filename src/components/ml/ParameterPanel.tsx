import React from "react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  Activity,
  Repeat,
  Package,
  Zap,
  Database,
  BrainCircuit
} from "lucide-react";
import { MLParameters } from "@/types/ml-types";

interface ParameterPanelProps {
  parameters: MLParameters;
  setParameters: React.Dispatch<React.SetStateAction<MLParameters>>;
  disabled: boolean;
}

const ParameterPanel: React.FC<ParameterPanelProps> = ({
  parameters,
  setParameters,
  disabled
}) => {
  const handleLearningRateChange = (value: number[]) => {
    setParameters({ ...parameters, learningRate: value[0] });
  };

  const handleEpochsChange = (value: number[]) => {
    setParameters({ ...parameters, epochs: value[0] });
  };

  const handleBatchSizeChange = (value: number[]) => {
    setParameters({ ...parameters, batchSize: value[0] });
  };

  const handleDropoutChange = (value: number[]) => {
    setParameters({ ...parameters, dropout: value[0] });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Zap className="h-4 w-4 text-yellow-500 mr-2" />
            <span className="text-sm font-medium">Learning Rate</span>
          </div>
          <Badge variant="outline">{parameters.learningRate.toFixed(4)}</Badge>
        </div>
        <Slider
          value={[parameters.learningRate]}
          min={0.0001}
          max={0.1}
          step={0.0001}
          onValueChange={handleLearningRateChange}
          disabled={disabled}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Controls how quickly the model adapts to the problem
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Repeat className="h-4 w-4 text-blue-500 mr-2" />
            <span className="text-sm font-medium">Epochs</span>
          </div>
          <Badge variant="outline">{parameters.epochs}</Badge>
        </div>
        <Slider
          value={[parameters.epochs]}
          min={1}
          max={50}
          step={1}
          onValueChange={handleEpochsChange}
          disabled={disabled}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Number of complete passes through the training dataset
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Package className="h-4 w-4 text-indigo-500 mr-2" />
            <span className="text-sm font-medium">Batch Size</span>
          </div>
          <Badge variant="outline">{parameters.batchSize}</Badge>
        </div>
        <Slider
          value={[parameters.batchSize]}
          min={8}
          max={128}
          step={8}
          onValueChange={handleBatchSizeChange}
          disabled={disabled}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Number of samples processed before updating model weights
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Activity className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-sm font-medium">Dropout Rate</span>
          </div>
          <Badge variant="outline">{parameters.dropout.toFixed(2)}</Badge>
        </div>
        <Slider
          value={[parameters.dropout]}
          min={0}
          max={0.5}
          step={0.05}
          onValueChange={handleDropoutChange}
          disabled={disabled}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Prevents overfitting by randomly dropping neurons during training
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center mb-1">
          <BrainCircuit className="h-4 w-4 text-purple-500 mr-2" />
          <span className="text-sm font-medium">Model Type</span>
        </div>
        <Select
          value={parameters.modelType}
          onValueChange={(value: any) => setParameters({ ...parameters, modelType: value })}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select model type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="neural-network">Neural Network</SelectItem>
            <SelectItem value="decision-tree">Decision Tree</SelectItem>
            <SelectItem value="random-forest">Random Forest</SelectItem>
            <SelectItem value="svm">Support Vector Machine</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center mb-1">
          <Layers className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-sm font-medium">Activation Function</span>
        </div>
        <Select
          value={parameters.activationFunction}
          onValueChange={(value: any) => setParameters({ ...parameters, activationFunction: value })}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select activation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relu">ReLU</SelectItem>
            <SelectItem value="sigmoid">Sigmoid</SelectItem>
            <SelectItem value="tanh">Tanh</SelectItem>
            <SelectItem value="linear">Linear</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center mb-1">
          <Database className="h-4 w-4 text-orange-500 mr-2" />
          <span className="text-sm font-medium">Dataset</span>
        </div>
        <Select
          value={parameters.dataset}
          onValueChange={(value: any) => setParameters({ ...parameters, dataset: value })}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select dataset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="iris">Iris Flowers</SelectItem>
            <SelectItem value="mnist">MNIST Digits</SelectItem>
            <SelectItem value="boston">Boston Housing</SelectItem>
            <SelectItem value="california">California Housing</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ParameterPanel;