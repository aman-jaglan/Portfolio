
import React, { ReactNode } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

// Define interfaces for type safety
interface ProjectDataItem {
  title: string;
  details: ReactNode;
}

interface ProjectDataCollection {
  [key: number]: ProjectDataItem;
}

// Styled components
const BoldHeader = styled.span`
  display: block;
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
  color: #000;
`;

// Bold text for key phrases inside paragraphs
const BoldText = styled.span`
  font-weight: bold;
  color: #000;
`;

// List styling to ensure no unnecessary scrolling
const StyledList = styled.ul`
  padding-left: 20px;
  margin-top: 5px;
  list-style-type: disc;
`;

// Styled paragraph for normal text
const StyledParagraph = styled.p`
  margin-top: 5px;
  line-height: 1.6;
  color: #333;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

// GitHub Link Styling
const StyledLink = styled.a`
  color: #0073e6;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const DetailSection = styled.section`
  padding: 40px;
  font-family: "Courier New", Courier, monospace;
  background-color: inherit;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Styled code block to display content in coding format.
const CodeBlock = styled.pre`
  background-color: inherit;
  color: #333;
  padding: 20px;
  border-left: 4px solid #a8e6cf;
  overflow: auto;
  font-size: 14px;
  line-height: 1.6;
  
  /* Custom styles for headers */
  h1, h2, h3 {
    font-weight: bold;
    color: black;
    margin-top: 20px;
  }
  
  h1 {
    font-size: 18px;
  }

  h2 {
    font-size: 16px;
  }

  h3 {
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    padding: 15px;
    font-size: 13px;
  }
`;

