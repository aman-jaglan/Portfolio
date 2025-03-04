
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaMedium, FaEnvelope, FaTwitter } from 'react-icons/fa';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const FooterContainer = styled.footer`
  background: linear-gradient(to right, #f9f9f9, #ffffff);
  color: #333;
  padding: 30px 20px;
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  border-top: 1px solid rgba(168, 230, 207, 0.3);
`;

const SocialLinks = styled.div`
  margin: 15px 0;
  display: flex;
  justify-content: center;
  gap: 25px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const SocialLink = styled.a`
  color: #333;
  font-size: 28px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(168, 230, 207, 0.2);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    color: #007acc;
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    background-color: rgba(168, 230, 207, 0.4);
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 22px;
  }
`;

const FooterText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
`;

const FooterDivider = styled.div`
  width: 80px;
  height: 3px;
  background: linear-gradient(to right, #a8e6cf, #007acc);
  margin: 20px auto;
  border-radius: 2px;
`;

const FooterQuote = styled.p`
  font-style: italic;
  max-width: 600px;
  margin: 0 auto 20px;
  color: #555;
  font-size: 16px;
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
    </FooterContainer>
  );
};

export default Footer;
