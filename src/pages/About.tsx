import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { SharedContainer } from '../styles/theme';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  ${SharedContainer.MainContainer}
  overflow-x: hidden;
`;

const Content = styled.div`
  ${SharedContainer.ContentWrapper}
`;

const Section = styled.div<{ $delay?: string }>`
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: ${props => props.$delay || '0s'};

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroSection = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  position: relative;
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
  animation: ${fadeIn} 1s ease forwards;

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

const Title = styled.h1`
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  margin-bottom: 2rem;
  ${SharedContainer.GradientText}
`;

const Subtitle = styled.div`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: rgba(255, 255, 255, 0.7);
  max-width: 800px;
  line-height: 1.6;
  margin: 0 auto;
`;

const ProfileSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 6rem 2rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ProfileImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const BioContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BioText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  font-size: 1.1rem;
`;

const HighlightText = styled.span`
  ${SharedContainer.GradientText}
  font-weight: bold;
`;

const SkillsSection = styled(Section)`
  padding: 6rem 2rem;
  text-align: center;
`;

const SkillsTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 3rem;
  ${SharedContainer.GradientText}
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const SkillCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const SkillName = styled.h3`
  ${SharedContainer.GradientText}
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const SkillDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
`;

const StatsSection = styled(Section)`
  padding: 6rem 2rem;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
`;

const StatNumber = styled.div`
  ${SharedContainer.GradientText}
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
`;

const About: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const skills = [
    {
      name: "Machine Learning",
      description: "Developing predictive models and implementing advanced ML algorithms for real-world applications."
    },
    {
      name: "Deep Learning",
      description: "Building and training neural networks for computer vision and natural language processing tasks."
    },
    {
      name: "Full Stack Development",
      description: "Creating end-to-end web applications using modern frameworks and technologies."
    },
    {
      name: "Data Engineering",
      description: "Designing and implementing efficient data pipelines and infrastructure."
    }
  ];

  return (
    <Container>
      <Content>
        <HeroSection>
          <Title>Hello, I'm Aman</Title>
          <Subtitle>
            A Data Scientist and Full Stack Developer crafting innovative solutions
            at the intersection of AI and modern web technologies.
          </Subtitle>
          <ScrollIndicator>scroll to explore</ScrollIndicator>
        </HeroSection>

        <ProfileSection ref={el => sectionRefs.current[0] = el} $delay="0.2s">
          <ProfileImage>
            <img src="/IMG_3257.jpg" alt="Aman Jaglan" />
          </ProfileImage>
          <BioContent>
            <BioText>
              Hello! I'm a <HighlightText>Data Scientist</HighlightText> and{' '}
              <HighlightText>Full Stack Developer</HighlightText> with a passion
              for building innovative solutions that make a difference.
            </BioText>
            <BioText>
              With a Master's in Data Science from{' '}
              <HighlightText>George Washington University</HighlightText>, I
              specialize in developing machine learning models and creating
              intuitive web applications.
            </BioText>
            <BioText>
              My expertise spans across <HighlightText>machine learning</HighlightText>,{' '}
              <HighlightText>deep learning</HighlightText>, and{' '}
              <HighlightText>full-stack development</HighlightText>, allowing me
              to build comprehensive solutions to complex problems.
            </BioText>
          </BioContent>
        </ProfileSection>

        <SkillsSection ref={el => sectionRefs.current[1] = el} $delay="0.3s">
          <SkillsTitle>What I Do</SkillsTitle>
          <SkillsGrid>
            {skills.map((skill) => (
              <SkillCard key={skill.name}>
                <SkillName>{skill.name}</SkillName>
                <SkillDescription>{skill.description}</SkillDescription>
              </SkillCard>
            ))}
          </SkillsGrid>
        </SkillsSection>

        <StatsSection ref={el => sectionRefs.current[2] = el} $delay="0.4s">
          <SkillsTitle>By the Numbers</SkillsTitle>
          <StatsGrid>
            <StatCard>
              <StatNumber>2+</StatNumber>
              <StatLabel>Years Experience</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>10+</StatNumber>
              <StatLabel>Projects Completed</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>15+</StatNumber>
              <StatLabel>ML Models Deployed</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>99%</StatNumber>
              <StatLabel>Client Satisfaction</StatLabel>
            </StatCard>
          </StatsGrid>
        </StatsSection>
      </Content>
    </Container>
  );
};

export default About;
