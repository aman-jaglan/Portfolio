import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { SharedContainer } from "../styles/theme";

// Define interfaces
interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  logo: string;
  points: string[];
}

interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

// Styled components
const ExperienceSection = styled.section`
  ${SharedContainer.MainContainer}
  padding: 100px 0;
  background-color: #0f0f0f;
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 20%, rgba(41, 41, 41, 0.025) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(41, 41, 41, 0.025) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const SectionTitle = styled.h2`
  ${SharedContainer.GradientText}
  font-size: clamp(2.5rem, 5vw, 4rem);
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ExperienceContainer = styled.div`
  ${SharedContainer.ContentWrapper}
  position: relative;
  padding-top: 60px;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-1px);
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, 
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.05) 100%
    );
    z-index: 1;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
`;

const ExperienceItem = styled.div<{ isVisible: boolean }>`
  position: relative;
  margin: 100px 0;
  z-index: 2;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateX(${props => props.isVisible ? '0' : '-50px'});
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  &:nth-child(even) {
    transform: translateX(${props => props.isVisible ? '0' : '50px'});
  }

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scale(${props => props.isVisible ? 1 : 0});
    width: 20px;
    height: 20px;
    background: #0f0f0f;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    z-index: 3;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
  }

  &:hover::before {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(-50%) scale(1.2);
  }
`;

const CardWrapper = styled.div<{ isVisible: boolean }>`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
  box-sizing: border-box;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 600px;
  position: relative;
  left: 50%;
  transform: translateX(-50%) perspective(1000px) rotateY(${props => props.isVisible ? '0' : '-10deg'});
  transform-origin: center;
  opacity: ${props => props.isVisible ? 1 : 0};

  &:hover {
    transform: translateX(-50%) perspective(1000px) rotateY(5deg);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 1200px) {
    width: 500px;
  }

  @media (max-width: 768px) {
    width: 90%;
    left: 0;
    transform: none;
    
    &:hover {
      transform: none;
    }
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
`;

const CompanyLogo = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 8px;
  padding: 5px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  ${CardWrapper}:hover & {
    transform: scale(1.1) rotate(5deg);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ExperienceTitle = styled.h3`
  ${SharedContainer.GradientText}
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 15px 0;
  transition: all 0.3s ease;
`;

const ExperienceSubTitle = styled.h4`
  ${SharedContainer.GradientText}
  font-size: 26px;
  margin: 0 0 15px 0;
  transition: all 0.3s ease;
`;

const ExperienceCompany = styled.p`
  font-size: 22px;
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  font-weight: 500;

  ${CardWrapper}:hover & {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const ExperienceDetails = styled.div`
  font-size: 20px;
  margin-top: 30px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease 0.2s;

  ${CardWrapper}:hover & {
    opacity: 1;
    transform: translateY(0);
    color: rgba(255, 255, 255, 0.8);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    
    li {
      position: relative;
      padding-left: 25px;
      margin-bottom: 12px;
      opacity: 0;
      transform: translateX(-20px);
      transition: all 0.3s ease;
      
      ${CardWrapper}:hover & {
        opacity: 1;
        transform: translateX(0);
      }
      
      &:nth-child(1) { transition-delay: 0.1s; }
      &:nth-child(2) { transition-delay: 0.2s; }
      &:nth-child(3) { transition-delay: 0.3s; }
      
      &::before {
        content: '▹';
        position: absolute;
        left: 0;
        color: rgba(255, 255, 255, 0.4);
        transition: all 0.3s ease;
      }

      &:hover::before {
        color: rgba(255, 255, 255, 0.8);
        transform: scale(1.2);
      }
    }
  }

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    overflow-x: hidden;
    margin: 0 -20px;
    padding: 0 20px;
  }
