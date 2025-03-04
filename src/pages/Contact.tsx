import React, { useState, useEffect, useCallback, useRef } from "react";
import styled, { keyframes, ThemeProvider, css } from "styled-components";
import { toast } from "sonner";
import emailjs from 'emailjs-com';

// Define interfaces for type safety
interface FormState {
  name: string;
  email: string;
  message: string;
}

interface LogMessage {
  id: number;
  text: string;
  type: 'command' | 'error' | 'info' | 'success';
}

interface ThemeInterface {
  primary: string;
  background: string;
  error: string;
  info: string;
  success: string;
  warning: string;
  font: string;
}

// Theme definition
const terminalTheme: ThemeInterface = {
  primary: "#0f0",
  background: "#000",
  error: "#f00",
  info: "#0ff",
  success: "#0f0",
  warning: "#ff0",
  font: "'Fira Code', 'Courier New', monospace",
};

// Animations
const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const progress = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled Components
const PageContainer = styled.div`
  padding: 2rem;
  background-color: #1a1a1a;
  min-height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const TerminalContainer = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.primary};
  font-family: ${({ theme }) => theme.font};
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(15, 255, 0, 0.3);
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-in-out;
  
  @media (max-width: 768px) {
    margin: 1rem auto;
  }
`;

const TerminalHeader = styled.div`
  background: rgba(15, 255, 0, 0.1);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '⬤ ⬤ ⬤';
    color: #ff5f56;
    margin-right: auto;
  }
`;

const TerminalTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

const TerminalBody = styled.div`
  padding: 1.5rem;
  min-height: 400px;
  
  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 350px;
  }
`;

const TerminalGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const Prompt = styled.span`
  color: ${({ theme }) => theme.primary};
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Cursor = styled.span`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 18px;
  background-color: ${({ theme }) => theme.primary};
  animation: ${blink} 1s infinite;
`;

interface InputFieldProps {
  hasError?: boolean;
}

const InputField = styled.input<InputFieldProps>`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme, hasError }) => 
    hasError ? theme.error : theme.primary};
  color: inherit;
  font-family: inherit;
  padding: 0.5rem;
  width: 100%;
  caret-color: transparent;
  
  ${({ hasError }) => hasError && css`
    animation: ${shake} 0.5s ease-in-out;
  `}

  &:focus {
    outline: none;
    border-bottom-color: ${({ theme, hasError }) => 
      hasError ? theme.error : theme.info};
  }
`;

const TextAreaField = styled.textarea<InputFieldProps>`
  background: transparent;
  border: 1px solid ${({ theme, hasError }) => 
    hasError ? theme.error : theme.primary};
  color: inherit;
  font-family: inherit;
  padding: 0.5rem;
  width: 100%;
  min-height: 100px;
  resize: vertical;
  caret-color: transparent;
  
  ${({ hasError }) => hasError && css`
    animation: ${shake} 0.5s ease-in-out;
  `}

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) => 
      hasError ? theme.error : theme.info};
  }
`;

const SubmitButton = styled.button`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.primary};
  color: inherit;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  grid-column: 2;
  font-family: ${({ theme }) => theme.font};
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.background};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(15, 255, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: transparent;
      color: inherit;
      transform: none;
      box-shadow: none;
    }
  }
  
  @media (max-width: 768px) {
    grid-column: 1;
    width: 100%;
    margin-top: 1rem;
  }
`;

interface LogMessageProps {
  type: 'command' | 'error' | 'info' | 'success';
}

const LogMessage = styled.div<LogMessageProps>`
  border-left: 3px solid ${({ type, theme }) => 
    type === 'error' ? theme.error : 
    type === 'info' ? theme.info : 
    type === 'success' ? theme.success : 
    theme.primary};
  padding-left: 1rem;
  margin: 1rem 0;
  animation: ${typewriter} 0.5s steps(40) forwards;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ProgressBar = styled.div`
  height: 4px;
  background: ${({ theme }) => theme.primary};
  animation: ${progress} 3s ease-out forwards;
  margin-top: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.info};
    transform: translateY(-2px);
  }
  
  &::before {
    content: '>';
    margin-right: 4px;
  }
`;

