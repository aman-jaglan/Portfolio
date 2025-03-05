import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MLParameters, TrainingState } from "@/types/ml-types";
import { AlertCircle, GitCompare, Table as TableIcon, BarChart2, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ModelComparisonProps {
  models: {
    parameters: MLParameters;
    metrics: TrainingState["metrics"];
    timestamp: Date;
    name: string;
  }[];
  currentModel?: {
    parameters: MLParameters;
    metrics: TrainingState["metrics"];
    timestamp: Date;
    name: string;
  };
}

const ModelComparison: React.FC<ModelComparisonProps> = ({ models, currentModel }) => {
  const [selectedMetric, setSelectedMetric] = useState<keyof TrainingState["metrics"]>("accuracy");

  // Combine current model with saved models if it exists
  const allModels = currentModel
    ? [currentModel, ...models]
    : models;

  // If no models to compare
  if (allModels.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 flex-col space-y-4 text-center">
        <AlertCircle className="h-12 w-12 text-orange-500" />
        <h3 className="text-xl font-medium">No Models to Compare</h3>
        <p className="text-muted-foreground max-w-md">
          Train and save multiple models to compare their performance. Click the "Save Model for Comparison" button after training to add models here.
        </p>
      </div>
    );
  }

  // Format data for charts
  const prepareMetricsData = () => {
    return allModels.map(model => ({
      name: model.name,
      accuracy: model.metrics.accuracy * 100,
      precision: model.metrics.precision * 100,
      recall: model.metrics.recall * 100,
      f1Score: model.metrics.f1Score * 100,
      loss: model.metrics.loss
    }));
  };

  const prepareParamsData = () => {
    return allModels.map(model => ({
      name: model.name,
      learningRate: model.parameters.learningRate,
      epochs: model.parameters.epochs,
      batchSize: model.parameters.batchSize,
      dropout: model.parameters.dropout,
      layers: model.parameters.neuronLayers.join("-")
    }));
  };

  const metricsData = prepareMetricsData();
  const paramsData = prepareParamsData();

  const getMetricColor = (metric: keyof TrainingState["metrics"]) => {
    const colors: Record<keyof TrainingState["metrics"], string> = {
      accuracy: "#8884d8",
      precision: "#82ca9d",
      recall: "#ffc658",
      f1Score: "#ff8042",
      loss: "#ff6b6b"
    };
    return colors[metric];
  };

  // Calculate the percentage difference between models
  const calculateDifference = (currentValue: number, compareValue: number) => {
    if (compareValue === 0) return 0;
    const diff = ((currentValue - compareValue) / compareValue) * 100;
    return diff;
  };

  // Determine if higher or lower is better for a metric
  const isHigherBetter = (metric: keyof TrainingState["metrics"]) => {
    return metric !== 'loss';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <GitCompare className="mr-2 h-5 w-5 text-purple-500" />
            Model Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <TabsList className="mb-4">
              <TabsTrigger value="chart">
                <BarChart2 className="mr-2 h-4 w-4" />
                Chart View
              </TabsTrigger>
              <TabsTrigger value="table">
                <TableIcon className="mr-2 h-4 w-4" />
                Table View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chart">
              <div className="space-y-4">
                <div className="inline-flex space-x-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-md">
                  {Object.keys(allModels[0].metrics).map((metric) => (
                    <button
                      key={metric}
                      className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${
                        selectedMetric === metric 
                          ? "bg-white dark:bg-slate-700 shadow" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setSelectedMetric(metric as keyof TrainingState["metrics"])}
                    >
                      {metric.charAt(0).toUpperCase() + metric.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="h-80 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={metricsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis
                        domain={
                          selectedMetric === "loss"
                            ? [0, Math.max(...metricsData.map(d => d.loss)) * 1.2]
                            : [0, 100]
                        }
                        label={
                          selectedMetric === "loss"
                            ? { value: "Loss Value", angle: -90, position: "insideLeft" }
                            : { value: "Percentage (%)", angle: -90, position: "insideLeft" }
                        }
                      />
                      <Tooltip
                        formatter={(value: number) =>
                          selectedMetric === "loss"
                            ? value.toFixed(4)
                            : `${value.toFixed(2)}%`
                        }
                      />
                      <Legend />
                      <Bar
                        dataKey={selectedMetric === "loss" ? "loss" : selectedMetric}
                        fill={getMetricColor(selectedMetric as keyof TrainingState["metrics"])}
                        name={selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}
                        animationDuration={500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="table">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead>Precision</TableHead>
                      <TableHead>Recall</TableHead>
                      <TableHead>F1 Score</TableHead>
                      <TableHead>Loss</TableHead>
                      <TableHead>Architecture</TableHead>
                      <TableHead>Dataset</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allModels.map((model, index) => (
                      <TableRow key={index} className={model.name === "Current Model" ? "bg-slate-50 dark:bg-slate-800/50" : ""}>
                        <TableCell className="font-medium">
                          {model.name}
                          {model.name === "Current Model" && (
                            <Badge variant="outline" className="ml-2">
                              Current
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {(model.metrics.accuracy * 100).toFixed(2)}%
                          {index > 0 && (
                            <span className={`text-xs ml-1 ${
                              calculateDifference(
                                model.metrics.accuracy, 
                                allModels[0].metrics.accuracy
                              ) > 0 === isHigherBetter('accuracy')
                                ? "text-green-500"
                                : "text-red-500"
                            }`}>
                              ({calculateDifference(
                                model.metrics.accuracy,
                                allModels[0].metrics.accuracy
                              ).toFixed(1)}%)
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{(model.metrics.precision * 100).toFixed(2)}%</TableCell>
                        <TableCell>{(model.metrics.recall * 100).toFixed(2)}%</TableCell>
                        <TableCell>{(model.metrics.f1Score * 100).toFixed(2)}%</TableCell>
                        <TableCell>
                          {model.metrics.loss.toFixed(4)}
                          {index > 0 && (
                            <span className={`text-xs ml-1 ${
                              calculateDifference(
                                model.metrics.loss, 
                                allModels[0].metrics.loss
                              ) < 0 === isHigherBetter('loss')
                                ? "text-green-500"
                                : "text-red-500"
                            }`}>
                              ({calculateDifference(
                                model.metrics.loss,
                                allModels[0].metrics.loss
                              ).toFixed(1)}%)
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{model.parameters.neuronLayers.join("-")}</TableCell>
                        <TableCell>{model.parameters.dataset}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" className="text-xs">
              <Download className="h-3 w-3 mr-1" /> Export Comparison
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelComparison;