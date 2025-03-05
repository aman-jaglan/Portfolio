import React, { useEffect, useRef } from "react";
import { MLParameters, TrainingState } from "@/types/ml-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, RotateCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface NetworkVisualizer3DProps {
  parameters: MLParameters;
  trainingState: TrainingState;
}

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

const NetworkVisualizer3D: React.FC<NetworkVisualizer3DProps> = ({ parameters, trainingState }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  // Determine network structure
  const getNetworkStructure = () => {
    // Input layer based on dataset
    const inputNeurons = getInputNeurons(parameters.dataset);

    // Hidden layers from parameters
    const hiddenLayers = parameters.neuronLayers;

    // Output layer based on dataset and model type
    const outputNeurons = getOutputNeurons(parameters.dataset, parameters.modelType);

    return [inputNeurons, ...hiddenLayers, outputNeurons];
  };

  useEffect(() => {
    // Skip visualization setup if in idle state
    if (trainingState.status === "idle" || !containerRef.current) return;

    // Clean up previous scene
    if (frameIdRef.current !== null) {
      cancelAnimationFrame(frameIdRef.current);
    }

    if (rendererRef.current && containerRef.current) {
      containerRef.current.removeChild(rendererRef.current.domElement);
      rendererRef.current.dispose();
    }

    // Get container dimensions
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 400; // Fixed height for visualization

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 15;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    if (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controlsRef.current = controls;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create neural network
    const networkStructure = getNetworkStructure();

    // Calculate widest layer for scaling
    const maxNeurons = Math.max(...networkStructure);
    const layerSpacing = 4;
    const maxLayerWidth = 8;

    // Create a group to center the network
    const networkGroup = new THREE.Group();

    // Connections (create first to be behind neurons)
    for (let layerIdx = 0; layerIdx < networkStructure.length - 1; layerIdx++) {
      const currentLayerSize = networkStructure[layerIdx];
      const nextLayerSize = networkStructure[layerIdx + 1];

      // Scale for display (limit displayed neurons)
      const currentDisplaySize = Math.min(currentLayerSize, 25);
      const nextDisplaySize = Math.min(nextLayerSize, 25);

      // Actual scaling factors
      const currentScaleFactor = currentDisplaySize / currentLayerSize;
      const nextScaleFactor = nextDisplaySize / nextLayerSize;

      // Generate connections
      for (let i = 0; i < currentDisplaySize; i++) {
        const iNormalized = (i / (currentDisplaySize - 1) - 0.5) * maxLayerWidth;

        for (let j = 0; j < nextDisplaySize; j++) {
          const jNormalized = (j / (nextDisplaySize - 1) - 0.5) * maxLayerWidth;

          // Calculate opacity based on training state (connections gradually appear)
          let opacity = 0.3;
          if (trainingState.status === "training") {
            opacity = Math.min(0.3, trainingState.progress / 100);
          } else if (trainingState.status === "complete") {
            opacity = 0.3;
          }

          // Create connection line
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x8884d8,
            transparent: true,
            opacity: opacity
          });

          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(layerIdx * layerSpacing - (networkStructure.length * layerSpacing / 2), iNormalized, 0),
            new THREE.Vector3((layerIdx + 1) * layerSpacing - (networkStructure.length * layerSpacing / 2), jNormalized, 0)
          ]);

          const line = new THREE.Line(lineGeometry, lineMaterial);
          networkGroup.add(line);
        }
      }
    }

    // Create neurons
    const neuronGeometry = new THREE.SphereGeometry(0.3, 16, 16);

    for (let layerIdx = 0; layerIdx < networkStructure.length; layerIdx++) {
      const layerSize = networkStructure[layerIdx];

      // Scale for display (limit displayed neurons)
      const displaySize = Math.min(layerSize, 25);

      // Add neurons
      for (let i = 0; i < displaySize; i++) {
        let neuronMaterial;

        if (layerIdx === 0) {
          // Input layer - blue
          neuronMaterial = new THREE.MeshPhongMaterial({ color: 0x4285F4 });
        } else if (layerIdx === networkStructure.length - 1) {
          // Output layer - green
          neuronMaterial = new THREE.MeshPhongMaterial({ color: 0x34A853 });
        } else {
          // Hidden layers - purple
          neuronMaterial = new THREE.MeshPhongMaterial({ color: 0xA142F4 });
        }

        const neuron = new THREE.Mesh(neuronGeometry, neuronMaterial);

        // Position neuron
        const normalizedPos = (i / (displaySize - 1) - 0.5) * maxLayerWidth;
        neuron.position.set(
          layerIdx * layerSpacing - (networkStructure.length * layerSpacing / 2),
          normalizedPos,
          0
        );

        // Add pulsing animation if training
        if (trainingState.status === "training") {
          // Store initial scale to animate
          neuron.userData = { initialScale: 1, pulseOffset: Math.random() * Math.PI * 2 };
        }

        networkGroup.add(neuron);
      }

      // If layer has more neurons than we display, add indicator
      if (layerSize > displaySize) {
        const textMaterial = new THREE.SpriteMaterial({ color: 0x666666 });
        const sprite = new THREE.Sprite(textMaterial);
        sprite.scale.set(1, 0.5, 1);
        sprite.position.set(
          layerIdx * layerSpacing - (networkStructure.length * layerSpacing / 2),
          -(maxLayerWidth / 2) - 1,
          0
        );
        networkGroup.add(sprite);

        // Add text label showing total count
        const textDiv = document.createElement('div');
        textDiv.className = 'absolute text-xs bg-slate-100 rounded px-1';
        textDiv.textContent = `${layerSize} total`;
        textDiv.style.color = '#666';
        container.appendChild(textDiv);

        // Position will be updated in animation loop
        sprite.userData = { textDiv, layer: layerIdx };
      }
    }

    // Add network to scene
    scene.add(networkGroup);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      // Rotate network slightly
      networkGroup.rotation.y += 0.001;

      // Pulsing effect for neurons during training
      if (trainingState.status === "training") {
        const time = Date.now() * 0.001;
        networkGroup.children.forEach((child) => {
          if (child instanceof THREE.Mesh && child.userData && child.userData.initialScale) {
            const pulse = 1 + 0.1 * Math.sin(time * 2 + child.userData.pulseOffset);
            child.scale.set(pulse, pulse, pulse);
          }
        });
      }

      // Update text positions
      networkGroup.children.forEach((child) => {
        if (child.userData && child.userData.textDiv) {
          // Convert 3D position to screen position
          const vector = new THREE.Vector3();
          child.getWorldPosition(vector);
          vector.project(camera);

          const x = (vector.x * width / 2) + width / 2;
          const y = -(vector.y * height / 2) + height / 2;

          child.userData.textDiv.style.transform = `translate(${x}px, ${y + 15}px)`;
        }
      });

      // Render scene
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = containerRef.current.clientWidth;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);

      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }

      // Remove all text divs
      networkGroup.children.forEach((child) => {
        if (child.userData && child.userData.textDiv && containerRef.current) {
          containerRef.current.removeChild(child.userData.textDiv);
        }
      });

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [parameters, trainingState.status, trainingState.progress]);

  // Early return for idle state
  if (trainingState.status === "idle") {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Box className="mr-2 h-5 w-5 text-purple-500" />
            3D Neural Network Visualization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 flex-col space-y-4 text-center">
            <AlertCircle className="h-12 w-12 text-orange-500" />
            <h3 className="text-xl font-medium">No Model Visualization Available</h3>
            <p className="text-muted-foreground max-w-md">
              Start training a model to see the 3D visualization of its architecture.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Main rendering
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Box className="mr-2 h-5 w-5 text-purple-500" />
          3D Neural Network Visualization
          {trainingState.status === "training" && (
            <Badge variant="outline" className="ml-2 animate-pulse">
              Training in progress...
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div
            ref={containerRef}
            className="w-full h-[400px] relative border rounded-md overflow-hidden"
          />

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#4285F4] mr-1.5"></div>
                <span>Input Layer</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#A142F4] mr-1.5"></div>
                <span>Hidden Layers</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#34A853] mr-1.5"></div>
                <span>Output Layer</span>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={() => {
              if (controlsRef.current) {
                controlsRef.current.reset();
              }
            }}>
              <RotateCw className="h-4 w-4 mr-1" /> Reset View
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Drag to rotate, scroll to zoom, and right-click to pan the visualization.
            Some layers show a subset of neurons when the actual count is too large to display.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkVisualizer3D;