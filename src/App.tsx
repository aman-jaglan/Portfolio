
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    /* Set all text to a monospace, coder-style font */
    font-family: 'Courier New', Courier, monospace;
    background-color: #fff;
    /* Dot pattern with light green dots (#a8e6cf) */
    background-image: radial-gradient(#a8e6cf 1px, transparent 1px);
    background-size: 20px 20px;
    color: #333;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const MainContent = styled.main`
  padding: 40px 20px;
  min-height: calc(100vh - 160px); /* Adjust based on header/footer height */
  max-width: 1200px;
  margin: 0 auto;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </MainContent>
        <Footer />
      </Router>
    </>
  );
};

export default App;
