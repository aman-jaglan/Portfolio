import React from "react";
import { MLMetrics, TrainingState, MLParameters } from "@/types/ml-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, TrendingUp, BarChart2, PieChart } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface ModelMetricsProps {
  metrics: MLMetrics;
  trainingState: TrainingState;
  parameters: MLParameters;
}

const ModelMetrics: React.FC<ModelMetricsProps> = ({
  metrics,
  trainingState,
  parameters
}) => {
  // Convert metrics to percentage for display
  const metricsPercentage = {
    accuracy: Math.round(metrics.accuracy * 100),
    precision: Math.round(metrics.precision * 100),
    recall: Math.round(metrics.recall * 100),
    f1Score: Math.round(metrics.f1Score * 100)
  };

  // Create data for charts
  const barData = [
    { name: "Accuracy", value: metricsPercentage.accuracy },
    { name: "Precision", value: metricsPercentage.precision },
    { name: "Recall", value: metricsPercentage.recall },
    { name: "F1 Score", value: metricsPercentage.f1Score }
  ];

  // Simulated training history data (would be actual history in a real app)
  const getHistoryData = () => {
    const data = [];
    for (let i = 0; i <= parameters.epochs; i++) {
      // Simulate metrics improving with epochs
      const progress = i / parameters.epochs;
      data.push({
        epoch: i,
        accuracy: Math.min(0.5 + progress * 0.4, metrics.accuracy).toFixed(2),
        loss: Math.max(1.0 - progress * 0.85, metrics.loss).toFixed(2)
      });
    }
    return data;
  };

  const historyData = getHistoryData();

  const getModelQualityDescription = () => {
    if (metricsPercentage.accuracy >= 90) return "Excellent";
    if (metricsPercentage.accuracy >= 80) return "Good";
    if (metricsPercentage.accuracy >= 70) return "Fair";
    if (metricsPercentage.accuracy >= 60) return "Poor";
    return "Very Poor";
  };

  const getModelQualityColor = () => {
    if (metricsPercentage.accuracy >= 90) return "bg-green-500";
    if (metricsPercentage.accuracy >= 80) return "bg-green-400";
    if (metricsPercentage.accuracy >= 70) return "bg-yellow-400";
    if (metricsPercentage.accuracy >= 60) return "bg-orange-400";
    return "bg-red-500";
  };

  if (trainingState.status === "idle") {
    return (
      <div className="flex items-center justify-center h-64 flex-col space-y-4 text-center">
        <AlertCircle className="h-12 w-12 text-orange-500" />
        <h3 className="text-xl font-medium">No Training Data Available</h3>
        <p className="text-muted-foreground max-w-md">
          Start training a model to see performance metrics. Metrics will update in real-time as training progresses.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <BarChart2 className="mr-2 h-5 w-5 text-purple-500" />
              Model Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall Quality:</span>
                <Badge className={getModelQualityColor()}>{getModelQualityDescription()}</Badge>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Accuracy</span>
                    <span className="text-sm font-medium">{metricsPercentage.accuracy}%</span>
                  </div>
                  <Progress value={metricsPercentage.accuracy} className="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Precision</span>
                    <span className="text-sm font-medium">{metricsPercentage.precision}%</span>
                  </div>
                  <Progress value={metricsPercentage.precision} className="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Recall</span>
                    <span className="text-sm font-medium">{metricsPercentage.recall}%</span>
                  </div>
                  <Progress value={metricsPercentage.recall} className="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">F1 Score</span>
                    <span className="text-sm font-medium">{metricsPercentage.f1Score}%</span>
                  </div>
                  <Progress value={metricsPercentage.f1Score} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
              Training Loss: {metrics.loss.toFixed(4)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis domain={[0, 100]} fontSize={12} />
                <Tooltip formatter={(value) => [`${value}%`, "Value"]} />
                <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Training history */}
      {trainingState.status === "complete" && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <PieChart className="mr-2 h-5 w-5 text-purple-500" />
              Training History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="epoch" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#8884d8" activeDot={{ r: 8 }} name="Accuracy" />
                <Line yAxisId="right" type="monotone" dataKey="loss" stroke="#82ca9d" name="Loss" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Model explanation (for completed models) */}
      {trainingState.status === "complete" && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              Model Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your {parameters.modelType} model trained on the {parameters.dataset} dataset achieved {metricsPercentage.accuracy}% accuracy.
                This model uses {parameters.optimizer} as optimizer with a learning rate of {parameters.learningRate}.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Dataset</h4>
                  <p className="text-sm text-muted-foreground">{parameters.dataset}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Model Type</h4>
                  <p className="text-sm text-muted-foreground">{parameters.modelType}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Neurons</h4>
                  <p className="text-sm text-muted-foreground">{parameters.neuronLayers.join(' → ')}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Activation</h4>
                  <p className="text-sm text-muted-foreground">{parameters.activationFunction}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ModelMetrics;