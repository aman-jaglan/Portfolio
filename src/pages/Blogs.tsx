
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { FaMedium } from "react-icons/fa";

// Define theme types
interface Theme {
  background: string;
  text: string;
  accent: string;
  cardBackground: string;
  borderColor: string;
  secondaryText: string;
  cardShadow: string;
}

// Define our two themes: Dark and Light.
const darkTheme: Theme = {
  background: "#121212",
  text: "#e0e0e0",
  accent: "#0f0", // Neon green accent
  cardBackground: "#1e1e1e",
  borderColor: "#0f0",
  secondaryText: "#a0a0a0",
  cardShadow: "0 4px 6px rgba(0, 255, 0, 0.1)"
};

const lightTheme: Theme = {
  background: "#ffffff",
  text: "#333333",
  accent: "#007acc",
  cardBackground: "#f5f5f5",
  borderColor: "#007acc",
  secondaryText: "#666666",
  cardShadow: "0 4px 6px rgba(0, 122, 204, 0.1)"
};

// Interface for blog post
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  mediumLink: string;
  datePublished: string;
  readTime: string;
}

// Styled container for the whole page.
const PageContainer = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-family: 'Courier New', Courier, monospace;
  min-height: 100vh;
  padding: 40px 20px;
  transition: background 0.3s ease, color 0.3s ease;
`;

// Page header with typing effect
const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${({ theme }) => theme.accent};
  }
`;

// Toggle button to switch themes.
const ToggleButton = styled.button`
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.background};
  border: none;
  padding: 10px 20px;
  font-family: inherit;
  font-size: 1rem;
  border-radius: 4px;
  margin-bottom: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Grid container for the blog posts.
const BlogsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Each blog card, with improved hover effect.
const BlogCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border: 2px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  padding: 25px;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.cardShadow};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

// Blog title styled to look like code.
const BlogTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
  line-height: 1.3;
`;

// Blog excerpt styling.
const BlogExcerpt = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
  color: ${({ theme }) => theme.secondaryText};
`;

// Blog metadata (date & read time)
const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.secondaryText};
`;

// Styled link for Medium posts.
const MediumLink = styled.a`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.accent};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Header container
const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

// Subtitle
const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.secondaryText};
`;

const Blogs: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const toggleTheme = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));

  // Updated blog posts data.
  const blogs: BlogPost[] = [
    {
      id: 1,
      title: "Connect Your VM Instance to Your Local Computer",
      excerpt: "Learn how to connect your cloud VM instances to your local development environment for a seamless workflow.",
      mediumLink: "https://medium.com/@amanjaglan/connect-your-vm-instance-to-your-local-computer-03abacc472d9",
      datePublished: "May 15, 2023",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "A Quick Introduction to LSTMs for Sequence Modeling",
      excerpt: "Discover the power of Long Short-Term Memory networks and how they revolutionize sequential data analysis.",
      mediumLink: "https://medium.com/@amanjaglan/connect-your-vm-instance-to-your-local-computer-03abacc472d9",
      datePublished: "Apr 22, 2023",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Project vs. Product Thinking",
      excerpt: "A deep dive into the fundamental differences between project and product approaches in software development.",
      mediumLink: "https://medium.com/@amanjaglan/project-vs-product-thinking-c25377de86bf",
      datePublished: "Mar 10, 2023",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Generating 3D Images with Python, Open3D, and GLPN",
      excerpt: "Learn how to generate 3D images and point clouds using Python, Open3D, and GLPN for depth estimation.",
      mediumLink: "https://medium.com/@amanjaglan/generating-3d-images-and-point-clouds-with-python-open3d-and-glpn-for-depth-estimation-a0a484d77570",
      datePublished: "Feb 28, 2023",
      readTime: "10 min read"
    },
    {
      id: 5,
      title: "How LangChain Works!",
      excerpt: "An overview of how LangChain works and its applications in building language model-powered applications.",
      mediumLink: "https://medium.com/@amanjaglan/how-langchain-works-5ab3f79da90f",
      datePublished: "Jan 15, 2023",
      readTime: "7 min read"
    },
    {
      id: 6,
      title: "Melody Generation with Deep Neural Networks",
      excerpt: "Exploring melody generation using deep neural networks and how AI is reshaping music creation.",
      mediumLink: "https://medium.com/@amanjaglan/melody-generation-with-deep-neural-networks-ea9726ae6183",
      datePublished: "Dec 5, 2022",
      readTime: "9 min read"
    },
    {
      id: 7,
      title: "Answer is Machine Learning",
      excerpt: "A beginner's guide to understanding the core concepts of machine learning and its practical applications.",
      mediumLink: "https://medium.com/@amanjaglan/answer-is-machine-learning-d9f6131c5289",
      datePublished: "Nov 20, 2022", 
      readTime: "6 min read"
    }
  ];

  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <PageContainer>
        <PageHeader>
          <div>
            <Header>What I Think!</Header>
            <Subtitle>Thoughts, ideas, and reflections on tech and data science</Subtitle>
          </div>
          <ToggleButton onClick={toggleTheme}>
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </ToggleButton>
        </PageHeader>
        
        <BlogsGrid>
          {blogs.map(blog => (
            <BlogCard key={blog.id}>
              <BlogMeta>
                <span>{blog.datePublished}</span>
                <span>{blog.readTime}</span>
              </BlogMeta>
              <BlogTitle># {`{${blog.title}}`}</BlogTitle>
              <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
              <MediumLink href={blog.mediumLink} target="_blank" rel="noopener noreferrer">
                <FaMedium /> Read full article
              </MediumLink>
            </BlogCard>
          ))}
        </BlogsGrid>
      </PageContainer>
    </ThemeProvider>
  );
};

export default Blogs;