const LoadingDots = styled.span`
  &::after {
    content: '.';
    animation: ${blink} 1s infinite;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.error};
  font-size: 12px;
  margin-top: 4px;
  opacity: 0.8;
`;

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageTextAreaRef = useRef<HTMLTextAreaElement>(null);

  // EmailJS service configuration
  const EMAILJS_SERVICE_ID = 'service_36p9fe8'; // Replace with your EmailJS service ID
  const EMAILJS_TEMPLATE_ID = 'template_nijv6tk'; // Replace with your EmailJS template ID
  const EMAILJS_USER_ID = 'k_OXhCejJBtOv0uRy'; // Replace with your EmailJS public key

  // Focus the name input when component mounts
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
    
    // Display welcome message
    addLog("Welcome to the contact terminal. Please enter your details.", "info");
    addLog("Your message will be sent directly to my email inbox.", "info");
  }, []);

  const handleInput = useCallback((field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const addLog = useCallback(async (message: string, type: LogMessage['type'] = 'command') => {
    setLogs(prev => [...prev, { id: Date.now(), text: message, type }]);
    await new Promise(resolve => setTimeout(resolve, 700));
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<FormState> = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message is too short";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setStatus('processing');
    setLogs([]);

    try {
      await addLog('Initializing contact protocol...');
      await addLog('Validating credentials...');
      await addLog('Encrypting message...');
      await addLog('Establishing secure connection...');

      // Special Easter egg
      if (form.name.toLowerCase().includes('secret')) {
        await addLog('Accessing hidden dimension...', 'info');
        await addLog('// TODO: Implement multidimensional messaging', 'info');
      }

      await addLog('Transmitting data...');
      
      // Prepare template parameters
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        reply_to: form.email,
      };

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_USER_ID
      );

      setStatus('success');
      await addLog('Message successfully sent to inbox!', 'success');
      toast.success("Message sent successfully! I'll get back to you soon.");
      
      // Reset form after successful submission
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      await addLog(`Error: ${error instanceof Error ? error.message : 'Email transmission failed'}`, 'error');
      toast.error("Failed to send message. Please try again later or contact me directly.");
    }
  }, [form, addLog, validateForm]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Move focus to next field on Enter key
    if (e.key === 'Enter' && e.target !== messageTextAreaRef.current) {
      e.preventDefault();
      
      if (e.target === nameInputRef.current && emailInputRef.current) {
        emailInputRef.current.focus();
      } else if (e.target === emailInputRef.current && messageTextAreaRef.current) {
        messageTextAreaRef.current.focus();
      }
    }
  }, []);

  return (
    <ThemeProvider theme={terminalTheme}>
      <PageContainer>
        <TerminalContainer>
          <TerminalHeader>
            <TerminalTitle>contact_terminal.exe</TerminalTitle>
          </TerminalHeader>
          <TerminalBody>
            <TerminalGrid>
              <Prompt>$ contact_form --start</Prompt>
              <div />

              <Prompt>Name:</Prompt>
              <InputWrapper>
                <InputField
                  value={form.name}
                  onChange={handleInput('name')}
                  placeholder="Enter your name..."
                  hasError={!!errors.name}
                  ref={nameInputRef}
                  onKeyDown={handleKeyDown}
                />
                {form.name && <Cursor />}
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </InputWrapper>

              <Prompt>Email:</Prompt>
              <InputWrapper>
                <InputField
                  type="email"
                  value={form.email}
                  onChange={handleInput('email')}
                  placeholder="user@domain.com"
                  hasError={!!errors.email}
                  ref={emailInputRef}
                  onKeyDown={handleKeyDown}
                />
                {form.email && <Cursor />}
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </InputWrapper>

              <Prompt>Message:</Prompt>
              <InputWrapper>
                <TextAreaField
                  value={form.message}
                  onChange={handleInput('message')}
                  placeholder="Type your message here..."
                  hasError={!!errors.message}
                  ref={messageTextAreaRef}
                />
                {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
              </InputWrapper>

              <SubmitButton
                type="submit"
                onClick={handleSubmit}
                disabled={status === 'processing'}
              >
                {status === 'processing' ? (
                  <>Processing<LoadingDots /></>
                ) : 'Execute'}
              </SubmitButton>
            </TerminalGrid>

            <div>
              {status === 'processing' && <ProgressBar />}
              {logs.map(log => (
                <LogMessage key={log.id} type={log.type}>
                  {log.text}
                </LogMessage>
              ))}
            </div>
            
            <SocialLinks>
              <SocialLink href="https://github.com/yourusername" target="_blank">GitHub</SocialLink>
              <SocialLink href="https://linkedin.com/in/yourusername" target="_blank">LinkedIn</SocialLink>
              <SocialLink href="mailto:your.email@example.com">Email</SocialLink>
            </SocialLinks>
          </TerminalBody>
        </TerminalContainer>
      </PageContainer>
    </ThemeProvider>
  );
};

export default Contact;