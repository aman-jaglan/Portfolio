import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Book, Briefcase, Code, Github, Linkedin, Mail } from 'lucide-react';

// Define types for our styled components
interface AboutContainerProps {
  children: React.ReactNode;
}

interface ProfileCardProps {
  children: React.ReactNode;
}

interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
}

interface SkillProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Styled components with improved design
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  padding: 2rem 1rem;
  
  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const AboutContainer = styled(motion.div)<AboutContainerProps>`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 350px 1fr;
  }
`;

const ProfileCard = styled(motion.div)<ProfileCardProps>`
  background: linear-gradient(135deg, #2d4059, #3f5573);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  position: sticky;
  top: 100px;
  height: fit-content;
`;

const ProfileImageContainer = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(to top, rgba(45, 64, 89, 0.9), transparent);
  }
`;

const ProfileImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ProfileInfo = styled.div`
  padding: 1.5rem;
  width: 100%;
  text-align: center;
`;

const ProfileName = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #a8e6cf, #dcedc1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProfileTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SocialLink = styled.a<SocialLinkProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(168, 230, 207, 0.3);
    transform: translateY(-3px);
  }
`;

const ContactButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 80%;
  padding: 0.8rem;
  border-radius: 50px;
  background: linear-gradient(90deg, #a8e6cf, #dcedc1);
  color: #2d4059;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(168, 230, 207, 0.4);
  }
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const Section = styled(motion.section)`
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #2d4059;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #a8e6cf, #dcedc1);
  }
`;

const BioText = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
`;

const HighlightedText = styled.span`
  background: linear-gradient(90deg, #a8e6cf, #dcedc1);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const SkillCard = styled(motion.div)`
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const SkillHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const SkillIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #a8e6cf, #dcedc1);
  color: #2d4059;
`;

const SkillTitle = styled.h3`
  font-size: 1.2rem;
  color: #2d4059;
`;

const SkillDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
`;

// Skills data
const skills: SkillProps[] = [
  {
    icon: <Code size={20} />,
    title: "ML & AI Development",
    description: "Building predictive models using Python, TensorFlow and PyTorch with a focus on NLP and deep learning"
  },
  {
    icon: <Briefcase size={20} />,
    title: "Data Engineering",
    description: "ETL pipeline design on AWS EC2 with expertise in SQL, NoSQL databases, and cloud computing"
  },
  {
    icon: <Book size={20} />,
    title: "Research & Analysis",
    description: "Statistical analysis, A/B testing, and data visualization to derive actionable insights"
  },
  {
    icon: <Award size={20} />,
    title: "Security & Compliance",
    description: "Implementing HIPAA-compliant data security measures using AES-256 encryption"
  }
];

const About: React.FC = () => {
  return (
    <PageContainer>
      <AboutContainer
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <ProfileCard variants={fadeIn}>
          <ProfileImageContainer>
            <ProfileImage src="/IMG_3257.jpg" alt="Aman Jaglan" />
          </ProfileImageContainer>

          <ProfileInfo>
            <ProfileName>Aman Jaglan</ProfileName>
            <ProfileTitle>Data Scientist & ML Engineer</ProfileTitle>

            <SocialLinks>
              <SocialLink href="https://github.com/aman-jaglan">
                <Github size={20} />
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/amanjaglan">
                <Linkedin size={20} />
              </SocialLink>
              <SocialLink href="mailto:amanwork2025@gmail.com">
                <Mail size={20} />
              </SocialLink>
            </SocialLinks>

            <ContactButton href="/contact">
              Get in touch <ArrowRight size={16} />
            </ContactButton>
          </ProfileInfo>
        </ProfileCard>

        <ContentContainer>
          <Section
            variants={fadeIn}
          >
            <SectionTitle>About Me</SectionTitle>
            <BioText>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                If data had a language, I'd be its translator. As a Data Scientist, AI enthusiast,
                and Machine Learning aficionado, I turn raw numbers into real-world impact. With a
                Master's in Data Science from <HighlightedText>George Washington University (GPA: 3.82)</HighlightedText>,
                I specialize in predictive modeling, NLP, and cloud computing.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                style={{ marginTop: '1rem' }}
              >
                Currently, I'm at <HighlightedText>King's Ransom Group</HighlightedText>, where I design
                machine learning models that predict customer outcomes while ensuring HIPAA-compliant data
                security with AES-256 encryption. When I'm not optimizing ML workflows on <HighlightedText>AWS EC2</HighlightedText>,
                I mentor aspiring data scientists in Python, SQL, and A/B testing, making data science less of a mystery.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                style={{ marginTop: '1rem' }}
              >
                But my love for AI doesn't stop at work. I've built an AI-powered resume matcher that helps job seekers stand out,
                a melody generator that composes music using deep learning, and a multi-agent LLM system using <HighlightedText>LangGraph & RAG</HighlightedText>
                for advanced query resolution. My mission? To make AI smarter, data-driven decisions easier, and life a little more efficient—one algorithm at a time.
              </motion.p>
            </BioText>
          </Section>

          <Section
            variants={fadeIn}
          >
            <SectionTitle>My Expertise</SectionTitle>
            <SkillsGrid
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {skills.map((skill, index) => (
                <SkillCard
                  key={index}
                  variants={fadeIn}
                >
                  <SkillHeader>
                    <SkillIcon>{skill.icon}</SkillIcon>
                    <SkillTitle>{skill.title}</SkillTitle>
                  </SkillHeader>
                  <SkillDescription>{skill.description}</SkillDescription>
                </SkillCard>
              ))}
            </SkillsGrid>
          </Section>
        </ContentContainer>
      </AboutContainer>
    </PageContainer>
  );
};

export default About;
