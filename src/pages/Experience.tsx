
import React from "react";
import styled from "styled-components";

// Define experience data interface
interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  logo: string;
  points: string[];
}

// Styled components
const ExperienceSection = styled.section`
  position: relative;
  padding: 100px 0;
  background-color: #fff;
  background-image: radial-gradient(#a8e6cf 1px, transparent 1px);
  background-size: 20px 20px;
  min-height: 100vh;
`;

const ExperienceContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-1px);
    width: 2px;
    height: 100%;
    background: #a8e6cf;
    z-index: 1;
  }
`;

const ExperienceItem = styled.div`
  position: relative;
  margin: 100px 0;
  z-index: 2;
`;

const CardWrapper = styled.div`
  background: rgba(255, 255, 255, 0.97);
  border: 3px solid #a8e6cf;
  border-radius: 15px;
  padding: 30px;
  box-sizing: border-box;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 600px;
  height: 200px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;

  &:hover {
    width: 1000px;
    height: 300px;
    transform: translateX(-65%);
    z-index: 3;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 1200px) {
    width: 500px;
    
    &:hover {
      width: 90%;
      transform: translateX(-55%);
    }
  }
`;

const ExperienceTitle = styled.h3`
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 15px 0;
  color: #2d4059;
  transition: all 0.3s ease;
`;

const ExperienceSubTitle = styled.h4`
  font-size: 26px;
  margin: 0 0 15px 0;
  color: #2d4059;
  transition: all 0.3s ease;
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
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  ${CardWrapper}:hover & {
    transform: scale(1.1);
  }
`;

const ExperienceCompany = styled.p`
  font-size: 22px;
  margin: 0;
  color: #666;
  transition: all 0.3s ease;
  font-weight: 500;
`;

const ExperienceDetails = styled.div`
  font-size: 20px;
  margin-top: 30px;
  line-height: 1.6;
  color: #444;
  opacity: 0;
  transition: opacity 0.3s ease 0.1s;
  padding-left: 80px; // Make space for logo

  ${CardWrapper}:hover & {
    opacity: 1;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    
    li {
      position: relative;
      padding-left: 25px;
      margin-bottom: 12px;
      
      &::before {
        content: '▹';
        position: absolute;
        left: 0;
        color: #a8e6cf;
      }
    }
  }

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

// Improved responsive handling
const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    overflow-x: hidden;
    margin: 0 -20px;
    padding: 0 20px;
  }
`;

// The main component
const Experience: React.FC = () => {
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

  return (
    <ExperienceSection>
      <ResponsiveContainer>
        <ExperienceContainer>
          {experiences.map((exp, index) => (
            <ExperienceItem key={index}>
              <CardWrapper>
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
      </ResponsiveContainer>
    </ExperienceSection>
  );
};

export default Experience;