// Styled header that mimics coding comments.
const CodeHeader = styled.div`
  color: #4caf50;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 20px;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

// Styled button to navigate back.
const BackButton = styled.button`
  margin-bottom: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  background: #a8e6cf;
  border: none;
  border-radius: 4px;
  color: #fff;
  transition: background 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background: #8dd3b2;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const NotFoundContainer = styled.div`
  text-align: center;
  padding: 40px;
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
`;

const ProjectDetail: React.FC = () => {
  // Use the correct type for useParams
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Project data formatted in a coding-style.
  const projectData: ProjectDataCollection = {
    1: {
      title: "{ All Resume Solutions }",
      details: (
        <>
          <BoldHeader># Overview</BoldHeader>
          <StyledParagraph>
            All Resume Solutions is an AI-powered tool that helps
            <BoldText> job seekers </BoldText> and
            <BoldText> hiring teams </BoldText> analyze, evaluate,
            and optimize resumes based on job descriptions.
          </StyledParagraph>

          <BoldHeader># Why Was This Project Created?</BoldHeader>
          <StyledParagraph>
            The job market is competitive, and candidates often struggle to tailor
            their resumes for specific roles.
            This project automates <BoldText> resume analysis and job matching </BoldText>
            to help both applicants and recruiters.
          </StyledParagraph>

          <BoldHeader># Key Functionalities</BoldHeader>

          <BoldHeader>{`{ Resume & Job Description Matching }`}</BoldHeader>
          <StyledList>
            <li>Compares resumes with job descriptions and calculates a <BoldText> match score </BoldText>.</li>
            <li>Uses <BoldText> TF-IDF and Word2Vec embeddings </BoldText> to measure similarity.</li>
          </StyledList>

          <BoldHeader>{`{ Resume Analysis & Grammar Check }`}</BoldHeader>
          <StyledList>
            <li>Analyzes <BoldText> resume structure, grammar, and formatting </BoldText>.</li>
            <li>Uses <BoldText> AWS Comprehend & NLP models </BoldText> for text analysis.</li>
          </StyledList>

          <BoldHeader>{`{ AI-Based Resume Ranking for Hiring Teams }`}</BoldHeader>
          <StyledList>
            <li>Helps recruiters <BoldText> rank resumes efficiently </BoldText> based on job descriptions.</li>
            <li>Uses <BoldText> machine learning models </BoldText> for candidate ranking.</li>
          </StyledList>

          <BoldHeader>{`{ Job Recommendation System }`}</BoldHeader>
          <StyledList>
            <li>Processes job descriptions and suggests <BoldText> matching job listings </BoldText>.</li>
            <li>Uses <BoldText> Word2Vec & ML models </BoldText> to extract skills.</li>
          </StyledList>

          <BoldHeader>{`{ Resume Generation & Skill-Gap Analyzer }`}</BoldHeader>
          <StyledList>
            <li>Generates <BoldText> optimized resumes </BoldText> for specific roles.</li>
            <li>Identifies missing skills and suggests improvements.</li>
          </StyledList>

          <BoldHeader># Who Can Benefit?</BoldHeader>
          <StyledList>
            <li> <BoldText> Job Seekers </BoldText> – Improve resumes and increase interview chances.</li>
            <li> <BoldText> Recruiters </BoldText> – Filter and rank candidates automatically.</li>
            <li> <BoldText> HR Tech Companies </BoldText> – Integrate AI-powered resume analysis.</li>
          </StyledList>

          <BoldHeader># Future Enhancements</BoldHeader>
          <StyledList>
            <li> AI-generated resumes with <BoldText> industry-specific optimizations </BoldText>.</li>
            <li> <BoldText> Multilingual support </BoldText> for international job seekers.</li>
          </StyledList>

          <BoldHeader># GitHub Repository</BoldHeader>
          <StyledParagraph>
            🔗 <StyledLink href="https://github.com/AravindaVijay/NLP_FinalProject-Group1" target="_blank">
              View Source Code
            </StyledLink>
          </StyledParagraph>
        </>
      )
    },
    2: {
      title: "{ Melody Generator AI }",
      details: (
        <>
          <BoldHeader># Overview</BoldHeader>
          <StyledParagraph>
            The Melody Generator AI is a deep learning-powered system that creates original musical
            compositions by predicting future musical notes based on past sequences.
            By leveraging LSTM networks, CNNs, and attention mechanisms, this project explores the
            intersection of artificial intelligence and music creation.
          </StyledParagraph>

          <BoldHeader># Why Was This Project Created?</BoldHeader>
          <StyledParagraph>
            AI-generated music is transforming the creative landscape, offering new ways to compose
            melodies and assist musicians. The goal of this project was to develop a model that
            understands and generates musical patterns, making AI a creative partner in music
            composition.
          </StyledParagraph>

          <BoldHeader># Key Functionalities</BoldHeader>

          <BoldHeader>{`{ LSTM-Based Melody Prediction }`}</BoldHeader>
          <StyledList>
            <li>Uses bidirectional LSTM to capture long-term dependencies in music sequences.</li>
            <li>Predicts upcoming notes based on historical patterns, ensuring musical coherence.</li>
          </StyledList>

          <BoldHeader>{`{ Convolutional Neural Network (CNN) for Feature Extraction }`}</BoldHeader>
          <StyledList>
            <li>Detects local rhythmic and harmonic patterns in note sequences.</li>
            <li>Utilizes a Conv1D layer to extract high-level music features.</li>
          </StyledList>

          <BoldHeader>{`{ Multi-Head Attention Mechanism }`}</BoldHeader>
          <StyledList>
            <li>Helps the model focus on important sections of the input sequence.</li>
            <li>Enhances the AI's ability to generate melodies with <BoldText>musical structure and variation</BoldText>.</li>
          </StyledList>

          <BoldHeader>{`{ Data Preprocessing & Transposition }`}</BoldHeader>
          <StyledList>
            <li>Transposes melodies into all major and minor keys to increase dataset diversity.</li>
            <li>Converts notes into a one-hot encoded representation for efficient model training.</li>
          </StyledList>

          <BoldHeader>{`{ Training on GPU-Optimized Environments }`}</BoldHeader>
          <StyledList>
            <li>Utilizes PyTorch with CUDA acceleration for faster training.</li>
            <li>Trained for 20 epochs with adaptive learning using the <BoldText>Adam optimizer</BoldText>.</li>
          </StyledList>

          <BoldHeader>{`{ MIDI File Generation }`}</BoldHeader>
          <StyledList>
            <li>Generates melodies in MIDI format, allowing playback in any music software.</li>
            <li>Processes notes with variable step durations to capture realistic rhythm.</li>
          </StyledList>

          <BoldHeader># Who Can Benefit?</BoldHeader>
          <StyledList>
            <li><BoldText>Musicians & Composers</BoldText> – AI-assisted melody creation for inspiration.</li>
            <li><BoldText>AI & ML Researchers</BoldText> – Understanding deep learning applications in music.</li>
            <li><BoldText>Music Tech Companies</BoldText> – Integrating AI-generated music into products.</li>
          </StyledList>

          <BoldHeader># Future Enhancements</BoldHeader>
          <StyledList>
            <li>Improve expressiveness and dynamic control in generated music.</li>
            <li>Integrate Transformer-based architectures for enhanced pattern recognition.</li>
            <li>Expand dataset diversity for better genre adaptability.</li>
          </StyledList>

          <BoldHeader># GitHub Repository</BoldHeader>
          <StyledParagraph>
            🔗 <StyledLink href="https://github.com/tushar2016sharma/Final-Project-Group7" target="_blank">
              View Source Code
            </StyledLink>
          </StyledParagraph>
        </>
      )
    },
    3: {
      title: "{ 3D Image Reconstruction }",
      details: (
        <>
          <BoldHeader># Overview</BoldHeader>
          <StyledParagraph>
            This project converts 2D images into 3D models using advanced computer vision techniques,
            including depth estimation and point cloud generation.
          </StyledParagraph>

          <BoldHeader># Why Was This Project Created?</BoldHeader>
          <StyledParagraph>
            3D reconstruction from 2D images has applications in virtual reality, augmented reality,
            robotics, and autonomous systems. This project aims to make this technology more accessible.
          </StyledParagraph>

          <BoldHeader># Key Functionalities</BoldHeader>

          <BoldHeader>{`{ Depth Estimation with GLPN }`}</BoldHeader>
          <StyledList>
            <li>Uses Global-Local Path Networks to estimate depth from single images.</li>
            <li>Achieves state-of-the-art accuracy on NYU Depth V2 dataset.</li>
          </StyledList>

          <BoldHeader>{`{ Open3D Integration }`}</BoldHeader>
          <StyledList>
            <li>Leverages the Open3D library for point cloud processing and visualization.</li>
            <li>Enables real-time manipulation of 3D models.</li>
          </StyledList>

          <BoldHeader># GitHub Repository</BoldHeader>
          <StyledParagraph>
            🔗 <StyledLink href="https://github.com/example/3d-reconstruction" target="_blank">
              View Source Code
            </StyledLink>
          </StyledParagraph>
        </>
      )
    },
    4: {
      title: "{ Multi-Agent Financial Advisor }",
      details: (
        <>
          <BoldHeader># Overview</BoldHeader>
          <StyledParagraph>
            A LLM-powered multi-agent system that acts as a personal financial advisor,
            providing expense classification, spending insights, and investment recommendations.
          </StyledParagraph>

          <BoldHeader># Key Functionalities</BoldHeader>

          <BoldHeader>{`{ Expense Classification }`}</BoldHeader>
          <StyledList>
            <li>Automatically categorizes expenses using NLP techniques.</li>
            <li>Learns user patterns over time to improve accuracy.</li>
          </StyledList>

          <BoldHeader>{`{ Spending Analysis }`}</BoldHeader>
          <StyledList>
            <li>Provides visualizations of spending patterns.</li>
            <li>Identifies areas where expenses can be reduced.</li>
          </StyledList>

          <BoldHeader>{`{ Investment Advisory }`}</BoldHeader>
          <StyledList>
            <li>Recommends investment portfolios based on risk profile.</li>
            <li>Monitors market trends to suggest timely adjustments.</li>
          </StyledList>

          <BoldHeader># GitHub Repository</BoldHeader>
          <StyledParagraph>
            🔗 <StyledLink href="https://github.com/example/financial-advisor" target="_blank">
              View Source Code
            </StyledLink>
          </StyledParagraph>
        </>
      )
    },
    5: {
      title: "{ Competency-Based AI Tool }",
      details: (
        <>
          <BoldHeader># Overview</BoldHeader>
          <StyledParagraph>
            An AI-driven platform designed to align nursing school courses with competency-based
            education standards, enhancing the quality of healthcare education.
          </StyledParagraph>

          <BoldHeader># Key Functionalities</BoldHeader>

          <BoldHeader>{`{ Curriculum Mapping }`}</BoldHeader>
          <StyledList>
            <li>Maps course content to required competencies.</li>
            <li>Identifies gaps in curriculum coverage.</li>
          </StyledList>

          <BoldHeader>{`{ Student Progress Tracking }`}</BoldHeader>
          <StyledList>
            <li>Monitors individual student achievement of competencies.</li>
            <li>Provides personalized learning recommendations.</li>
          </StyledList>

          <BoldHeader>{`{ Educational Analytics }`}</BoldHeader>
          <StyledList>
            <li>Generates reports on program effectiveness.</li>
            <li>Helps institutions meet accreditation requirements.</li>
          </StyledList>

          <BoldHeader># GitHub Repository</BoldHeader>
          <StyledParagraph>
            🔗 <StyledLink href="https://github.com/example/competency-ai" target="_blank">
              View Source Code
            </StyledLink>
          </StyledParagraph>
        </>
      )
    }
  };

  // Convert id to number to correctly access the data.
  const numId = id ? Number(id) : 0;
  const project = projectData[numId];

  if (!project) {
    return (
      <DetailSection>
        <NotFoundContainer>
          <h2>Project Not Found</h2>
          <BackButton onClick={() => navigate(-1)}>Back to Projects</BackButton>
        </NotFoundContainer>
      </DetailSection>
    );
  }

  return (
    <DetailSection>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <CodeHeader>// {project.title}</CodeHeader>
      <CodeBlock>{project.details}</CodeBlock>
    </DetailSection>
  );
};

export default ProjectDetail;
