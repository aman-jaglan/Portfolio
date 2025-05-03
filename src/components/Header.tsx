import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { SharedContainer } from '../styles/theme';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
  background: rgba(15, 15, 15, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const TopRow = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #ffffff 0%, #666666 100%);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  margin-right: 10px;
  filter: brightness(0) invert(1);
  
  @media (max-width: 768px) {
    height: 32px;
  }
`;

const LogoText = styled.h1`
  font-size: 28px;
  font-weight: bold;
  ${SharedContainer.GradientText}
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-around;
    overflow-x: auto;
    padding-bottom: 5px;
  }
`;

interface NavLinkProps {
  $active: boolean;
}

const NavLink = styled(Link)<NavLinkProps>`
  font-weight: 500;
  color: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.7)'};
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 4px;
  position: relative;
  font-size: 1rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    background: linear-gradient(135deg, #ffffff 0%, #666666 100%);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #fff;
    
    &:after {
      width: 100%;
    }
  }
`;

const HeaderComponent: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <HeaderContainer style={{
      padding: scrolled ? '15px 40px' : '20px 40px',
      background: scrolled ? 'rgba(15, 15, 15, 0.95)' : 'rgba(15, 15, 15, 0.8)',
    }}>
      <TopRow>
        <Link to="/">
          <LogoContainer>
            <LogoImage src="/Feather.png" alt="Aman Jaglan Logo" />
            <LogoText>Aman Jaglan</LogoText>
          </LogoContainer>
        </Link>
        <Nav>
          <NavLink to="/" $active={location.pathname === '/'}>
            Home
          </NavLink>
          <NavLink to="/about" $active={location.pathname === '/about'}>
            About
          </NavLink>
          <NavLink to="/experience" $active={location.pathname === '/experience'}>
            Experience
          </NavLink>
          <NavLink to="/projects" $active={location.pathname === '/projects'}>
            Projects
          </NavLink>
          <NavLink to="/blogs" $active={location.pathname === '/blogs'}>
            What I Think!
          </NavLink>
          <NavLink to="/contact" $active={location.pathname === '/contact'}>
            Contact
          </NavLink>
        </Nav>
      </TopRow>
    </HeaderContainer>
  );
};

export default HeaderComponent;