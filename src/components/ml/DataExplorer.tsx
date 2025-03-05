import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, Database, FileWarning, BarChart4, PieChart, PackageCheck } from "lucide-react";
import { TrainingState } from "@/types/ml-types";

interface DataExplorerProps {
  dataset: string;
  trainingState: TrainingState;
}

const DataExplorer: React.FC<DataExplorerProps> = ({ dataset, trainingState }) => {
  // Dataset information
  const datasets = {
    iris: {
      name: "Iris Flower Dataset",
      description: "A small dataset of iris flowers with measurements of sepals and petals",
      features: ["Sepal Length", "Sepal Width", "Petal Length", "Petal Width"],
      target: "Species (Setosa, Versicolor, Virginica)",
      sampleSize: 150,
      classes: 3
    },
    mnist: {
      name: "MNIST Digits",
      description: "Handwritten digit recognition dataset with 70,000 grayscale images",
      features: ["Pixel Values (28x28 = 784 features)"],
      target: "Digit (0-9)",
      sampleSize: 70000,
      classes: 10
    },
    boston: {
      name: "Boston Housing Dataset",
      description: "Housing prices in Boston suburbs with various neighborhood characteristics",
      features: ["CRIM", "ZN", "INDUS", "CHAS", "NOX", "RM", "AGE", "DIS", "RAD", "TAX", "PTRATIO", "B", "LSTAT"],
      target: "Median Home Value",
      sampleSize: 506,
      classes: "Regression"
    },
    california: {
      name: "California Housing Dataset",
      description: "Housing prices in California with neighborhood characteristics",
      features: ["MedInc", "HouseAge", "AveRooms", "AveBedrms", "Population", "AveOccup", "Latitude", "Longitude"],
      target: "Median House Value",
      sampleSize: 20640,
      classes: "Regression"
    }
  };

  const selectedDataset = datasets[dataset as keyof typeof datasets];

  // Sample data points for visualization
  const sampleData = {
    iris: [
      { "Sepal Length": 5.1, "Sepal Width": 3.5, "Petal Length": 1.4, "Petal Width": 0.2, "Species": "Setosa" },
      { "Sepal Length": 7.0, "Sepal Width": 3.2, "Petal Length": 4.7, "Petal Width": 1.4, "Species": "Versicolor" },
      { "Sepal Length": 6.3, "Sepal Width": 3.3, "Petal Length": 6.0, "Petal Width": 2.5, "Species": "Virginica" },
    ],
    mnist: [
      { "Image": "0️⃣", "Label": 0 },
      { "Image": "1️⃣", "Label": 1 },
      { "Image": "2️⃣", "Label": 2 },
    ],
    boston: [
      { "CRIM": 0.00632, "ZN": 18.0, "INDUS": 2.31, "CHAS": 0, "NOX": 0.538, "RM": 6.575, "Price": 24.0 },
      { "CRIM": 0.02731, "ZN": 0.0, "INDUS": 7.07, "CHAS": 0, "NOX": 0.469, "RM": 6.421, "Price": 21.6 },
      { "CRIM": 0.02729, "ZN": 0.0, "INDUS": 7.07, "CHAS": 0, "NOX": 0.469, "RM": 7.185, "Price": 34.7 },
    ],
    california: [
      { "MedInc": 8.3252, "HouseAge": 41.0, "AveRooms": 6.984, "AveBedrms": 1.023, "Price": 452600 },
      { "MedInc": 8.3014, "HouseAge": 21.0, "AveRooms": 6.238, "AveBedrms": 0.972, "Price": 358500 },
      { "MedInc": 7.2574, "HouseAge": 52.0, "AveRooms": 8.288, "AveBedrms": 1.073, "Price": 352100 },
    ]
  };

  const datasetSplit = {
    training: Math.round(selectedDataset.sampleSize * 0.7),
    validation: Math.round(selectedDataset.sampleSize * 0.15),
    testing: Math.round(selectedDataset.sampleSize * 0.15)
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Database className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-medium">{selectedDataset.name}</h2>
        </div>
        <p className="text-muted-foreground">{selectedDataset.description}</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="samples">Sample Data</TabsTrigger>
          <TabsTrigger value="splitting">Data Splitting</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Dataset Size</h3>
                  <p className="text-2xl font-bold">{selectedDataset.sampleSize.toLocaleString()} samples</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Target Variable</h3>
                  <p className="text-base">{selectedDataset.target}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Task Type</h3>
                  <Badge className={
                    typeof selectedDataset.classes === "number"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                  }>
                    {typeof selectedDataset.classes === "number"
                      ? `Classification (${selectedDataset.classes} classes)`
                      : "Regression"}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Features ({selectedDataset.features.length})</h3>
                <div className="space-y-1">
                  {selectedDataset.features.slice(0, 5).map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-3 w-3 text-green-500 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}

                  {selectedDataset.features.length > 5 && (
                    <div className="text-sm text-muted-foreground pl-5">
                      +{selectedDataset.features.length - 5} more features
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <PackageCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium">Data Quality</h3>
              <p className="text-sm text-muted-foreground">No missing values or outliers detected</p>
            </Card>

            <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <BarChart4 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium">Feature Distribution</h3>
              <p className="text-sm text-muted-foreground">Most features follow normal distribution</p>
            </Card>

            <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <PieChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium">Class Balance</h3>
              <p className="text-sm text-muted-foreground">
                {typeof selectedDataset.classes === "number"
                  ? `Balanced across ${selectedDataset.classes} classes`
                  : "Continuous value distribution"}
              </p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="samples" className="pt-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(sampleData[dataset as keyof typeof sampleData][0]).map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData[dataset as keyof typeof sampleData].map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Object.entries(row).map(([key, value], cellIndex) => (
                      <TableCell key={cellIndex}>
                        {typeof value === 'number' && key !== 'Label'
                          ? value.toFixed(2)
                          : value as React.ReactNode}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="splitting" className="pt-4">
          <Card className="p-4">
            <h3 className="text-base font-medium mb-4">Data Split Strategy</h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Training Set</span>
                  <span className="text-sm font-medium">{datasetSplit.training} samples (70%)</span>
                </div>
                <div className="w-full bg-blue-100 dark:bg-blue-950 h-2 rounded-full">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Used for training the model and optimizing parameters
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Validation Set</span>
                  <span className="text-sm font-medium">{datasetSplit.validation} samples (15%)</span>
                </div>
                <div className="w-full bg-purple-100 dark:bg-purple-950 h-2 rounded-full">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Used for hyperparameter tuning and early stopping
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Testing Set</span>
                  <span className="text-sm font-medium">{datasetSplit.testing} samples (15%)</span>
                </div>
                <div className="w-full bg-green-100 dark:bg-green-950 h-2 rounded-full">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Used for final model evaluation only
                </p>
              </div>
            </div>

            <div className="mt-6 p-3 bg-muted rounded-lg">
              <div className="flex items-start gap-2">
                <FileWarning className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Data Preprocessing</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    All numerical features are standardized (zero mean, unit variance).
                    Categorical features are one-hot encoded. Train/val/test split is stratified
                    by target class to maintain class distribution.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataExplorer;