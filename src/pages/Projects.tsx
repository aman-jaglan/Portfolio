import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { SharedContainer } from '../styles/theme';

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  github: string;
  liveDemo?: string;
  category: 'AI' | 'Web' | 'Data' | 'Mobile';
  color: string;
}

const gridAnimation = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const Container = styled.div`
  ${SharedContainer.MainContainer}
  position: relative;
  min-height: 100vh;
  background-color: #0f0f0f;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: ${gridAnimation} 20s linear infinite;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(15,15,15,0) 0%, #0f0f0f 100%);
    z-index: 2;
  }
`;

const ProjectsGrid = styled.div`
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const glow = keyframes`
  0% { box-shadow: 0 0 20px rgba(255,255,255,0.1); }
  50% { box-shadow: 0 0 30px rgba(255,255,255,0.2); }
  100% { box-shadow: 0 0 20px rgba(255,255,255,0.1); }
`;

const ProjectCard = styled.div<{ color: string }>`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.color};
    opacity: 0.1;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, ${props => props.color} 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    transform: translateZ(-1px);
  }

  &:hover {
    transform: translateY(-10px) rotateX(10deg);
    border-color: rgba(255, 255, 255, 0.2);
    animation: ${glow} 2s ease-in-out infinite;

    &::before {
      opacity: 0.2;
    }

    &::after {
      opacity: 0.1;
    }
  }
`;

const CategoryBadge = styled.span<{ color: string }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  background: ${props => props.color};
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  animation: ${glowPulse} 2s ease-in-out infinite;
`;

const ProjectTitle = styled.h3`
  ${SharedContainer.GradientText}
  font-size: 1.8rem;
  margin-bottom: 1rem;
  position: relative;
`;

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;

  ${ProjectCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ActionButton = styled.a`
  ${SharedContainer.Button}
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const PageTitle = styled.h1`
  ${SharedContainer.GradientText}
  font-size: clamp(2.5rem, 5vw, 4rem);
  text-align: center;
  margin: 3rem 0;
  position: relative;
  z-index: 3;
`;

const DemoDisplay = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 300px;
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  z-index: 1000;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const Projects: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      name: "CREdge-AI",
      description: "An AI-powered financial management platform featuring synthetic data generation, transaction analysis, and budget optimization. Built with FastAPI, React, and advanced ML models including GANs and GPT for financial forecasting.",
      technologies: ["Python", "FastAPI", "React", "TensorFlow", "OpenAI", "Docker"],
      github: "https://github.com/aman-jaglan/Capstone_Project",
      category: "AI",
      color: "rgba(255, 88, 88, 0.8)",
      liveDemo: "https://credge.vercel.app"
    },
    {
      id: 2,
      name: "Synthesizer",
      description: "A Python-based tool for generating synthetic data using advanced statistical methods and machine learning techniques. Features customizable data generation and validation capabilities.",
      technologies: ["Python", "Pandas", "NumPy", "Scikit-learn"],
      github: "https://github.com/aman-jaglan/Synthesizer",
      category: "Data",
      color: "rgba(88, 101, 242, 0.8)"
    },
    {
      id: 3,
      name: "ReplicaDB",
      description: "A database replication and synchronization tool that ensures data consistency across multiple database instances with real-time updates and conflict resolution.",
      technologies: ["Python", "SQL", "Redis", "Docker"],
      github: "https://github.com/aman-jaglan/ReplicaDB",
      category: "Data",
      color: "rgba(242, 201, 76, 0.8)"
    },
    {
      id: 4,
      name: "American Express Analysis",
      description: "Comprehensive analysis of American Express financial data using advanced data science techniques, including predictive modeling and trend analysis.",
      technologies: ["Python", "Pandas", "Matplotlib", "Scikit-learn"],
      github: "https://github.com/aman-jaglan/American-Express-Analysis",
      category: "Data",
      color: "rgba(87, 242, 135, 0.8)"
    },
    {
      id: 5,
      name: "Pharmacovigilance Analysis",
      description: "Advanced analysis of drug safety data using machine learning to identify potential adverse drug reactions and patterns in large-scale medical datasets.",
      technologies: ["Python", "Pandas", "Scikit-learn", "NLP"],
      github: "https://github.com/aman-jaglan/Pharmacovigilance-Data-Analysis-Project-",
      category: "AI",
      color: "rgba(242, 76, 76, 0.8)"
    }
  ];

  return (
    <Container>
      <PageTitle>Featured Projects</PageTitle>
      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            color={project.color}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            style={{
              transform: hoveredProject === project.id 
                ? 'translateY(-10px) rotateX(10deg) scale(1.02)' 
                : 'translateY(0) rotateX(0) scale(1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <CategoryBadge color={project.color}>
              {project.category}
            </CategoryBadge>
            <ProjectTitle>{project.name}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <TechStack>
              {project.technologies.map((tech, index) => (
                <TechTag 
                  key={index}
                  style={{
                    transform: hoveredProject === project.id 
                      ? `translateY(${index * -2}px)` 
                      : 'translateY(0)',
                    transition: `transform 0.3s ease ${index * 0.1}s`
                  }}
                >
                  {tech}
                </TechTag>
              ))}
            </TechStack>
            <ButtonGroup>
              <ActionButton 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  opacity: hoveredProject === project.id ? 1 : 0,
                  transform: hoveredProject === project.id ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.3s ease'
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                </svg>
                GitHub
              </ActionButton>
              {project.liveDemo && (
                <ActionButton 
                  href={project.liveDemo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (project.id === 1) {
                      e.preventDefault();
                      setShowDemo(!showDemo);
                    }
                  }}
                  style={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                    transform: hoveredProject === project.id ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.3s ease 0.1s'
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/>
                  </svg>
                  {project.id === 1 ? 'Show Demo' : 'Live Demo'}
                </ActionButton>
              )}
            </ButtonGroup>
          </ProjectCard>
        ))}
      </ProjectsGrid>
      {showDemo && (
        <DemoDisplay onClick={() => setShowDemo(false)}>
          <iframe 
            src="https://credge.vercel.app" 
            title="CREdge-AI Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </DemoDisplay>
      )}
    </Container>
  );
};

export default Projects;
