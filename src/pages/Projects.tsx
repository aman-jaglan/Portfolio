
import React, { useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// Define interfaces for type safety
interface Project {
  id: number;
  name: string;
  brief: string;
  details: string;
  style: {
    left: string;
    top: string;
  };
}

interface Position {
  x: number;
  y: number;
}

interface MapContainerProps {
  dragging: boolean;
}

// Styled container for the projects map.
const ProjectsSection = styled.section`
  position: relative;
  width: 100%;
  height: 700px;
  background-color: #fff;
  overflow: hidden;
  border: 1px solid #eee;
  
  @media (max-width: 768px) {
    height: 500px;
  }
`;

const Header = styled.h2`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 36px;
  z-index: 10;
  font-family: "Courier New", Courier, monospace;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

// Zoomable and draggable container.
const MapContainer = styled.div<MapContainerProps>`
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100% - 80px);
  transform-origin: top left;
  transition: transform 0.2s ease-out;
  cursor: ${({ dragging }) => (dragging ? "grabbing" : "grab")};
`;

// Animation for hover effect
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Project box that expands on hover.
const BoxWrapper = styled.div`
  position: absolute;
  background-color: rgba(168, 230, 207, 0.2);
  border: 2px solid #a8e6cf;
  border-radius: 8px;
  font-family: "Courier New", Courier, monospace;
  color: #333;
  padding: 10px;
  box-sizing: border-box;
  width: 180px;
  height: 80px;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 8;
  word-wrap: break-word;
  
  &:hover {
    width: 300px;
    min-height: 200px;
    height: auto;
    overflow: auto;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    animation: ${floatAnimation} 2s ease-in-out infinite;
  }
  
  &:hover .brief {
    opacity: 0;
  }
  
  &:hover .full-details {
    opacity: 1;
  }
`;

// Brief content (visible in collapsed state)
const BriefContent = styled.div`
  font-size: 14px;
  text-align: center;
  margin-top: 4px;
  opacity: 1;
  transition: opacity 0.3s ease;
`;

// Full details content (fades in on hover)
const FullDetails = styled.div`
  font-size: 14px;
  text-align: left;
  margin-top: 10px;
  white-space: pre-line;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

// Button to indicate that clicking will open the detail page.
const ViewDetailsButton = styled.button`
  margin-top: 8px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  background: #a8e6cf;
  border: none;
  border-radius: 4px;
  color: #fff;
  transition: background 0.3s ease;
  
  &:hover {
    background: #8dd3b2;
  }
`;

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [scale, setScale] = useState<number>(1);
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<boolean>(false);
  const [lastPosition, setLastPosition] = useState<Position>({ x: 0, y: 0 });

  // Sample project data
  const projects: Project[] = [
    {
      id: 1,
      name: "# import All Resume Solutions",
      brief:
        "An AI-powered tool to optimize and analyze resumes with job matching and grammar checking.",
      details: "",
      style: { left: "10%", top: "20%" }
    },
    {
      id: 2,
      name: "# import Melody Generator AI",
      brief:
        "A deep learning-based AI that generates music melodies using LSTM, GRU, and Autoencoder models.",
      details: "",
      style: { left: "40%", top: "20%" }
    },
    {
      id: 3,
      name: "# import 3D Image Reconstruction",
      brief:
        "A computer vision project that converts 2D images into 3D models using Open3D and GLPN for depth estimation.",
      details: "",
      style: { left: "40%", top: "60%" }
    },
    {
      id: 4,
      name: "# import Multi-Agent Financial Advisor",
      brief:
        "An LLM-powered multi-agent system for expense classification, spending recommendations, and investment advisory.",
      details: "",
      style: { left: "70%", top: "50%" }
    },
    {
      id: 5,
      name: "# import Competency-Based AI Tool",
      brief:
        "An AI-driven platform designed to align nursing school courses with competency-based education standards.",
      details: "",
      style: { left: "12%", top: "65%" }
    }
  ];

  // Zoom handling via mouse wheel.
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      setScale((prev) => {
        let newScale = prev * (1 - e.deltaY / 500);
        newScale = Math.max(0.5, Math.min(newScale, 2));
        return newScale;
      });
    },
    []
  );

  // Panning event handlers.
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(true);
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastPosition.x;
    const dy = e.clientY - lastPosition.y;
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  return (
    <ProjectsSection>
      <Header>Projects Map</Header>
      <MapContainer
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        dragging={dragging}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`
        }}
      >
        {projects.map((project) => (
          <BoxWrapper
            key={project.id}
            style={project.style}
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <div className="name">{project.name}</div>
            <BriefContent className="brief">{project.brief}</BriefContent>
            <FullDetails className="full-details">
              {project.brief}
              <ViewDetailsButton>View Details</ViewDetailsButton>
            </FullDetails>
          </BoxWrapper>
        ))}
      </MapContainer>
    </ProjectsSection>
  );
};

export default Projects;
