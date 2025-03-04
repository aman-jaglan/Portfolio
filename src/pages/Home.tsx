import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactTypingEffect from 'react-typing-effect';
import { useNavigate } from 'react-router-dom';

// Define a type for the ImportStatement component props
interface ImportStatementProps {
  visible: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  'aria-label'?: string;
  children: React.ReactNode;
}

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(45deg, rgba(45, 64, 89, 0.8), rgba(168, 230, 207, 0.6)),
    url('https://source.unsplash.com/random/1920x1080/?coding,data') no-repeat center center/cover;
  text-align: center;
  color: #fff;
  position: relative;
  contain: paint layout;
  padding: 20px;

  @media (max-width: 768px) {
    height: 90vh;
    align-items: flex-start;
  }
`;


const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  mix-blend-mode: multiply;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  padding: 0 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 8vw, 4rem);
  margin-bottom: 1.5rem;
  line-height: 1.2;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);

  @media (max-width: 768px) {
    white-space: normal;
    margin-top: 2rem;
  }
`;

const Subtitle = styled.div`
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  margin: 2rem auto;
  max-width: 800px;
  line-height: 1.6;
  font-weight: 300;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;

const ImportStatement = styled.button<{ $visible: boolean }>`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #a8e6cf;
  font-family: 'Fira Code', monospace;
  cursor: pointer;
  margin-top: 3rem;
  padding: 1rem 2rem;
  border: 2px solid #a8e6cf;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
  opacity: ${props => (props.$visible ? 1 : 0)};
  transform: ${props => (props.$visible ? "translateY(0)" : "translateY(20px)")};
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;

  &:hover {
    background: rgba(168, 230, 207, 0.2);
    transform: translateY(-2px) scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(168, 230, 207, 0.4);
  }

  span {
    font-size: 1.5em;
    transition: transform 0.3s ease;
  }
`;

const Home: React.FC = () => {
  const [showImportStatement, setShowImportStatement] = useState<boolean>(false);
  const navigate = useNavigate();

  // Updated text and timing for a faster, simultaneous effect.
  const titleText = "{Hello, welcome to my world!}";
  const subtitleText = "Some say you can't be a data scientist and a web developer. I say, hold my coffee.";

  // New timing: using faster speeds (50ms per char for title, 40ms per char for subtitle)
  // and the same initial delay for both (500ms).
  const typingDuration = {
    title: titleText.length * 50 + 500, // 50ms/char + 500ms delay
    subtitle: subtitleText.length * 40 + 500 // 40ms/char + 500ms delay
  };

  useEffect(() => {
    // Wait until the longer of the two effects has finished.
    const totalDuration = Math.max(typingDuration.title, typingDuration.subtitle);
    const timer = setTimeout(() => {
      setShowImportStatement(true);
    }, totalDuration);

    return () => clearTimeout(timer);
  }, []);

  const handleImportClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/projects");
  };

  return (
    <HeroSection role="banner" aria-label="Main welcome section">
      <Overlay aria-hidden="true" />
      <HeroContent role="region" aria-label="Introduction content">
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
            typingDelay={500}
          />
        </Subtitle>

        <ImportStatement
          $visible={showImportStatement}
          onClick={handleImportClick}
          aria-label="Navigate to projects section"
        >
          <span>#</span>import Projects
          <span aria-hidden="true">→</span>
        </ImportStatement>
      </HeroContent>
    </HeroSection>
  );
};

export default Home;

