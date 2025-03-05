import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Database, Laptop, Server, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { MLParameters, TrainingState } from "@/types/ml-types";

interface MLWorkflowProps {
  trainingState: TrainingState;
  parameters: MLParameters;
}

const MLWorkflow: React.FC<MLWorkflowProps> = ({ trainingState, parameters }) => {
  const getStepStatus = (step: number) => {
    if (trainingState.status === "idle") {
      return step === 1 ? "current" : "pending";
    }

    if (trainingState.status === "training") {
      if (step < 2) return "completed";
      if (step === 2) return "current";
      return "pending";
    }

    if (trainingState.status === "complete") {
      if (step < 3) return "completed";
      if (step === 3) return "current";
      return "pending";
    }

    if (trainingState.status === "failed") {
      if (step < 2) return "completed";
      return "error";
    }

    return "pending";
  };

  const steps = [
    {
      id: 1,
      name: "Data Preparation",
      description: "Clean, preprocess, and split the dataset",
      icon: Database,
      color: "text-blue-500"
    },
    {
      id: 2,
      name: "Model Training",
      description: "Train the model with specified hyperparameters",
      icon: Brain,
      color: "text-purple-500"
    },
    {
      id: 3,
      name: "Model Evaluation",
      description: "Evaluate model performance on test data",
      icon: Laptop,
      color: "text-green-500"
    },
    {
      id: 4,
      name: "Deployment",
      description: "Deploy the model to production environment",
      icon: Server,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-medium">ML Workflow Pipeline</h2>
        <p className="text-muted-foreground">
          Visualizing the end-to-end process from data to deployment
        </p>
      </div>

      {/* Status and progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            {trainingState.status === "idle" && "Ready to Start"}
            {trainingState.status === "training" && `Training in Progress (Epoch ${trainingState.currentEpoch}/${parameters.epochs})`}
            {trainingState.status === "complete" && "Training Complete"}
            {trainingState.status === "failed" && "Training Failed"}
          </span>

          {trainingState.status !== "idle" && (
            <Badge
              variant={trainingState.status === "complete" ? "default" : "outline"}
              className={
                trainingState.status === "training" ? "bg-blue-500" :
                trainingState.status === "complete" ? "bg-green-500" :
                "bg-red-500"
              }
            >
              {trainingState.status === "training" && "Running"}
              {trainingState.status === "complete" && "Success"}
              {trainingState.status === "failed" && "Failed"}
            </Badge>
          )}
        </div>

        {trainingState.status !== "idle" && (
          <Progress value={trainingState.progress} className="h-2" />
        )}
      </div>

      {/* Workflow steps */}
      <div className="relative">
        {/* Connector line */}
        <div className="absolute left-6 top-10 h-[calc(100%-40px)] w-px bg-border" />

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step) => {
            const status = getStepStatus(step.id);
            return (
              <div key={step.id} className="relative flex gap-6 items-center">
                {/* Step icon */}
                <div className={`
                  relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full
                  ${status === "completed" ? "bg-green-100 dark:bg-green-900" : 
                    status === "current" ? "bg-blue-100 dark:bg-blue-900" :
                    status === "error" ? "bg-red-100 dark:bg-red-900" :
                    "bg-muted"}
                `}>
                  {status === "completed" ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : status === "error" ? (
                    <AlertCircle className="h-6 w-6 text-red-500" />
                  ) : (
                    <step.icon className={`h-6 w-6 ${step.color}`} />
                  )}
                </div>

                {/* Step content */}
                <div className="flex flex-col">
                  <h3 className="text-base font-medium">{step.name}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>

                  {/* Additional step-specific content */}
                  {step.id === 2 && trainingState.status === "training" && (
                    <div className="mt-2">
                      <div className="text-xs text-muted-foreground mb-1">
                        Training progress: {Math.round(trainingState.progress)}%
                      </div>
                      <Progress value={trainingState.progress} className="h-1 w-[180px]" />
                    </div>
                  )}

                  {step.id === 3 && trainingState.status === "complete" && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Accuracy: {(trainingState.metrics.accuracy * 100).toFixed(1)}%
                      </Badge>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                        Loss: {trainingState.metrics.loss.toFixed(3)}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MLWorkflow;