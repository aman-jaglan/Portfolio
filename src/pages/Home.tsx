import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactTypingEffect from 'react-typing-effect';
import { useNavigate } from 'react-router-dom';

const VideoBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.85); // Darker overlay for better text visibility
  backdrop-filter: blur(2px); // Subtle blur effect

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    object-fit: cover;
    opacity: 0.25; // Reduced opacity
    filter: brightness(0.7) contrast(1.2); // Adjust brightness and contrast
  }
`;

const MainContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: rgba(15, 15, 15, 0.95); // Dark background with slight transparency

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 20%, rgba(41, 41, 41, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(41, 41, 41, 0.15) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(#ffffff10 1px, transparent 1px),
      radial-gradient(#ffffff10 1px, transparent 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    opacity: 0.15;
    pointer-events: none;
    z-index: 1;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  text-align: center;
  color: #ffffff;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #666666 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
  opacity: 0;
  animation: fadeIn 1s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const Subtitle = styled.div`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: rgba(255, 255, 255, 0.7);
  margin: 2rem auto;
  max-width: 800px;
  line-height: 1.6;
  opacity: 0;
  animation: fadeIn 1s ease forwards 0.5s;
`;

const ImportButton = styled.button<{ $visible: boolean }>`
  font-size: 1.2rem;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 2.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => (props.$visible ? 1 : 0)};
  transform: ${props => (props.$visible ? 'translateY(0)' : 'translateY(20px)')};
  backdrop-filter: blur(10px);
  margin-top: 3rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
  }

  span {
    margin: 0 0.5rem;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  opacity: 0;
  animation: fadeIn 1s ease forwards 1s;

  &::after {
    content: '';
    width: 1px;
    height: 50px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  @keyframes scrollPulse {
    0%, 100% { transform: scaleY(1); opacity: 0.5; }
    50% { transform: scaleY(0.7); opacity: 1; }
  }
`;

const DemoButton = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => (props.$visible ? 1 : 0)};
  transform: ${props => (props.$visible ? 'translateY(0)' : 'translateY(20px)')};
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  z-index: 1000;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
  }
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

const Home: React.FC = () => {
  const [showImportStatement, setShowImportStatement] = useState<boolean>(false);
  const navigate = useNavigate();

  const titleText = "Building Digital Experiences";
  const subtitleText = "Data Scientist & Full Stack Developer crafting innovative solutions at the intersection of AI and modern web technologies";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImportStatement(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleImportClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/projects");
  };

  return (
    <MainContainer>
      <VideoBackground>
        <video autoPlay loop muted playsInline>
          <source src="/credgeAI.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </VideoBackground>
      <HeroSection>
        <ContentWrapper>
          <Title>
            <ReactTypingEffect
              text={[titleText]}
              speed={50}
              eraseDelay={1000000}
              typingDelay={500}
            />
          </Title>

          <Subtitle>
            <ReactTypingEffect
              text={[subtitleText]}
              speed={40}
              eraseDelay={1000000}
              typingDelay={1000}
            />
          </Subtitle>

          <ImportButton
            $visible={showImportStatement}
            onClick={handleImportClick}
            aria-label="View projects"
          >
            <span>{"{"}</span>
            Explore Projects
            <span>{"}"}</span>
          </ImportButton>

          <ScrollIndicator>
            scroll to explore
          </ScrollIndicator>
        </ContentWrapper>
      </HeroSection>
    </MainContainer>
  );
};

export default Home;

