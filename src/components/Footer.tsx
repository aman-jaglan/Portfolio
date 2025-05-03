import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaMedium, FaEnvelope, FaTwitter } from 'react-icons/fa';
import { SharedContainer } from '../styles/theme';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const FooterContainer = styled.footer`
  background: rgba(15, 15, 15, 0.8);
  backdrop-filter: blur(10px);
  color: #ffffff;
  padding: 40px 20px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SocialLinks = styled.div`
  margin: 25px 0;
  display: flex;
  justify-content: center;
  gap: 25px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  font-size: 24px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  
  &:hover {
    color: #ffffff;
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
`;

const FooterText = styled.p`
  margin-top: 20px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
`;

const FooterDivider = styled.div`
  width: 80px;
  height: 2px;
  background: linear-gradient(135deg, #ffffff 0%, #666666 100%);
  margin: 20px auto;
  opacity: 0.3;
`;

const FooterQuote = styled.p`
  font-style: italic;
  max-width: 600px;
  margin: 0 auto 20px;
  ${SharedContainer.GradientText}
  font-size: 1rem;
  line-height: 1.6;
`;

const HeartIcon = styled.span`
  color: #ff5e5b;
  display: inline-block;
  animation: ${pulseAnimation} 1.5s infinite;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterQuote>
          "Code is like humor. When you have to explain it, it's bad."
        </FooterQuote>
        
        <FooterDivider />
        
        <SocialLinks>
          <SocialLink
            href="https://github.com/aman-jaglan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/aman-jaglan/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </SocialLink>
          <SocialLink
            href="https://medium.com/@amanjaglan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
          >
            <FaMedium />
          </SocialLink>
          <SocialLink
            href="mailto:aman.jaglan@gwu.edu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <FaEnvelope />
          </SocialLink>
          <SocialLink
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </SocialLink>
        </SocialLinks>
        
        <FooterText>
          Built with <HeartIcon>♥</HeartIcon> by Aman Jaglan • &copy; {new Date().getFullYear()}
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
