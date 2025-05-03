import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #0f0f0f;
    color: #ffffff;
    font-family: 'Courier New', Courier, monospace;
    position: relative;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 20%, rgba(41, 41, 41, 0.025) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(41, 41, 41, 0.025) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  body::after {
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
    opacity: 0.1;
    pointer-events: none;
    z-index: 0;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    background: linear-gradient(135deg, #ffffff 0%, #666666 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
  }
`;

export const SharedContainer = {
  MainContainer: `
    min-height: 100vh;
    position: relative;
    z-index: 1;
    padding: 2rem;
  `,
  ContentWrapper: `
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    color: #ffffff;
  `,
  Button: `
    font-size: 1.2rem;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1rem 2.5rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
    }
  `,
  GradientText: `
    background: linear-gradient(135deg, #ffffff 0%, #666666 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
  `
}; 