import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Brain, Database, Laptop, Server, Zap, Settings, Activity, BarChart2, Code, GitCompare, Box } from "lucide-react";
import MLWorkflow from "@/components/ml/MLWorkflow";
import ModelVisualizer from "@/components/ml/ModelVisualizer";
import DataExplorer from "@/components/ml/DataExplorer";
import ParameterPanel from "@/components/ml/ParameterPanel";
import ModelMetrics from "@/components/ml/ModelMetrics";
import { MLParameters, TrainingState } from "@/types/ml-types";
import ModelComparison from "@/components/ml/ModelComparison";
import NetworkVisualizer3D from "@/components/ml/NetworkVisualizer3D";
import CodeExporter from "@/components/ml/CodeExporter";

const MachineLearning: React.FC = () => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("workflow");
  const [trainingState, setTrainingState] = useState<TrainingState>({
    status: "idle",
    progress: 0,
    currentEpoch: 0,
    totalEpochs: 0,
    metrics: {
      accuracy: 0,
      loss: 0,
      precision: 0,
      recall: 0,
      f1Score: 0
    }
  });

  const [parameters, setParameters] = useState<MLParameters>({
    learningRate: 0.01,
    epochs: 10,
    batchSize: 32,
    optimizer: "adam",
    neuronLayers: [64, 32],
    activationFunction: "relu",
    dropout: 0.2,
    dataset: "iris",
    modelType: "neural-network"
  });

  // Store trained models for comparison
  const [trainedModels, setTrainedModels] = useState<{
    parameters: MLParameters;
    metrics: TrainingState["metrics"];
    timestamp: Date;
    name: string;
  }[]>([]);

  useEffect(() => {
    // Reset training state when parameters change
    if (trainingState.status === "complete" || trainingState.status === "failed") {
      setTrainingState(prev => ({
        ...prev,
        status: "idle",
        progress: 0,
        currentEpoch: 0
      }));
    }
  }, [parameters]);

  const startTraining = () => {
    setTrainingState({
      status: "training",
      progress: 0,
      currentEpoch: 0,
      totalEpochs: parameters.epochs,
      metrics: {
        accuracy: 0,
        loss: 1.0,
        precision: 0,
        recall: 0,
        f1Score: 0
      }
    });

    toast({
      title: "Training Started",
      description: `Model training has begun with ${parameters.epochs} epochs.`,
      variant: "default",
    });

    // Simulate training progress
    const intervalId = setInterval(() => {
      setTrainingState(prev => {
        if (prev.currentEpoch >= parameters.epochs - 1) {
          clearInterval(intervalId);

          // Final metrics after training
          const finalMetrics = {
            accuracy: 0.85 + (parameters.learningRate * 5) * Math.random(),
            loss: 0.15 - (parameters.learningRate * 2) * Math.random(),
            precision: 0.82 + parameters.dropout * Math.random(),
            recall: 0.80 + parameters.dropout * Math.random(),
            f1Score: 0.83 + (parameters.learningRate * 3) * Math.random()
          };

          return {
            status: "complete",
            progress: 100,
            currentEpoch: parameters.epochs,
            totalEpochs: parameters.epochs,
            metrics: finalMetrics
          };
        }

        const newEpoch = prev.currentEpoch + 1;
        const epochProgress = (newEpoch / parameters.epochs) * 100;

        // Simulate improving metrics as training progresses
        return {
          status: "training",
          progress: epochProgress,
          currentEpoch: newEpoch,
          totalEpochs: parameters.epochs,
          metrics: {
            accuracy: Math.min(0.5 + (newEpoch / parameters.epochs) * 0.4, 0.95),
            loss: Math.max(1.0 - (newEpoch / parameters.epochs) * 0.85, 0.1),
            precision: Math.min(0.4 + (newEpoch / parameters.epochs) * 0.5, 0.95),
            recall: Math.min(0.3 + (newEpoch / parameters.epochs) * 0.6, 0.95),
            f1Score: Math.min(0.35 + (newEpoch / parameters.epochs) * 0.55, 0.95)
          }
        };
      });
    }, 1000);

    return () => clearInterval(intervalId);
  };

  const deployModel = () => {
    toast({
      title: "Model Deployed",
      description: "Your model has been successfully deployed to production!",
      variant: "default",
    });
  };

  const resetTraining = () => {
    setTrainingState({
      status: "idle",
      progress: 0,
      currentEpoch: 0,
      totalEpochs: parameters.epochs,
      metrics: {
        accuracy: 0,
        loss: 0,
        precision: 0,
        recall: 0,
        f1Score: 0
      }
    });
  };

  const saveCurrentModel = () => {
    if (trainingState.status !== "complete") {
      toast({
        title: "Cannot Save Model",
        description: "You can only save completed models.",
        variant: "destructive",
      });
      return;
    }

    const modelName = `Model ${trainedModels.length + 1} (${parameters.modelType} - ${parameters.dataset})`;

    setTrainedModels(prev => [
      ...prev,
      {
        parameters: {...parameters},
        metrics: {...trainingState.metrics},
        timestamp: new Date(),
        name: modelName
      }
    ]);

    toast({
      title: "Model Saved",
      description: `${modelName} has been saved for comparison.`,
      variant: "default",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            Interactive Machine Learning Playground
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visualize the end-to-end workflow of machine learning models. Adjust parameters,
            train models, and understand how changes affect performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar - Parameters */}
          <div className="lg:col-span-1">
            <Card className="p-4 h-full">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-purple-500" />
                  <h2 className="text-xl font-medium">Model Parameters</h2>
                </div>

                <ParameterPanel
                  parameters={parameters}
                  setParameters={setParameters}
                  disabled={trainingState.status === "training"}
                />

                <div className="pt-4 space-y-2">
                  {trainingState.status === "idle" && (
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                      onClick={startTraining}
                    >
                      <Zap className="mr-2 h-4 w-4" /> Start Training
                    </Button>
                  )}

                  {trainingState.status === "training" && (
                    <Button
                      className="w-full"
                      variant="outline"
                      disabled
                    >
                      <Activity className="mr-2 h-4 w-4 animate-pulse" />
                      Training Epoch {trainingState.currentEpoch}/{parameters.epochs}
                    </Button>
                  )}

                  {trainingState.status === "complete" && (
                    <>
                      <Button
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600"
                        onClick={deployModel}
                      >
                        <Server className="mr-2 h-4 w-4" /> Deploy to Production
                      </Button>

                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600"
                        onClick={saveCurrentModel}
                      >
                        <Box className="mr-2 h-4 w-4" /> Save Model for Comparison
                      </Button>

                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={resetTraining}
                      >
                        <Laptop className="mr-2 h-4 w-4" /> Train New Model
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-3">
            <Card className="p-4">
              <Tabs defaultValue="workflow" value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="mb-4 grid grid-cols-6">
                  <TabsTrigger value="workflow">
                    <Brain className="h-4 w-4 mr-2" /> Workflow
                  </TabsTrigger>
                  <TabsTrigger value="data">
                    <Database className="h-4 w-4 mr-2" /> Data
                  </TabsTrigger>
                  <TabsTrigger value="model">
                    <Laptop className="h-4 w-4 mr-2" /> Model
                  </TabsTrigger>
                  <TabsTrigger value="metrics">
                    <BarChart2 className="h-4 w-4 mr-2" /> Metrics
                  </TabsTrigger>
                  <TabsTrigger value="compare">
                    <GitCompare className="h-4 w-4 mr-2" /> Compare
                  </TabsTrigger>
                  <TabsTrigger value="code">
                    <Code className="h-4 w-4 mr-2" /> Code
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="workflow" className="space-y-4">
                  <MLWorkflow
                    trainingState={trainingState}
                    parameters={parameters}
                  />
                </TabsContent>

                <TabsContent value="data" className="space-y-4">
                  <DataExplorer
                    dataset={parameters.dataset}
                    trainingState={trainingState}
                  />
                </TabsContent>

                <TabsContent value="model" className="space-y-4">
                  <Tabs defaultValue="2d">
                    <TabsList className="w-1/3 mb-4">
                      <TabsTrigger value="2d">2D Visualization</TabsTrigger>
                      <TabsTrigger value="3d">3D Visualization</TabsTrigger>
                    </TabsList>
                    <TabsContent value="2d">
                      <ModelVisualizer
                        parameters={parameters}
                        trainingState={trainingState}
                      />
                    </TabsContent>
                    <TabsContent value="3d">
                      <NetworkVisualizer3D
                        parameters={parameters}
                        trainingState={trainingState}
                      />
                    </TabsContent>
                  </Tabs>
                </TabsContent>

                <TabsContent value="metrics" className="space-y-4">
                  <ModelMetrics
                    metrics={trainingState.metrics}
                    trainingState={trainingState}
                    parameters={parameters}
                  />
                </TabsContent>

                <TabsContent value="compare" className="space-y-4">
                  <ModelComparison
                    models={trainedModels}
                    currentModel={
                      trainingState.status === "complete"
                        ? {
                            parameters: parameters,
                            metrics: trainingState.metrics,
                            timestamp: new Date(),
                            name: "Current Model"
                          }
                        : undefined
                    }
                  />
                </TabsContent>

                <TabsContent value="code" className="space-y-4">
                  <CodeExporter
                    parameters={parameters}
                    trainingState={trainingState}
                  />
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineLearning;