import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

// Keyframes for animations
const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(168, 230, 207, 0.5); }
  50% { box-shadow: 0 0 15px rgba(168, 230, 207, 0.8); }
  100% { box-shadow: 0 0 5px rgba(168, 230, 207, 0.5); }
`;

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
  background: linear-gradient(135deg, #f0f0f0, #fff);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Logo = styled.h1`
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Courier New', Courier, monospace;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #a8e6cf;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 15px;
  
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
  font-family: 'Courier New', Courier, monospace;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 4px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$active ? '100%' : '0'};
    height: 3px;
    background-color: #a8e6cf;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #007acc;
    
    &:after {
      width: 100%;
    }
  }
  
  ${props => props.$active && css`
    color: #007acc;
    animation: ${glow} 2s infinite;
  `}
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
      boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.15)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: scrolled ? '15px 40px' : '20px 40px'
    }}>
      <TopRow>
        <Link to="/">
          <Logo>Aman Jaglan</Logo>
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