`;

// The main component
const Experience: React.FC = () => {
  const [visibleItems, setVisibleItems] = React.useState<boolean[]>([]);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sample experience data
  const experiences: ExperienceItem[] = [
    {
      year: "2025",
      role: "Data Scientist Intern",
      company: "King's Ransom Group",
      logo: "https://static.wixstatic.com/media/2e2477_2df6a48dff724ea5b46cea5664c9abb6~mv2.png/v1/fit/w_2500,h_1330,al_c/2e2477_2df6a48dff724ea5b46cea5664c9abb6~mv2.png",
      points: [
        "Designed ML model for claims resolution efficiency",
        "Implemented HIPAA-compliant storage using Snowflake",
        "Optimized ML workflows on AWS EC2 for faster training"
      ]
    },
    {
      year: "2024",
      role: "Data Science Assistant",
      company: "Colombian College of Art and Science",
      logo: "https://yt3.googleusercontent.com/ytc/AIdro_kxZ1Yrj7Vph834N2wBmm8WDiTVFACJKHzH-fiMP-Pppw=s900-c-k-c0x00ffffff-no-rj",
      points: [
        "Resolved CUDA GPU issues for 30+ students",
        "Mentored 50+ students in Python, SQL & A/B testing",
        "Built & managed Data Science Help Desk with Flask"
      ]
    },
    {
      year: "2023",
      role: "Assistant Manager",
      company: "Lerner Health and Wellness Centre",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfpbZiNKzxMSAP0Y-HYOuTHDg_M1QJAtYYZsKDv86SvOCeas8yS3p_GUkZuP3z-RblkQ&usqp=CAU",
      points: [
        "Led team of 5+ staff members",
        "Implemented new scheduling system reducing wait times by 30%"
      ]
    },
    {
      year: "2022",
      role: "Software Engineer",
      company: "Protiviti",
      logo: "https://cdn-connections.villanova.edu/wp-content/uploads/sites/162/2023/08/Protiviti-2.jpg",
      points: [
        "Built a Salesforce-integrated scheduling system",
        "Automated data migration to Azure Databricks",
        "Optimized ETL processes for 500K+ rows daily"
      ]
    },
    {
      year: "2021",
      role: "Data Science Intern",
      company: "Budgeteer",
      logo: "data:image/jpeg;base64,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",
      points: [
        "Developed budget forecasting model",
        "Automated data validation processes",
        "Created client-facing analytics reports"
      ]
    }
  ];

  const projects: ProjectItem[] = [
    {
      name: "AI-Powered Analytics Platform",
      description: "Advanced analytics platform leveraging machine learning for real-time insights and predictions. Features include automated data processing, interactive visualizations, and predictive modeling.",
      technologies: ["Python", "TensorFlow", "React", "Node.js", "AWS"],
      github: "https://github.com/yourusername/ai-analytics",
      link: "https://ai-analytics-demo.com"
    },
    {
      name: "Smart Portfolio Website",
      description: "Modern portfolio website built with React and TypeScript, featuring smooth animations, dark theme, and responsive design. Implements best practices for performance and accessibility.",
      technologies: ["React", "TypeScript", "Styled Components", "Framer Motion"],
      github: "https://github.com/yourusername/portfolio"
    },
    {
      name: "Data Visualization Dashboard",
      description: "Interactive dashboard for visualizing complex datasets with customizable charts and real-time updates. Supports multiple data sources and export formats.",
      technologies: ["D3.js", "React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/yourusername/data-viz",
      link: "https://data-viz-demo.com"
    }
  ];

  useEffect(() => {
    setVisibleItems(new Array(experiences.length).fill(false));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = experienceRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setVisibleItems(prev => {
              const newState = [...prev];
              newState[index] = entry.isIntersecting;
              return newState;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px'
      }
    );

    experienceRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ExperienceSection>
      <SectionTitle>Professional Journey</SectionTitle>
      <ExperienceContainer>
        {experiences.map((exp, index) => (
          <ExperienceItem 
            key={index}
            ref={el => experienceRefs.current[index] = el}
            isVisible={visibleItems[index]}
          >
            <CardWrapper isVisible={visibleItems[index]}>
              <LogoContainer>
                <CompanyLogo
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                />
                <div>
                  <ExperienceTitle>{exp.year}</ExperienceTitle>
                  <ExperienceSubTitle>{exp.role}</ExperienceSubTitle>
                  <ExperienceCompany>{exp.company}</ExperienceCompany>
                </div>
              </LogoContainer>

              <ExperienceDetails>
                <ul>
                  {exp.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </ExperienceDetails>
            </CardWrapper>
          </ExperienceItem>
        ))}
      </ExperienceContainer>
    </ExperienceSection>
  );
};

export default Experience;
